# Robert Elias Branch

# Backend

# `Dev Desk Backend API` 

# `Users` Table
- Register and Log in user
- Ability to determine user as admin(helper) or student with boolean true || false
- Get list of users and user by id
- Update users by id
- Delete users by id


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

- Post a new ticket
- Obtain list of tickets and ticket by id
- Update ticket by id
- Delete ticket by id

| HTTP | Path               | Desc                                   | Data|
|-|-|-|-|
| GET | /api/tickets/ | Get all tickets.   |  Output `{"id", "userid", "title", "description", "completed" }`|
| POST | /api/tickets/      | Creates ticket    |Expects `{"id", "userid", "title", "description", "completed", "assigned" }`|
| GET | /api/tickets/:id    | Gets a ticket by id.   |  Expects `{"id","userid", "title", "description", "completed", "assigned" }`|
| PUT | /api/tickets/:id | Updates a ticket by id.   |  Expects `{no user information on body}`|
| DELETE | api/tickets/:id | Deletes a ticket by id.   |  Expects `{no user information on body}`|

-- title, description, what I've tried, category 


-- Gets and Posts new ticket https://devdeskapi.herokuapp.com/api/tickets/

-- Gets, Updates, Deletes ticket by id https://devdeskapi.herokuapp.com/api/tickets/1

-- Gets tickets list https://devdeskapi.herokuapp.com/api/tickets

-- Updates tickets by id https://devdeskapi.herokuapp.com/api/tickets/1

-- Deletes tickets by id https://devdeskapi.herokuapp.com/api/tickets/10
