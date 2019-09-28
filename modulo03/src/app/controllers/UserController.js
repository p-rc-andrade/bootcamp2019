import User from '../models/User';
import File from '../models/File';

class UserController {
  // [GET] /users - Get User list
  async index(req, res) {
    const Users = await User.findAll({
      where: { provider: false },
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(Users);
  }

  // [POST] /users - User Sign Up
  async store(req, res) {
    // User already exists?
    const userExists = await User.findOne({
      where: { email: req.body.email },
    });

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

  // [PUT] /users
  async update(req, res) {
    const { email, oldPassword } = req.body;

    // userId obtained in auth middleware which decoded the access token
    // which as a {id} payload
    const user = await User.findByPk(req.userId);

    // Check if update email already exists
    if (email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    // Check if oldPassword is valid
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    // Update user
    const { id, name, provider } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
