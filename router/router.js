const issueToken = require('../controllers/issueToken')

module.exports = (app) => {
  app.post('/issue-token', issueToken)
}