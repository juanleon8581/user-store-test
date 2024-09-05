import { regularExps } from "../../../config";

export class LoginUserDto {
  private constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(obj: { [key: string]: string }): [string?, LoginUserDto?] {
    const { email, password } = obj;
    const passwordMinLength = 8;

    if (!email) return ["User must have an email"];
    if (!regularExps.email.test(email)) return ["Email must be a valid email"];
    if (!password) return ["User must have an password"];
    if (password.length < passwordMinLength)
      return [`Password must have at least ${passwordMinLength} characters`];

    return [, new LoginUserDto(email, password)];
  }
}
