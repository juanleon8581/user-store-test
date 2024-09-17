import mongoose from "mongoose";

export class Validators {
  static isValidFormatID(id: string): boolean {
    return mongoose.isValidObjectId(id);
  }
}
