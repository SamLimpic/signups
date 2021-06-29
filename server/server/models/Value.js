import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const Value = new Schema(
  {
    expMin: { type: Number, required: true },
    expMax: { type: Number, required: true },
    expBase: { type: Number, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
