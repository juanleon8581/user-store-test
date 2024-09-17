import { Validators } from "../../../config";

export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly price: number,
    public readonly user: string,
    public readonly category: string,
    public readonly description: string
  ) {}

  static create(obj: { [key: string]: any }): [string?, CreateProductDto?] {
    const { name, user, price, category, description } = obj;
    let { available } = obj;
    if (!name) return ["name is required"];
    if (!user) return ["user is required"];
    if (!Validators.isValidFormatID(user.id)) return ["user is invalid"];
    if (!category) return ["category is required"];
    if (!Validators.isValidFormatID(category)) return ["category is invalid"];
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
        category,
        description
      ),
    ];
  }
}
