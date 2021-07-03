import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const Value = new Schema(
  {
    base: { type: Number, required: true },
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    interval: { type: Number, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
