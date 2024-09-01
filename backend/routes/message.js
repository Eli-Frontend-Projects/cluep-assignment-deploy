import { requireAuth } from '../middleware/jwt.js';
import {createMessage, getMessages} from '../controllers/message.js';

export function messageRoutes(app){
    app.get('/api/messages',  requireAuth, async (req, res) => {
    try {
        const userId = req.auth.sub; 
        return res.json(await getMessages(userId))
    } catch (err) {
      console.error('error listing messages', err)
      return res.status(500).end()
    }
  })

  app.post('/api/messages', requireAuth, async (req, res) => {
    try {
      const userId = req.auth.sub; 
      const post = await createMessage(userId, req.body)
      return res.json(post)
    } catch (err) {
      console.error('error creating message', err)
      return res.status(500).end()
    }
  })
}