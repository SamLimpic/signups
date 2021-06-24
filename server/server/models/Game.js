import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const Game = new Schema(
  {
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    experience: { type: Number, required: true },
    size: { type: Number, required: true },
    players: { type: Array }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
