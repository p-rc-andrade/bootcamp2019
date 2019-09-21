import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  // [POST] /sessions - Get Access Token
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    // check if user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // check if password is valid
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
