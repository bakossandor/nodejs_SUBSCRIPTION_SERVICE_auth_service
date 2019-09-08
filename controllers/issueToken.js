const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const pool = new Pool();

async function issueToken(request, response) {
  try {
    const { body: { email, password } } = request;
  
    const queryString = 'SELECT * FROM "project-owners" WHERE email = $1';
    const { rows : [userData] } = await pool.query(queryString, [email]);

    if(!userData) {
      response.status(401).end();
    }

    const match = await bcrypt.compare(password, userData.password);
    if(!match) {
      response.status(401).end();
    }

    delete userData['password'];

    const issuedTimeStamp = Date.now();
    userData.issuedTimeStamp = issuedTimeStamp;

    const token = jwt.sign({
      data: userData, 
      exp: Math.floor(issuedTimeStamp / 1000) + (7 * 24 * 60 * 60),
    }, process.env.JWT_KEY);
    response.send({token});  
  } catch (error) {
    next(error);
  }
}

module.exports = issueToken;