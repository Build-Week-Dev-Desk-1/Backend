# Backend on Heroku API

# `Dev Desk Backend API` 


# `Auth Login`

- Register and Log in user
- Ability to determine user as admin(helper) or student with boolean true || false
- Get list of users and user by id

| HTTP | Path               | Desc                                   | Data|
|-|-|-|-|
| POST | /auth/register | Registers new user. | Expects `{"username":", "password", "email", "role":"}`|
| POST | /auth/login    | Logs in a user.   |  Expects `{"username":"", "password":""}`|


# `Users` Table

- Update users by id
- Delete users by id
- Role is either "student" or "tech"

| HTTP | Path               | Desc                                   | Data|
|-|-|-|-|
| GET | /users            | Gets all users     |  Output `{"id", "username":"", "email", "password", "role"}`|
| GET | /users/ticket      | Gets user by ID    | Ouput `{"id", "title":"", "description", "tried", "category", "solution", "assigned", "resolved"}`|
| GET | /users/:id      | Gets user by ID    | Output `{"id", "username":"", "email", "password", "role"}`|
| POST | /users/ticket/:id/asgn | Adds ticket to a user by id. only techs can assign tickets  |  Expects `{"id"}`|
| POST | /users/ticket/:id/resolved | resolves ticket to a user by id. only techs can assign tickets  |  Expects `{"id"}`|
| POST | /users/:id/1    | Adds ticket to a user by id.   |  Expects `{"id", "username":"", "email", "password", "role"}`|
| PUT | /users/:id/1    | Updates a user by id.   |  Expects `{"id", "username":"", "email", "password", "role"}`|
|PUT | /users/tickets/:id/reassign    | Updates a user by id.   |   Expects `{no user information on body, just "id"}`|
| DELETE | users/:id/1 | Deletes a user ticket by id.   |  Expects `{no user information on body, just "id"}`|

-- Register https://devdeskapi.herokuapp.com/auth/register

-- Login https://devdeskapi.herokuapp.com/auth/login

-- get users https://devdeskapi.herokuapp.com/users

-- get user by id https://devdeskapi.herokuapp.com/users/:id/2

-- Update & Delete user by id  https://devdeskapi.herokuapp.com/users/:id/4


# `Tickets` Table

- Add a new ticket
- Obtain list of tickets and ticket by id
- Get list of open and closed tickets
- Update ticket by id
- Delete ticket by id

| HTTP | Path               | Desc                                   | Data|
|-|-|-|-|
| GET | /tickets/ | Lists all tickets.   |  Output `{"id", "userid", "title", "description", "completed" }`|
| POST | /tickets/      | Adds a new ticket    |Ouput `{"title":"", "description", "tried", "category"}`|
| GET | /tickets/open      | Lists open tickets    |Ouput `{"id", "title":"", "description", "tried", "category", "solution", "assigned", "resolved"}`|
| GET | /tickets/closed      | Lists closed tickets    |Ouput `{"title":"", "description", "tried", "category"}`|
| GET | /tickets/:id    | Gets a ticket by id.   |  Expects `{"id", "title":"", "description", "tried", "category", "solution", "assigned", "resolved"}`|
| PUT | /tickets/:id | Updates a ticket by id.   |  Expects `{"id", }`|
| DELETE | /tickets/:id | Deletes a ticket by id.   |  Expects `{"id" no user information on body}`|


-- title, description, what I've tried, category 


-- Gets and Posts new ticket https://devdeskapi.herokuapp.com/tickets/

-- Gets, Updates, Deletes ticket by id https://devdeskapi.herokuapp.com/tickets/1

-- Gets tickets list https://devdeskapi.herokuapp.com/tickets

-- Updates tickets by id https://devdeskapi.herokuapp.com/tickets/1

-- Deletes tickets by id https://devdeskapi.herokuapp.com/tickets/10
