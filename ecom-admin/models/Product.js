import { Schema, model, models } from "mongoose";
// import { Image } from "./Image";

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  buf: { type: String, required: true },
});

export const Product = models.Product || model("Product", ProductSchema);
