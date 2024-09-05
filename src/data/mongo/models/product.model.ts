import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: [true, "Name must be unique"],
  },
  available: {
    type: Boolean,
    default: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    requited: [true, "User is required"],
  },

  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category is required"],
  },
});

export const ProductModel = mongoose.model("Product", productSchema);
