export class CreateCategoryDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly userId: string
  ) {}

  static create(obj: { [key: string]: any }): [string?, CreateCategoryDto?] {
    const { name, user } = obj;
    let { available } = obj;
    if (!name) return ["name is required"];
    if (!user) return ["user is required"];
    if (typeof available !== "boolean") {
      available = available === "true";
    }
    return [, new CreateCategoryDto(name, available, user.id)];
  }
}
