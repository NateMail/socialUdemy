const _ = require('lodash');
const User = require('../models/user');

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: 'User not found'
      });
    }
    req.profile = user;
    next();
  });
};

exports.hasAuthorization = (req, res, next) => {
  const authorized =
    req.profile && req.auth && req.profile._id === req.auth._id;
  if (!authorized) {
    return res.status(403).json({
      error: 'User is not authorized to preform this action'
    });
  }
};

exports.allUsers = (req, res) => {
  User.find((error, users) => {
    if (error) {
      return res.status(400).json({
        error: error
      });
    }
    res.json(users);
  }).select('name email updated created');
};

exports.getUser = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res, next) => {
  let user = req.profile;
  // extend - mutate the source object
  user = _.extend(user, req.body);
  user.updated = Date.now();
  user.save(error => {
    if (error) {
      return res.status(400).json({
        error: 'You are not authorized to preform this action'
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json({ user });
  });
};

exports.deleteUser = (req, res, next) => {
  let user = req.profile;
  user.remove((error, user) => {
    if (error) {
      return res.status(400).json({
        error: error
      });
    }
    res.json({ message: 'User deleted successfully' });
  });
};
