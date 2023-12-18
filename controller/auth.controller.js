const { pool } = require('../config/sql.config');
const emailValidator = require('email-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const handleDatabaseError = (res, err) => {
  console.log('Database error:', err);
  return res.status(400).json({
    message: 'An error occurred',
    error: err.message,
  });
};

exports.createUser = async (req, res) => {
  try {
    if (!emailValidator.validate(req.body.email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }
    if (req.body.password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }

    const hash = await bcrypt.hash(req.body.password, 10);
    const user = { ...req.body, password: hash };
    pool.query('INSERT INTO users SET ?', user, (err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json(user);
    });
  } catch (err) {
    return handleDatabaseError(res, err);
  }
};

exports.loginUser = (req, res) => {
  pool.query('SELECT * FROM users WHERE email = ?', [req.body.email], async (err, user) => {
    try {
      if (user.length === 0) {
        return res.status(401).json({ message: 'No such user email' });
      }
      const JWTtoken = 'secretKey';
      const token = jwt.sign({ id: user[0].id }, JWTtoken, {
        algorithm: 'HS256',
        expiresIn: '24h',
      });

      const isPasswordValid = await bcrypt.compare(req.body.password, user[0].password);
      if (isPasswordValid) {
        return res.status(200).json({
          message: 'Login successful!',
          name: user[0].name,
          email: user[0].email,
          role: user[0].role,
          token: token,
        });
      } else {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
    } catch (err) {
      return handleDatabaseError(res, err);
    }
  });
};
