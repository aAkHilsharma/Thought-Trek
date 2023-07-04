const express = require('express');
const cors = require('cors');
const dbConfig = require('./server/config/dbConfig');
const routes = require('./server/routes/routes');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use('/', routes);

const path = require('path');
__dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server connected on port ${port}`);
});
