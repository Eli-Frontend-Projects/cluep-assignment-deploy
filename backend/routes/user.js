import { loginUser, createUser, getUserFullNameById } from '../controllers/user.js';

export function userRoutes(app) {
  app.post('/user/login', async (req, res) => {
    try {
      const response = await loginUser(req.body);
      if (response.error) {
        return res.status(400).send({ error: response.error });
      }
      return res.status(200).send({ token: response.token });
    } catch (err) {
      return res.status(500).send({
        error: 'An error occurred during login.',
      });
    }
  });

  app.post('/user/signup', async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      const response = await createUser({ firstName, lastName, email, password });
      console.log('response', response)
      if (response.error) {
        return res.status(400).send({ error: response.error });
      }
      return res.status(201).send({ message: 'User created successfully', token: response.token });
    } catch (err) {
      return res.status(500).send({
        error: 'An error occurred during signup.',
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
