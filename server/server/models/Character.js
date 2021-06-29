import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const Character = new Schema(
  {
    creatorId: { type: String, ref: 'Account', required: true },
    name: { type: String, required: true },
    race: { type: String, required: true },
    class: { type: String, required: true },
    experience: { type: Number, required: true },
    level: { type: Number, required: true },
    imgUrl: { type: String, required: true, default: 'http://www.geocities.ws/Area51/Orion/3107/Lance21.jpg' },
    dead: { type: Boolean, required: true, default: false },
    killDate: { type: Date },
    games: { type: Array },
    liveGames: { type: Array }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Character.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
