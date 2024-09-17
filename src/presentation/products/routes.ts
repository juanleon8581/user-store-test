import { Router } from "express";
import { ProductsController } from "./controller";
import { AuthMiddleware } from "../middlewares";
import { ProductService } from "../services";

export class ProductsRoutes {
  static get routes(): Router {
    const router = Router();

    const controller = new ProductsController(new ProductService());

    router.get("/", controller.getProducts);
    router.post("/", [AuthMiddleware.validateJWT], controller.createProduct);

    return router;
  }
}
