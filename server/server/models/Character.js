import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const Character = new Schema(
  {
    playerId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    name: { type: String, required: true },
    race: { type: String, required: true },
    class: { type: String, required: true },
    experience: { type: Number, required: true, default: 0 },
    dead: { type: Boolean, required: true, default: false },
    killDate: { type: Date }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Character.virtual('player', {
  localField: 'playerId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
