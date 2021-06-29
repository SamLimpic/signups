import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const Experience = new Schema(
  {
    expMin: { type: Number, required: true, default: 0 },
    expMax: { type: Number, required: true, default: 0 },
    expBase: { type: Number, required: true, default: 0 }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
