import { CustomError } from "../errors/custom.error";

export class CategoryEntity {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly available: boolean
  ) {}

  static fromObject(obj: { [key: string]: any }): CategoryEntity {
    const { id, name, available } = obj;
    if (!id) throw CustomError.badRequest("id is required");
    if (!name) throw CustomError.badRequest("name is required");
    if (available === null)
      throw CustomError.badRequest("available is required");

    return new CategoryEntity(id, name, available);
  }
}
