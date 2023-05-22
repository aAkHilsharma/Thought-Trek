const express = require('express');
const cors = require('cors');
const dbConfig = require('./config/dbConfig');
const userRoute = require('./routes/userRoute');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use('/', userRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server connected on port ${port}`);
});
