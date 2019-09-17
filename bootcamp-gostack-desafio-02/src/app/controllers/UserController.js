import User from '../models/User';

class UserController {
  // POST /users - User Sign Up
  async store(req, res) {
    // User already exists?
    const userExists = await User.findOne({
      where: { email: req.body.email },
    });

    // console.log('UserExists?', userExists);
    // console.log('Email:', email);
    // console.log('Body:email', req.body.email);

    if (userExists) {
      return res.status(400).json({ error: 'user already exists' });
    }

    // Create new user
    const { id, name, email, provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(req, res) {
    return res.status(200).json({ message: 'Not finished!' });
  }
}

export default new UserController();
