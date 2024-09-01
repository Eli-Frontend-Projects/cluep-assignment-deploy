import {loginUser} from '../controllers/user.js'

export function userRoutes(app) {
  console.log("using this route")
  app.post('/api/login', async (req, res) => {
    try {
      const token = await loginUser(req.body)
      return res.status(200).send({ token })
    } catch (err) {
      return res.status(400).send({
        error: 'login failed, did you enter the correct username/password?',
      })
    }
  })
}
