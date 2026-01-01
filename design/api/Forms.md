# FormFerry - Forms Microservice

This API is pretty much a standalone API. It does not have to communicate with a lot of services. The developer notes for the services provided for this service are mentioned clearly below.

## Create a Form
- The client sends a JSON schema created on the client. This schema can only have some predefined types, like


## Miscellenaous Notes
- The routes under this service are protected via JWT authenticatication, and accept requests from the client via CORS.
- The client cannot spam requests, as there is an ID-based rate-limiter.