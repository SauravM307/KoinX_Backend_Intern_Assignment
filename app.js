const path = require("path");
const exp = require("constants");

const express = require("express");

const morgan = require("morgan");
const schedule = require("node-schedule");

const priceRouter = require("./routes/priceRoutes.js");
const companiesRouter = require("./routes/companiesRoutes.js");
const app = express();
const scheduleScript = require("./import-crypto-data.js");

//DEVELOPMENT LOGGING
if (process.env.NODE_ENV === "development") app.use(morgan("dev")); //for logging

//BODY PARSER,DATA FROM BODY INTO req.body
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(express.json({ limit: "10kb" }));

//SENDING REQUEST TO COINGECKO'S API AND FETCHING ALL CRYPTOCURRENCIES NAMES AND IDs AND UPDATING THEM IN OUR DATABASE EVERY HOUR
schedule.scheduleJob("0 * * * *", async () => {
  console.log("Updating cryptocurrencies list...");
  await scheduleScript.connect();
  await scheduleScript.deleteData();
  await scheduleScript.fetchAndStore();
  console.log("DATABASE SUCCESFULLY UPDATED!");
});
//SERVER ROUTES
app.use("/api/v1/price", priceRouter);
app.use("/api/v1/companies", companiesRouter);
module.exports = app;
