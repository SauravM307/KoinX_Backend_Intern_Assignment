const axios = require("axios");
const Crypto = require("./models/cryptoModel.js");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");

dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
//Calling the coingecko's Api to get the list of all cryptocurrencies and store it on our cryptoModel
exports.connect = async () => {
  try {
    await mongoose.connect(DB);
    console.log("DB connection succesful!!!");
  } catch (err) {
    console.log(err);
  }
};
exports.deleteData = async () => {
  try {
    await Crypto.deleteMany();
  } catch (err) {
    console.log(err);
  }
};
exports.fetchAndStore = async () => {
  const response = await axios.get(
    "https://api.coingecko.com/api/v3/coins/list"
  );
  const cryptocurrencies = response.data.map(({ id, name }) => ({ id, name }));
  const result = await Crypto.insertMany(cryptocurrencies);
  console.log(result);
  //   console.log(`${result.insertedCount} crypto currencies inserted!`);
  await mongoose.disconnect();
};

//THESE FUNCTIONS ARE EXACT COPY OF THE ABOVE BUT TO RUN SEPARATELY
const deleteDataNow = async () => {
  try {
    await Crypto.deleteMany();
  } catch (err) {
    console.log(err);
  }
};
const fetchAndStoreNow = async () => {
  const response = await axios.get(
    "https://api.coingecko.com/api/v3/coins/list"
  );
  const cryptocurrencies = response.data.map(({ id, name }) => ({ id, name }));
  const result = await Crypto.insertMany(cryptocurrencies);
  console.log(result);
  //   console.log(`${result.insertedCount} crypto currencies inserted!`);
};
(async () => {
  try {
    await mongoose.connect(DB);
    console.log("DB connection succesful!!!");
    await deleteDataNow();

    await fetchAndStoreNow();

    //Disconnect the database
    await mongoose.disconnect();
  } catch (err) {
    console.log(err);
  }
})();