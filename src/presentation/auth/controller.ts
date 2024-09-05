import { Request, Response } from "express";
import { CustomError, LoginUserDto, RegisterUserDto } from "../../domain";
import { AuthService } from "../services/auth.service";

export class AuthController {
  constructor(public readonly authService: AuthService) {}

  private errorHandle = (error: unknown, res: Response) => {
    if (error instanceof CustomError)
      return res.status(error.statusCode).json({ error: error.message });

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  registerUser = (req: Request, res: Response) => {
    const { body } = req;
    const [error, registerUserDto] = RegisterUserDto.create(body);
    if (error) return res.status(400).json({ error });

    this.authService
      .registerUser(registerUserDto!)
      .then((data) => res.json(data))
      .catch((error) => this.errorHandle(error, res));
  };

  loginUser = (req: Request, res: Response) => {
    const { body } = req;
    const [error, loginUserDto] = LoginUserDto.create(body);

    if (error) return res.status(400).json({ error });

    this.authService
      .loginUser(loginUserDto!)
      .then((data) => res.json(data))
      .catch((error) => this.errorHandle(error, res));
  };

  validateEmail = (req: Request, res: Response) => {
    const { token } = req.params;

    this.authService
      .validateEmail(token)
      .then(() => res.json("Email validated"))
      .catch((error) => this.errorHandle(error, res));
  };
}
