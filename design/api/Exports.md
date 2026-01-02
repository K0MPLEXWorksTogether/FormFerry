# FormFerry - Exports Microservice

This service works with the notification service for mail. For the rest, it is a REST service that that fetches the data in `.xlsx` and `.csv`. For temporary file storing, minio is used. The implementation developer stories are mentioned clearly below.

## CSV
- The client sends a `POST` request to `/exports/csv`.
- The logic at the route, recieves this request, and creates a database connection with the database. 
- The logic then queries the database, and creates the .csv file.
- This is then stored in the minio client, and a URL of the file stored on minio is returned to the client.
- Then, after about 10 minutes, the .csv file is deleted.