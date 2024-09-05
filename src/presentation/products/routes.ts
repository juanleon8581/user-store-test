import { Router } from "express";
import { ProductsController } from "./controller";
import { AuthMiddleware } from "../middlewares";
import { CategoryService } from "../services";

export class ProductsRoutes {
  static get routes(): Router {
    const router = Router();

    const controller = new ProductsController();

    router.get("/", controller.getProducts);
    router.post("/", [AuthMiddleware.validateJWT], controller.createProduct);

    return router;
  }
}
