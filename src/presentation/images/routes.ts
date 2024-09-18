import { Router } from "express";
import { ImageCountroller } from "./controller";

export class ImageRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = ImageCountroller;

    router.get("/:type/:img", controller.getImages);

    return router;
  }
}
