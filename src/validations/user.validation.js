const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  body: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().custom(password),
    bio: Joi.string().allow(''),
    phone: Joi.string().pattern(new RegExp('^[0-9]{10}$')).allow('', null)
      .message('Phone number must be 10 digits'),
    photo: Joi.string().allow('', null),
  }),
};

const updateUserPhoto = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    photo: Joi.string().required(),
  }),
};

const updateUserStatus = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    isPublic: Joi.boolean().required(),
  }),
};


module.exports = { 
  getUser,
  updateUser,
  updateUserStatus,
  updateUserPhoto,
};
