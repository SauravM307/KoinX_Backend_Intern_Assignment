const dotenv = require("dotenv");
const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION!!!! SHUTTING DOWN.....");
  console.log(err);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app.js");

//INITIALISING THE DATABASE CONNECTION STRING
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

//CONNECTING TO OUR DATABASE ON ATLAS
mongoose
  .connect(DB)
  .then((con) => {
    console.log("DB connection succesfull!!!");
  })
  .catch((err) => {
    console.log(err.name, err.message);
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port${port}`);
});

//HANDLING UNHANDLED REJECTIONS
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION!!!! SHUTTING DOWN.....");
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
