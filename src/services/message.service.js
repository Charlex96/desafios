import {MessagesModel} from '../../src/DAO/models/messages.model.js';

export class MessageService {
  async getMessages (limit) {
    try {
      return await MessagesModel.find({}).limit(limit).lean()
    } catch {
      return []
    }
  }

  async createMessage (message) {
    return await MessagesModel.create(message)
  }
}

