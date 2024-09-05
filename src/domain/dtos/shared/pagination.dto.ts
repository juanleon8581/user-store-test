export class PaginationDto {
  private constructor(
    public readonly page: number,
    public readonly limit: number
  ) {}

  static create(
    page: number = 1,
    limit: number = 10
  ): [string?, PaginationDto?] {
    if (isNaN(page) || isNaN(limit)) return ["Invalid page or limit"];
    if (page <= 0 || limit <= 0)
      return ["Page and Limit must be greater than 0"];

    return [, new PaginationDto(page, limit)];
  }
}
