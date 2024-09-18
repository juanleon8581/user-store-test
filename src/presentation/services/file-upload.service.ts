import path from "path";
import fs from "fs";
import type { UploadedFile } from "express-fileupload";
import { UUIDAdapter } from "../../config";
import { CustomError } from "../../domain";

export class FileUploadService {
  constructor(private readonly uuid = UUIDAdapter) {}

  private checkfolder(folderPath: string): boolean {
    // Check if the folder exists
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
      return true;
    }
    return true;
  }

  public async uploadSingleFile(file: UploadedFile, folder: string) {
    try {
      const baseFolder = "uploads";

      const fileExtension = file.mimetype.split("/")[1];

      const desrination = path.resolve(
        __dirname,
        "../../../",
        `${baseFolder}/${folder}`
      );
      const fileName = `${this.uuid.generate()}.${fileExtension}`;

      this.checkfolder(desrination);

      file.mv(desrination + `/${fileName}`);

      return { fileName, path: `${desrination}/${fileName}` };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async uploadMultipleFiles(files: UploadedFile[], folder: string) {
    const fileNames = await Promise.all(
      files.map((file) => this.uploadSingleFile(file, folder))
    );

    return fileNames;
  }
}
