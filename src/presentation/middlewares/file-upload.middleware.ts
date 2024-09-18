import { NextFunction, Request, Response } from "express";

export class FileUploadMiddleware {
  static containFile(req: Request, res: Response, next: NextFunction) {
    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).json({ error: "No file uploaded" });

    if (!Array.isArray(req.files.file)) {
      req.body.files = [req.files.file];
    } else {
      req.body.files = req.files.file;
    }

    next();
  }

  static isValidExtension(req: Request, res: Response, next: NextFunction) {
    const validExtensions = ["png", "jpg", "jpeg", "gif"];
    const { files } = req.body;

    for (const file of files) {
      const fileExtension = file.mimetype.split("/")[1];
      if (!validExtensions.includes(fileExtension))
        return res.status(400).json({
          error: `Invalid file extension, valid extensions are: ${validExtensions}`,
        });
    }

    next();
  }

  static isValidFolder(req: Request, res: Response, next: NextFunction) {
    const validFolders = ["users", "products", "categories"];
    const { type } = req.params;

    if (!validFolders.includes(type))
      return res.status(400).json({
        error: `Invalid folder, valid folders are: ${validFolders}`,
      });

    next();
  }
}
