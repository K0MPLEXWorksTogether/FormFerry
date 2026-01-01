# FormFerry - A Simple Form Data Aggregator

## Project Name
FormFerry

## Problem Solved
Maintaining a backend for a website with simple form fills, and no business logic.

## Userbase
- Frontend Developers who do not want to involve a backend in any way.
- Simple business owners that made their website using wix studio, or wordpress.

## Core Features
- signup, verify their mail, and finally log in to the service.
- CRUD forms. 
- Store, read, export and delete form data. Server-side encryption is used.
- Upgrade or downgrade plan.
- Quota of form rows, not requests.

## User Stories

### User Signup And Verification
- User visits the website.
- Likes the service, decides to signup.
- Provides an email and password to a form on the website.
- Website then sends the server this email and password.
- Recieves a mail on their provided mail address, and the client asks the user to verify via mail.
- Checks their mail, and clicks on the link provided on the mail.
- When clicked, it takes the user to the website, and tells the user the signup was successful, and can now log in.

### User Login
- User visits the website.
- Enters the email and password as during signup.
- Sees the landing page.

### User Forms CRUD
- User successfully logs in to the website.
- The user sees a small workspace on the landing page. Here, the user can enter key-value pairs. The key is the name of the form label, and the value is a dropdown from which the user can select a type.
- After some interaction, the user is able to craft a simple schema of the data. When the user clicks create, the client sends this data to the server, and the user is shown that the form is created, and the user recieves a link the user can bind to the actual form.
- At any time, the user can come to the dashboard, and change, view or delete a form. 

### User Forms Data
- User successfully logs into the website.
- There, in the created form, there is a button called get data. It opens a modal, that allows the user to select from various choices such as excel, csv, mail notification. The csv choice, generates a .csv file of all the data. The excel generates a .xlsx file of all the data, and the email notification sends a mail everytime a new row is added.
- The user also sees a button called delete, which will delete all the aggregated data so far.

### User Plans
- The user likes the application, and decides to upgrade.
- The user sees a button called upgrade, and when clicked, shows them the available plans, which is premium and business. The user clicks the premium plan.
- The user is then prompted to a third-party service called stripe, where the payment is made as an autopay for a month. The user is then redirected to the application. 
- Then, the user can see that their quota has increased. 
- Now, the user wants to walk away from the service. They see a button called downgrade. When clicked, the user is asked if the user is sure, and asked to enter their password again. If the password is correct, the user is downgraded to free.

### User Current Quota
- The user sees the dashboard, and notices a quota section, and clicks on it.
- The user is then shown the total amount of data stored on the database, related to the user. It also shows when the data was created, with a contribution graph.

## Acceptance Criteria
- The user is able to sign up, verify themselves and log in.
- The user is able to CRUD forms.
- The user is able read and delete their form data. 
- The server maintains the form data using server-side encryption.
- The user is able to upgrade and downgrade freely.
- The user is able to see the usage statistics of their quota correctly.
- The codebase is written modularly, is fairly tested only in the DB layer, not in the application layer.
