# Robert Elias Branch

# Backend

# `Dev Desk` Table

- Field contents are not checked for formatting or proper data. *Garbage in, garbage out.*
- Check the `getById` output example below for the fields to send.
- `POST` - all fields are required *except id*.


# `users` Table

| HTTP | Path               | Desc                                   | Data|
|-|-|-|-|
| POST | /api/auth/register | Registers new user. | Expects `{"username":", "password":", "email":"}`|
| POST | /api/auth/login    | Logs in a user.   |  Expects `{"username":"", "password":""}`|
| GET | api/users            | Gets all users     |  Expects `{"id", "username":"", "email", "password", "admin"}`|
| GET | api/users/:id/      | Gets user by ID    | Expects `{"id", "username":"", "email", "password", "admin"}`|
| PUT | api/users/:id/1    | Updates a user by id.   |  Expects `{"id", "username":"", "email", "password", "admin"}`|
| DELETE | api/users/:id/1 | Deletes a user by id.   |  Expects `no user information on body`|


|           |              |                |                                        |
-- Register https://devdeskapi.herokuapp.com/api/auth/register
-- Login https://devdeskapi.herokuapp.com/api/auth/login
-- get users https://devdeskapi.herokuapp.com/api/users
-- get user by id https://devdeskapi.herokuapp.com/api/users/id
-- Update & Delete user by id  https://devdeskapi.herokuapp.com/api/users/:id/4

-- resources Postgres
-- DB_ENV production
