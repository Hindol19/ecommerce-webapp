import { Schema, model, models } from "mongoose";
// import { Image } from "./Image";

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  // image: {
  //   name: String,
  //   desc: String,
  //   img: {
  //     data: Buffer,
  //     contentType: String,
  //   },
  // },
});

export const Product = models.Product || model("Product", ProductSchema);
