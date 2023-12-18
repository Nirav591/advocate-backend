const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

const authRoute = require('./routes/auth.route');

app.use(cors());
app.use(express.json());

// Set up headers for CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/auth', authRoute);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
