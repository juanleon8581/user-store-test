import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
  },
  available: {
    type: Boolean,
    default: true,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    requited: [true, "User is required"],
  },
});

categorySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id;
  },
});

export const CategoryModel = mongoose.model("Category", categorySchema);
