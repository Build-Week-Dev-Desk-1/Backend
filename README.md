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
| GET | /api/users            | Gets all users     |  Output `{"id", "username":"", "email", "password", "admin"}`|
| GET | /api/users/:id/      | Gets user by ID    | Ouput `{"id", "username":"", "email", "password", "admin"}`|
| PUT | /api/users/:id/1    | Updates a user by id.   |  Expects `{"id", "username":"", "email", "password", "admin"}`|
| DELETE | /api/users/:id/1 | Deletes a user by id.   |  Expects `{no user information on body}`|

-- Register https://devdeskapi.herokuapp.com/api/auth/register

-- Login https://devdeskapi.herokuapp.com/api/auth/login

-- get users https://devdeskapi.herokuapp.com/api/users

-- get user by id https://devdeskapi.herokuapp.com/api/users/:id/2

-- Update & Delete user by id  https://devdeskapi.herokuapp.com/api/users/:id/4


# `Tickets` Table

| HTTP | Path               | Desc                                   | Data|
|-|-|-|-|
| GET | /api/tickets | Get all tickets.   |  Output `{"id", "userid", "title", "description", "completed" }`|
| POST | /api/tickets/:id/      | Gets ticket by ID    |Output `{"id", "userid", "title", "description", "completed" }`|
| GET | /api/tickets/:id/1    | Updates a ticket by id.   |  Expects `{"id", "username":"", "email", "password", "admin"}`|
| PUT | /api/tickets/:id/1 | Deletes a ticket by id.   |  Expects `{no user information on body}`|
| DELETE | /api/tickets/:id/1 | Deletes a ticket by id.   |  Expects `{no user information on body}`|


-- get tickets list http://localhost:4000/api/tickets



-- resources Postgres
-- DB_ENV production
