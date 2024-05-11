const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');


/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const user = await User.create({
    ...userBody,
    isPublic: true, 
  });
  return user;
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};


/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Update user's profile photo by ID
 * @param {string} userId 
 * @param {string} photoUrl 
 * @returns {Promise<User>}
 */
const updateUserPhotoById = async (userId, photoUrl) => {
  const user = await getUserById(userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  user.photo = photoUrl;
  await user.save();
  return user;
};



/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Update user's profile status (public/private) by ID
 * @param {string} userId 
 * @param {boolean} isPublic
 * @returns {Promise<User>}
 */
const updateUserStatusById = async (userId, isPublic) => {
  const user = await getUserById(userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  user.isPublic = isPublic;
  await user.save();
  return user;
};

const getAllUsers = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (user.role === 'admin') {
    return User.find();
  } else {
    return User.find({ isPublic: true });
  }
};

module.exports = {
  createUser,
  getUserById,
  updateUserById,
  getAllUsers, 
  updateUserPhotoById,
  updateUserStatusById,
  getUserByEmail,
};
