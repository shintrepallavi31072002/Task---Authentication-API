const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');


const getUser = catchAsync(async (req, res) => {
  if (req.params.userId !== req.user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You are not authorized to access this resource');
  }
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  if (req.params.userId !== req.user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You are not authorized to update this resource');
  }
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const updateUserPhoto = catchAsync(async (req, res) => {
  const user = await userService.updateUserPhotoById(req.params.userId, req.body.photo);
  res.send(user);
});

const updateUserStatus = catchAsync(async (req, res) => {
  const user = await userService.updateUserStatusById(req.params.userId, req.body.isPublic);
  res.send(user);
});

const getAllUsers = catchAsync(async (req, res) => {
  const users = await userService.getAllUsers(req.user.id);
  res.send(users);
});

module.exports = {
  getUser,
  updateUser,
  updateUserPhoto,
  updateUserStatus,
  getAllUsers,
};
