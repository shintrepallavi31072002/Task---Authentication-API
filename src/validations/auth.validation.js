const Joi = require('joi');
const { password } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    phone: Joi.string().pattern(new RegExp('^[0-9]{10}$')).allow('', null)
      .message('Phone number must be 10 digits'),
    photo: Joi.string().allow('', null),
    bio: Joi.string().allow('', null),
    isPublic: Joi.boolean().optional(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};


module.exports = {
  register,
  login,
  logout,
};
