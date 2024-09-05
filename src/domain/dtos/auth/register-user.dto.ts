import { regularExps } from "../../../config";

export class RegisterUserDto {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(obj: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password } = obj;
    const passwordMinLength = 8;

    if (!name) return ["User must have a name"];
    if (!email) return ["User must have an email"];
    if (!regularExps.email.test(email)) return ["Email must be a valid email"];
    if (!password) return ["User must have a password"];
    if (password.length < passwordMinLength)
      return [`Password must have at least ${passwordMinLength} characters`];

    return [, new RegisterUserDto(name, email, password)];
  }
}
