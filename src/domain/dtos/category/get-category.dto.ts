export class GetCategoryDto {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly available: boolean
  ) {}

  static fromObject(obj: { [key: string]: any }): [string?, GetCategoryDto?] {
    const { id, name, available } = obj;
    if (!id) return ["id is required"];
    if (!name) return ["name is required"];
    if (!available) return ["available is required"];

    return [, new GetCategoryDto(id, name, available)];
  }
}
