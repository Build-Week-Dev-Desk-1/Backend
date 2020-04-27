# Robert Elias Branch

# Backend

# `Dev Desk` Table

- Field contents are not checked for formatting or proper data. *Garbage in, garbage out.*
- Check the `getById` output example below for the fields to send.
- `POST` - all fields are required *except id*.
- `PUT` - all fields are required ***including*** *id*.

| HTTP | Path               | route method | Desc                                   | Data|
|-|-|-|-|-|
| GET  | /api/users/        | getAll       | Gets the full list of all users. | Returns an array of `findById` objects.|
| GET  | /api/users/count   | getCount     | Gets the number of users in the DB.   | Returns an object `{"count": 5}`|

-- resources Postgres
-- DB_ENV production
