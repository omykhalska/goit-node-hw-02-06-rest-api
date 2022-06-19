const { User } = require('../../models');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await User.findOne({ email });
    if (result) {
      throw createError(409, 'Email in use');
    }

    const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync(10));

    const avatarURL = gravatar.url(email, {}, true);

    const user = await User.create({
      ...req.body,
      password: hashedPassword,
      avatarURL,
    });

    res.status(201).json({
      status: 'success',
      code: 201,
      user: {
        email: user.email,
        subscription: user.subscription,
        avatar: user.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
