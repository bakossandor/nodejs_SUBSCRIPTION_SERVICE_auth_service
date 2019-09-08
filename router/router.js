const issueToken = require('../controllers/issueToken');
const validateToken = require('../controllers/authorize');

module.exports = (app) => {
  app.post('/issue-token', issueToken);
  app.post('/validate-token', validateToken);
}
