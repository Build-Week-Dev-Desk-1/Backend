# Robert Elias Branch

# Backend

# `Dev Desk` Table

- Field contents are not checked for formatting or proper data. *Garbage in, garbage out.*
- Check the `getById` output example below for the fields to send.
- `POST` - all fields are required *except id*.


# `users` Table

| HTTP | Path               | Desc                                   | Data|
|-|-|-|-|
| POST | /api/auth/register | Registers new user. | Expects `{"username":"", "password":"", "email":""}`|
||||Returns `{ "id":##, "username":""}`|
| POST | /api/auth/login    | Logs in a user.   |  Expects `{"username":"", "password":""}`|

-- Register https://devdeskapi.herokuapp.com/api/auth/register
-- Login https://devdeskapi.herokuapp.com/api/auth/login
-- resources Postgres
-- DB_ENV production
