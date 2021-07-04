import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const Value = new Schema(
  {
    base: { type: Number, required: true },
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    interval: { type: Number, required: true },
    race: { type: Array, required: true },
    class: { type: Array, required: true },
    live: { type: Boolean, required: true, default: false }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
