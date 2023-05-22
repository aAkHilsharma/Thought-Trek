const express = require('express');
const cors = require('cors');
const dbConfig = require('./config/dbConfig');
const userRoute = require('./routes/userRoute');

const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use('/', userRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server connected on port ${port}`);
});
