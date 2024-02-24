# KoinX Backend Intern Assignment

The project contains all the tasks mentioned in the assignment.

To run the project on the local environment,
use the command:
npm install
to install all the modules locally. To start the project and run it on the server, please use the command:
npm start
The script:
import-crypto-data.js contains the code for the task 1 of the assignment.To update the MongoDB  database after every 1 hour,I have used the node-schedule library.
Even though it is a bad security practice to put config.env file on github,I have put it so that the project an run without any problems.
The config.env file also contains the database connection string along with the passwords so that anyone can remotely connect and even check the collection on compass or atlas.

For the tasks that required to create API endpoints:
I have used the MVC architecture and given emphasis on code readability as well.The server runs on port 3000 and so as to test the API please use the following endpoints:


1) http://127.0.0.1:3000/api/v1/companies
   request format:
   {
	    "currency": "bitcoin" // Possible values are only bitcoin or ethereum.
   }
   sample request:
   http://127.0.0.1:3000/api/v1/companies?currency=ethereum

   sample response:
   {"status":"success","data":{"companies":["Meitu Inc","Mogo Inc."]}}

2) http://127.0.0.1:3000/api/v1/companies
     request format:
     {
	    “fromCurrency”: “bitcoin”,
	    “toCurrency”: “basic-attention-token”,
	    “date”: “12-01-2023”
     }
   sample request:
   http://127.0.0.1:3000/api/v1/companies?fromCurrency=bitcoin&toCurrency=basic-attention-token&date=12-01-2023

   Sample response:
   {"status":"success","price":{"priceInToCurrency":89193.51441603783}}

   
  
