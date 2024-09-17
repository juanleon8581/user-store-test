import { ProductModel } from "../../data";
import { CreateProductDto, CustomError } from "../../domain";
import { PaginationDto } from "../../domain/dtos/shared/pagination.dto";

export class ProductService {
  constructor() {}

  async createProduct(createProductDto: CreateProductDto) {
    const { name } = createProductDto;

    const productExists = await ProductModel.findOne({
      name,
    });

    if (productExists) {
      throw CustomError.badRequest("Product already exists");
    }

    try {
      const product = new ProductModel({
        ...createProductDto,
      });
      await product.save();

      return product;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async getAllProducrts(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    try {
      const [totalProducts, allProducts] = await Promise.all([
        ProductModel.countDocuments(),
        ProductModel.find()
          .skip((page - 1) * limit)
          .limit(limit)
          .populate("user")
          .populate("category"),
      ]);

      return {
        page: page,
        limit: limit,
        totalCategories: totalProducts,
        next: `/api/products?page=${page + 1}&limit=${limit}`,
        prev: `/api/products?page=${page - 1 || 1}&limit=${limit}`,
        allProducts,
      };
    } catch (error) {
      throw CustomError.internalServer("Inrternal Server Error");
    }
  }
}
