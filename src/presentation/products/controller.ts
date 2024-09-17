import { Request, Response } from "express";
import { CustomError, PaginationDto, CreateProductDto } from "../../domain";
import { ProductService } from "../services/product.service";

export class ProductsController {
  constructor(private readonly productService: ProductService) {} // TODO: private readonly productService: ProductService

  private errorHandle = (error: unknown, res: Response) => {
    if (error instanceof CustomError)
      return res.status(error.statusCode).json({ error: error.message });

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  createProduct = (req: Request, res: Response) => {
    const [error, createProductDto] = CreateProductDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.productService
      .createProduct(createProductDto!)
      .then((data) => res.status(201).json(data))
      .catch((error) => this.errorHandle(error, res));
  };

  getProducts = (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;

    const [error, paginationDto] = PaginationDto.create(+page, +limit);
    if (error) return res.status(400).json({ error });

    this.productService
      .getAllProducrts(paginationDto!)
      .then((data) => res.json(data))
      .catch((error) => this.errorHandle(error, res));
  };

  getProduct = (req: Request, res: Response) => {
    res.json("Get Product");
  };

  updateProduct = (req: Request, res: Response) => {
    throw new Error("Method not implemented.");
  };

  deleteProduct = (req: Request, res: Response) => {
    throw new Error("Method not implemented.");
  };
}
