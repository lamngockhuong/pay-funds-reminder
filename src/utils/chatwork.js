import config from '../config'
import { rest } from './rest'

export const sendMessage = async (message = '') => {
  let options = {
    headers: {
      'X-ChatWorkToken': config.chatwork.API_TOKEN
    }
  }

  return await rest.post(`https://api.chatwork.com/v2/rooms/${config.chatwork.ROOM_ID}/messages?body=${encodeURI(message)}`, { ...options })
}
