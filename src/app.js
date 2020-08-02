const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');
const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());

// Import Routes
const apiRoute = require('./routes/api');
const webRoute = require('./routes/web');
const { request } = require('express');
app.use('/api', apiRoute);
app.use('/', webRoute);

// DB Connection Routes
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Connected to DB...');
  })
app.listen(port);