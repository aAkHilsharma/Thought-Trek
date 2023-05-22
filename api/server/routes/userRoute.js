const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer({ dest: 'uploads' });
const fs = require('fs');
const Post = require('../models/postModel');

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
      res.cookie('token', token).json({
        id: user._id,
        username,
      });
    } else {
      res.status(400).json('Wrong Credentials');
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

router.get('/profile', function (req, res) {
  const { token } = req.cookies;
  jwt.verify(token, process.env.jwt_secret, {}, (err, info) => {
    if (err) {
      throw err;
    }
    res.json(info);
  });
});

router.post('/logout', function (req, res) {
  res.cookie('token', '').json('ok');
});

router.post('/post', upload.single('file'), async function (req, res) {
  const { originalname, path } = req.file;
  const parts = originalname.split('.');
  console.log(parts);
  const ext = parts[parts.length - 1];
  const newPath = path + '.' + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, process.env.jwt_secret, {}, async (err, info) => {
    if (err) {
      throw err;
    }
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json(postDoc);
  });
});

router.get('/post', async function (req, res) {
  const posts = await Post.find()
    .populate('author', ['username'])
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(posts);
});

module.exports = router;
