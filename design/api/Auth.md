# FormFerry - Authethication Microservice

This microservice works in close accordance with the notification microservice for email notifications. The service majorly supports three services. The developer stories for these microservices are mentioned clearly below. 

## Signup
- The client sends a `POST` request at `/users/signup` with request body containing email and password.
- The logic at the route first creates an entry of this user in the `Users` table with the status `unverified`. 
- The logic at the route creates a entry of subscription with plan `Free` in the `Subscriptions` table.
- A key-value pair entry is created in Redis, with the key being the user's email, and the value being an newly generated UUID. A verification link for the which accepts the needed query parameters on the client side is sent.
- The logic at the route, then places a message in the RabbitMQ Queue with the purpose `Verification`, along with details such as the `email` and `verification link`.
- The notification service then recieves this message, selects the appropriate email template, plugs the sent data into the template, and mails the user with the details.
- The user recieves this mail, and clicks on the verification link. The logic for the verificaition is mentioned below. Let's assume it succeeded. In that case, the client renders a success message, and asks the user to login.

## Verify
- The client-side link recieves the UUID as query parameters, and sends a `POST` request to `/users/verify`, with this UUID in the body.
- The UUID is looked for in the redis cache. If it is present, then the status of the user in the database is set to `verified`. 
- The response is sent as `successful` with status code `200`. 
- In case the uuid is not present in the cache, the response is sent out to be `unsuccessful` with status code `404`.
- The client recieves the message, and redirects the shows the success UI, and then sends the user to the login page.

## Login
- The client sends a `POST` request to `/users/login` with the email and password in the body.
- The logic in the route checks if the password matches the password in the `passwordHash` field.
- The logic also checks if the user is `verified`. If the user is not verified, then the user is not allowed to login.
- If the password is right, then then a JWT token is generated with the userId only encoded, and sent to the client. The client must remember this JWT, as all the routes after being logged in are protected.
- The client recives this information, and redirects the user to the home UI.

## Miscellenous Notes
- All the APIs for this service are unprotected, but are accepting requests from only the client using CORS.
- The user also cannot spam requests, as the system implements a simple application-level IP based rate-limiter.