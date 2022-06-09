const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  try {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer') {
      throw createError(401, 'Not authorized');
    }

    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);
      if (!user) {
        throw createError(401, 'Not authorized');
      }
      req.user = user;
      next();
    } catch (error) {
      error.status = 401;
      error.message = 'Not authorized';
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
