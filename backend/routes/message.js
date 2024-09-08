import { requireAuth } from '../middleware/jwt.js';
import {createMessage, getMessages} from '../controllers/message.js';

export function messageRoutes(app){
    app.get('/user/:id/msg',  requireAuth, async (req, res) => {
    try {
        const userId = req.params.id; 
        return res.json(await getMessages(userId))
    } catch (err) {
      console.error('error listing messages', err)
      return res.status(500).end()
    }
  })

  app.post('/user/:id/msg', requireAuth, async (req, res) => {
    try {
      const userId = req.params.id; 
      const post = await createMessage(userId, req.body)
      return res.json(post)
    } catch (err) {
      console.error('error creating message', err)
      return res.status(500).end()
    }
  })
}