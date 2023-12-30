import mongoose from "mongoose";

const { Schema } = mongoose;

const reviewSchema = new Schema({
  rating: { type: Number, min: 0 },
  comment: { type: String },
});

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  review: [reviewSchema],
});
