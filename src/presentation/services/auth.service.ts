import { JwtAdapter, bcryptAdapter, envs } from "../../config";
import { UserModel } from "../../data";
import {
  CustomError,
  RegisterUserDto,
  LoginUserDto,
  UserEntity,
} from "../../domain";
import { EmailService, SendMailOptions } from "./email.service";

const webServiceUrl = envs.WEBSERVICE_URL;
const sendEmail = envs.SEND_EMAIL;

export class AuthService {
  constructor(private readonly emailService: EmailService) {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const { email } = registerUserDto;

    const existUser = await UserModel.findOne({ email });
    if (existUser)
      throw CustomError.badRequest(`User with Email ${email} already exists`);

    try {
      const user = new UserModel(registerUserDto);

      //Encryp password
      user.password = await bcryptAdapter.hash(registerUserDto.password);

      //JWT <----- Token for authentication
      const { password, ...publicUser } = UserEntity.fromObject(user);
      const token = await this.generateJWT({ userId: publicUser.id });

      //Send Email
      if (sendEmail) await this.sendEmailValidationLink(publicUser.email);

      await user.save();
      return { user: publicUser, token };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async loginUser(loginUserDto: LoginUserDto) {
    const genericError = "User or Password is wrong";
    try {
      const user = await UserModel.findOne({ email: loginUserDto.email });

      if (!user) throw CustomError.badRequest(genericError);

      const passIsCorrect = await bcryptAdapter.compate(
        loginUserDto.password,
        user.password
      );

      if (!passIsCorrect) throw CustomError.badRequest(genericError);

      const { password, ...userInfo } = UserEntity.fromObject(user);

      const token = await this.generateJWT({
        userId: userInfo.id,
        email: userInfo.email,
      });

      return { userInfo, token };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async validateEmail(token: string) {
    const payload = await JwtAdapter.validateToken(token, envs.JWT_SEED);
    if (!payload) throw CustomError.unAuthorized("Invalid token");

    const { email } = payload as { email: string };
    if (!email) throw CustomError.internalServer("Email no found in token");

    const user = await UserModel.findOne({ email });
    if (!user) throw CustomError.notFound("User not found");

    user.emailValidated = true;
    await user.save();
    return true;
  }

  private async generateJWT(data: { [key: string]: any }): Promise<string> {
    const token = await JwtAdapter.generateToken(data, envs.JWT_SEED);
    if (!token) throw CustomError.internalServer("Error generating token");

    return `${token}`;
  }

  private async sendEmailValidationLink(email: string) {
    const token = await this.generateJWT({ email });

    const link = `${webServiceUrl}/auth/validate-email/${token}`;
    const emailHtml = `
      <h1>Validate your email</h1>
      <p>Click on the link below to validate your email</p>
      <a href="${link}">Validate Email</a>
    `;

    const sendEmailOptions: SendMailOptions = {
      to: email,
      subject: "Validate your email",
      htmlBody: emailHtml,
    };

    const isSent = await this.emailService.sendEmail(sendEmailOptions);
    if (!isSent) throw CustomError.internalServer("Error sending email");

    return true;
  }
}
