import { Router } from "express";
import { AuthMiddleware } from "../middlewares";
import { FileUploadController } from "./controller";

export class FileUploadRoutes {
  static get routes() {
    const router = Router();
    const controller = new FileUploadController();

    router.post(
      "/single/:type",
      [AuthMiddleware.validateJWT],
      controller.uploadFile
    );
    router.post(
      "/many/:type",
      [AuthMiddleware.validateJWT],
      controller.uploadManyFiles
    );

    return router;
  }
}
