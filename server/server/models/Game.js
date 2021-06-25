import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const Game = new Schema(
  {
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    length: { type: Number, required: true },
    experience: { type: Number, required: true },
    size: { type: Number, required: true },
    players: { type: Array },
    live: { type: Boolean, default: false },
    outdoor: { type: Boolean, default: false },
    masked: { type: Boolean, default: false }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)