# Subscription Service - Authentication / Authorization Microservice
## Description
This Authentication / Authorization Microservice:
- provides JWT webtoken
- validate JWT webtoken
- grant access to users based on the access level and their scope

## Routes
|METHOD|ROUTE          |REQUEST BODY     |
|------|---------------|-----------------|
|POST  |/issue-token   |{email, password}|
|POST  |/validate-token|{token, id_param}|

## ENV variables
|NAME      |description              |
|----------|-------------------------|
|PGHOST    |postgre sql host         |
|PGUSER    |postgre sql username     |
|PGDATABASE|postgre sql database name|
|PGPASSWORD|postgre sql password     |
|PGPORT    |postgre sql port         |
|JWT_KEY   |secret key for jwt token |