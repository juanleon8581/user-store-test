import { Request, Response } from "express";
import { CustomError } from "../../domain";

export class FileUploadController {
  constructor() {}

  private errorHandle = (error: unknown, res: Response) => {
    if (error instanceof CustomError)
      return res.status(error.statusCode).json({ error: error.message });

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  uploadFile = (req: Request, res: Response) => {
    res.json({ message: "File uploaded successfully" });
  };

  uploadManyFiles = (req: Request, res: Response) => {
    res.json({ message: "Files uploaded successfully" });
  };
}
