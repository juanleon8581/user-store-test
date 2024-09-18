import { Router } from "express";
import { AuthMiddleware, FileUploadMiddleware } from "../middlewares";
import { FileUploadController } from "./controller";
import { FileUploadService } from "../services/file-upload.service";

export class FileUploadRoutes {
  static get routes() {
    const router = Router();
    const controller = new FileUploadController(new FileUploadService());

    router.use(AuthMiddleware.validateJWT);
    router.use(FileUploadMiddleware.containFile);
    router.use(FileUploadMiddleware.isValidExtension);

    router.post(
      "/single/:type",
      [FileUploadMiddleware.isValidFolder],
      controller.uploadFile
    );
    router.post(
      "/many/:type",
      [FileUploadMiddleware.isValidFolder],
      controller.uploadManyFiles
    );

    return router;
  }
}
