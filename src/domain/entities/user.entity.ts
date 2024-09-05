import { CustomError } from "..";

export class UserEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly emailValidated: boolean,
    public readonly password: string,
    public readonly role: string[],
    public readonly img?: string
  ) {}

  static fromObject(obj: { [key: string]: any }): UserEntity {
    const { id, _id, name, email, emailValidated, password, role, img } = obj;

    if (!id && !_id) throw CustomError.badRequest("User must have an id");

    if (!name) throw CustomError.badRequest("User must have a name");

    if (!email && !emailValidated)
      throw CustomError.badRequest("User must have an email");

    if (emailValidated === undefined || emailValidated === null)
      throw CustomError.badRequest("User must have an email");

    if (!password) throw CustomError.badRequest("User must have a password");

    if (!role) throw CustomError.badRequest("User must have a role");

    const newUserEntity = new UserEntity(
      id || _id,
      name,
      email,
      emailValidated,
      password,
      role,
      img
    );
    return newUserEntity;
  }
}
