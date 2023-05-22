const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

router.post('/register', async function (req, res) {
  const { username } = req.body;
  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    const user = new User(req.body);
    await user.save();
    console.log(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/login', async function (req, res) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'User does not exists' });
    }

    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (passwordCorrect) {
      const token = jwt.sign(
        { username, id: user._id },
        process.env.jwt_secret
      );
      res.cookie('token', token).json('ok');
    } else {
      res.status(400).json('Wrong Credentials');
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
