const express = require('express');
const User = require('../Models/User');
const { request, response } = require('express');
const router = express.Router();

router.post('/login', (request, response) => {
  try {
    const user = await User
      .where('username', request.params.username)
      .where('password', request.params.password);
    if (user.length) {
      return response.json({ message: 'Login Successful!!' });
    } else {
      return response.status(401).json({ message: 'Invalid username or password.' });
    }
  } catch (err) {
    const msg = err.message;
    return response.status(400).json({ message: msg });
  }
});

router.get('/users', async (request, response) => {
  try {
    const users = await User.find();
    return response.json(users);
  } catch (err) {
    const msg = err.message;
    return response.status(400).json({ message: msg });
  }
})

router.get('/users/:userId', async (request, response) => {
  try {
    const user = await User.where('id', request.params.userId);
    if (user.length) {
      return response.json(user[0]);
    } else {
      return response.status(400).json({ message: 'User not found' });
    }
  } catch (err) {
    const msg = err.message;
    return response.status(400).json({ message: msg });
  }
})

router.post('/users', async (request, response) => {
  const username = request.body.username;
  const checkUsername = await User.where('username', username);
  if (checkUsername.length) {
    return response.status(400).json({ message: 'Username already exists!' });
  }
  const lastId = await User.countDocuments();
  const user = new User({
    id: lastId + 1,
    fname: request.body.fname,
    lname: request.body.lname,
    username: request.body.username,
    password: request.body.password,
    occupation: request.body.occupation,
    phone: request.body.phone,
  });
  try {
    const savedUser = await user.save();
    return response.json(savedUser);
  } catch (err) {
    const msg = err.message;
    return response.status(400).json({ message: msg });
  }
});

router.patch('/users/:userId', async (request, response) => {
  try {
    const userObj = {};
    if (request.body.fname) {
      userObj.fname = request.body.fname;
    }
    if (request.body.lname) {
      userObj.lname = request.body.lname;
    }
    if (request.body.occupation) {
      userObj.occupation = request.body.occupation;
    }
    if (request.body.fname) {
      userObj.phone = request.body.phone;
    }
    const user = await User.where('id', request.params.userId);
    if (user.length) {
      const updateUser = await User.updateOne(
        { id: request.params.userId },
        { $set: userObj }
      );
      const user = await User.where('id', request.params.userId);
      return response.json(user[0]);
    } else {
      return response.status(400).json({ message: 'User not found' });
    }
  } catch (err) {
    const msg = err.message;
    return response.status(400).json({ message: msg });
  }
});

module.exports = router;