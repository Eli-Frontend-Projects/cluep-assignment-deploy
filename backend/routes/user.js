import { loginUser, createUser, getUserFullNameById } from '../controllers/user.js';

export function userRoutes(app) {
  app.post('/user/login', async (req, res) => {
    try {
      const response = await loginUser(req.body);
      return res.status(200).send({ token: response.token });
    } catch (err) {
      return res.status(400).send({ error: err.message });
    }
  });

  app.post('/user/signup', async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      const response = await createUser({ firstName, lastName, email, password });
      return res.status(201).send({ message: 'User created successfully', token: response.token });
    } catch (err) {
      return res.status(400).send({ error: err.message });
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
