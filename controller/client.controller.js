const { pool } = require('../config/sql.config');

const handleDatabaseError = (res, err) => {
  console.error('Database error:', err);
  return res.status(400).json({
    message: 'An error occurred',
    error: err.message,
  });
};

exports.clientList = async (req, res) => {
  try {
    const {
      company_or_organization,
      client_name,
      client_email,
      client_mobile,
      emergency_mobile,
      gender,
      category,
      country,
      state,
      city,
      client_address,
      description,
    } = req.body;
    const queryParams = [
      company_or_organization,
      client_name,
      client_email,
      client_mobile,
      emergency_mobile,
      gender,
      category,
      country,
      state,
      city,
      client_address,
      description,
    ];
    let query =
      'INSERT INTO clients ( company_or_organization, client_name, client_email, client_mobile, emergency_mobile ,gender, category,country,state,city,client_address,description) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
    pool.query(query, queryParams, async (err, result) => {
      console.log(result, 'result');

      if (err) {
        return handleDatabaseError(res, err);
      }
      return res.status(200).json({ success: true, message: 'Client created successfully!' });
    });
  } catch (err) {
    return handleDatabaseError;
  }
};

exports.getClientList = async (req, res) => {
  try {
    // Define your SQL query to fetch client data
    const query = 'SELECT * FROM clients';

    // Execute the query using the database connection pool
    pool.query(query, async (err, result) => {
      if (err) {
        return handleDatabaseError(res, err);
      }

      // Return the list of clients in the response
      return res.status(200).json({ success: true, clients: result });
    });
  } catch (err) {
    return handleDatabaseError(res, err);
  }
};
