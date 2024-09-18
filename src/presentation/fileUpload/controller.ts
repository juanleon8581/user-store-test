import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { FileUploadService } from "../services/file-upload.service";
import { UploadedFile } from "express-fileupload";

export class FileUploadController {
  constructor(private readonly uploadService: FileUploadService) {}

  private errorHandle = (error: unknown, res: Response) => {
    if (error instanceof CustomError)
      return res.status(error.statusCode).json({ error: error.message });

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  uploadFile = (req: Request, res: Response) => {
    const { files } = req.body;
    const { type } = req.params;

    this.uploadService
      .uploadSingleFile(files.at(0) as UploadedFile, type)
      .then((uploaded) =>
        res.json({ message: "File uploaded successfully", uploaded })
      )
      .catch((error) => this.errorHandle(error, res));
  };

  uploadManyFiles = (req: Request, res: Response) => {
    const { files } = req.body;
    const { type } = req.params;

    this.uploadService
      .uploadMultipleFiles(files as UploadedFile[], type)
      .then((uploaded) =>
        res.json({ message: "File uploaded successfully", uploaded })
      )
      .catch((error) => this.errorHandle(error, res));
  };
}
