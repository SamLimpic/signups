import mongoose from 'mongoose'
import { Character as CharacterSchema } from '../models/Character'
import { Game as GameSchema } from '../models/Game'
import { Value as ValueSchema } from '../models/Value'
import { AccountSchema } from '../models/Account'

class DbContext {
  Characters = mongoose.model('Character', CharacterSchema);
  Games = mongoose.model('Game', GameSchema);

  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
}

export const dbContext = new DbContext()
