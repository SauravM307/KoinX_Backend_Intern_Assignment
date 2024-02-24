const mongoose = require("mongoose");
const axios = require("axios");

const cryptoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A cryptocurrency must have a name!"],
  },
  id: {
    type: String,
    unique: [true, "A crypto currency must have a unique id!"],
    required: [true, "A crypto currency must have a id!"],
  },
});

const crypto = mongoose.model("Crypto", cryptoSchema);

module.exports = crypto;
