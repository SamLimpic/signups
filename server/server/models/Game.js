import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const Game = new Schema(
  {
    creatorId: { type: String, ref: 'Account', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    day: { type: String, required: true },
    length: { type: Number, required: true },
    experience: { type: Number, required: true },
    size: { type: Number, required: true, default: 5 },
    live: { type: Boolean, default: false },
    outdoor: { type: Boolean, default: false },
    masked: { type: Boolean, default: false },
    players: { type: Array },
    choice: { type: Number }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Game.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
