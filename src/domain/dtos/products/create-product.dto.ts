export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly price: number,
    public readonly userId: string,
    public readonly categoryId: string,
    public readonly description: string
  ) {}

  static create(obj: { [key: string]: any }): [string?, CreateProductDto?] {
    const { name, user, price, categoryId, description } = obj;
    let { available } = obj;
    if (!name) return ["name is required"];
    if (!user) return ["user is required"];
    if (!categoryId) return ["category is required"];
    if (price && isNaN(price)) return ["price must be a number"];
    if (typeof available !== "boolean") {
      available = available === "true";
    }
    return [
      ,
      new CreateProductDto(
        name,
        available,
        price,
        user.id,
        categoryId,
        description
      ),
    ];
  }
}
