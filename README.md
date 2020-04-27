# Robert Elias Branch

# Backend

# `Dev Desk` Table

- Field contents are not checked for formatting or proper data. *Garbage in, garbage out.*
- Check the `getById` output example below for the fields to send.
- `POST` - all fields are required *except id*.
- `PUT` - all fields are required ***including*** *id*.

| HTTP | Path               | route method | Desc                                   | Data|
|-|-|-|-|-|
|POST  | /api/auth/register | add          | adds new user                          |
|POST  | /api/auth/login    | findBy       | logs in new user and provides token    |

| GET  | /api/users/    | find         | Gets the full list of all users. | returns a list of user objects.| requires authorization token to obtain users

-- Register https://devdeskapi.herokuapp.com/api/auth/register
-- Login https://devdeskapi.herokuapp.com/api/auth/login
-- resources Postgres
-- DB_ENV production
