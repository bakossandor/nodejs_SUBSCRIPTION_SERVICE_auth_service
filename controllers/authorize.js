const jwt = require('jsonwebtoken');

async function authorize(request, response, next) {
  try {
    const { body : { token, id_param }} = request;
    const { data } = jwt.verify(token, process.env.JWT_KEY);
    if (data.access_level !== 0) {
      if (id_param) {
        if (id_param !== data._id) {
          response.status(401).end();
          return;
        }
      }
    }
    response.status(200).end();
  } catch (error) {
    if(error.name === 'JsonWebTokenError') {
      response.status(401).end();
      return;
    }
    if(error.name === 'TokenExpiredError') {
      response.status(401).end();
      return;
    }
    next(err);
  }
}

module.exports = authorize;
