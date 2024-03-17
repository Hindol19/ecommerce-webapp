import { Schema, model, models } from "mongoose";

const ImageSchema = new Schema({
  name: String,
  desc: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

export const Image = models.Image || model("Image", ImageSchema);
