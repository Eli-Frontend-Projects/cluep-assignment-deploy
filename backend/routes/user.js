import { loginUser, createUser, getUserFullNameById } from '../controllers/user.js';

export function userRoutes(app) {
  app.post('/user/login', async (req, res) => {
    try {
      const token = await loginUser(req.body);
      return res.status(200).send({ token });
    } catch (err) {
      return res.status(400).send({
        error: 'login failed, did you enter the correct username/password?',
      });
    }
  });

  app.post('/user/signup', async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      const user = await createUser({ firstName, lastName, email, password });
      return res.status(201).send({ message: 'User created successfully', user });
    } catch (err) {
      return res.status(400).send({
        error: 'Signup failed, could not create user.',
      });
    }
  });

  app.get('/user/:id', async (req, res) => {
    try {
      const userInfo = await getUserFullNameById(req.params.id);
      if (!userInfo || !userInfo.username) {
        return res.status(404).send({ error: 'User not found' });
      }
      return res.status(200).send(userInfo);
    } catch (err) {
      return res.status(500).send({ error: 'An error occurred while fetching user information' });
    }
  });
}