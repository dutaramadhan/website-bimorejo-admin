const express = require('express');
const bodyParser = require('body-parser');
const setupDB = require('./src/models/setupDB')
const cors = require('cors');
require('dotenv').config();
const articleRouter = require('./src/routes/articleRoute');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT;

setupDB();

app.use('/articles', articleRouter);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  return res.json({
    error: {
      message: err.message,
      status: err.status
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});