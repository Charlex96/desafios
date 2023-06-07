import express from "express";

import {MessageService} from '../services/message.service.js'
export const messageRouter = express.Router();

const messageService = new MessageService();

messageRouter.get('/', async (req, res) => {
  const { limit = 20 } = req.query
  const messages = await messageService.getMessages(limit)
  res.status(200).json({
    success: true,
    payload: messages
  })
})

messageRouter.post('/', async (req, res) => {
  const message = await messageService.createMessage(req.body)
  req.clientSocket?.broadcast.emit('new_message', message) ??
    req.ioServer.emit('new_message', message)
  res.status(200).json({
    success: true,
    payload: message
  })
})

export default messageRouter;

