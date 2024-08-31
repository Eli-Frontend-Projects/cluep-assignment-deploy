import mongoose from 'mongoose';
import { createUser } from '../controllers/user.js';
import { User } from '../db/models/user.js';

describe('test creating users', () => {
  test('with all parameters should succeed', async () => {
    const user = {
      firstName: 'Dan',
      lastName: 'Hunter',
      email: 'dan@example.com',
      password: 'hunter2',
    };

    const createdUser = await createUser(user);
    
    expect(createdUser._id).toBeInstanceOf(mongoose.Types.ObjectId);

    const foundUser = await User.findById(createdUser._id);

    expect(foundUser).toEqual(expect.objectContaining({
      userID: createdUser.userID, 
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }));

  });
});