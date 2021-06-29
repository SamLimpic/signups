import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ValuesService {
  async getValues(query) {
    const values = await dbContext.Values.find(query)
    return values
  }

  async editValue(body) {
    const value = await dbContext.Values.findOneAndUpdate({ _id: body.id }, body, { new: true })
    if (!value) {
      throw new BadRequest('Invalid request')
    }
    return value
  }
}

export const valuesService = new ValuesService()
