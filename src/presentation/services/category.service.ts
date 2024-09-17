import { CategoryModel } from "../../data";
import { CreateCategoryDto, CustomError } from "../../domain";
import { CategoryEntity } from "../../domain/entities";
import { PaginationDto } from "../../domain/dtos/shared/pagination.dto";

export class CategoryService {
  constructor() {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const { name } = createCategoryDto;

    const categoryExists = await CategoryModel.findOne({
      name,
    });

    if (categoryExists) {
      throw CustomError.badRequest("Category already exists");
    }

    try {
      const category = new CategoryModel({ ...createCategoryDto });
      await category.save();

      return {
        id: category.id || category._id,
        name: category.name,
        available: category.available,
        user: category.user,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async getAllCategories(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    try {
      const [totalCategories, allCategories] = await Promise.all([
        CategoryModel.countDocuments(),
        CategoryModel.find()
          .skip((page - 1) * limit)
          .limit(limit),
      ]);

      return {
        page: page,
        limit: limit,
        totalCategories: totalCategories,
        next: `/api/categories?page=${page + 1}&limit=${limit}`,
        prev: `/api/categories?page=${page - 1 || 1}&limit=${limit}`,
        categories: allCategories.map((category) =>
          CategoryEntity.fromObject(category)
        ),
      };
    } catch (error) {
      throw CustomError.internalServer("Inrternal Server Error");
    }
  }
}
