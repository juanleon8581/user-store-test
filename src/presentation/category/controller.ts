import { Request, Response } from "express";
import { CreateCategoryDto, CustomError, PaginationDto } from "../../domain";
import { CategoryService } from "../services";

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  private errorHandle = (error: unknown, res: Response) => {
    if (error instanceof CustomError)
      return res.status(error.statusCode).json({ error: error.message });

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  createCategory = (req: Request, res: Response) => {
    const { body } = req;
    const [error, createCategoryDto] = CreateCategoryDto.create(body);
    if (error) return res.status(400).json({ error });

    this.categoryService
      .createCategory(createCategoryDto!)
      .then((data) => res.status(201).json(data))
      .catch((error) => this.errorHandle(error, res));

    // res.json({ createCategoryDto });
  };

  getAllCategories = (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;

    const [error, paginationDto] = PaginationDto.create(+page, +limit);
    if (error) return res.status(400).json({ error });

    this.categoryService
      .getAllCategories(paginationDto!)
      .then((data) => res.json(data))
      .catch((error) => this.errorHandle(error, res));
  };

  getCategory = (req: Request, res: Response) => {
    res.json("Get Category");
  };

  updateCategory = (req: Request, res: Response) => {
    throw new Error("Method not implemented.");
  };

  deleteCategory = (req: Request, res: Response) => {
    throw new Error("Method not implemented.");
  };
}
