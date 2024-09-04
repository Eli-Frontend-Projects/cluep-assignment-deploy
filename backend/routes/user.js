import {loginUser, createUser} from '../controllers/user.js'

export function userRoutes(app) {
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

  app.post('/api/signup', async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      console.log(req.body)
      const user = await createUser({ firstName, lastName, email, password });
      return res.status(201).send({ message: 'User created successfully', user });
    } catch (err) {
      return res.status(400).send({
        error: 'Signup failed, could not create user.',
      });
    }
  });
}
