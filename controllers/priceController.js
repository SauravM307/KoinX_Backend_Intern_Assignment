const axios = require("axios");

exports.priceInTermsOf = async (req, res) => {
  try {
    // Extract parameters from request
    const { fromCurrency, toCurrency, date } = req.body;
    // console.log(date);
    if (!fromCurrency || !toCurrency || !date) {
      return res.status(400).json({
        error: "Missing parameters. Required: fromCurrency, toCurrency, date",
      });
    }
    // Make request to Coingecko API to fetch historical price data for fromCurrency
    const fromCurrencyResponse = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${fromCurrency}/history`,
      {
        params: {
          date,
          localization: false,
        },
      }
    );

    // sending request to Coingecko API to fetch historical price data for toCurrency
    const toCurrencyResponse = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${toCurrency}/history`,
      {
        params: {
          date,
          localization: false,
        },
      }
    );

    // Extracting prices from responses
    const fromCurrencyPrice =
      fromCurrencyResponse.data.market_data.current_price["usd"];
    const toCurrencyPrice =
      toCurrencyResponse.data.market_data.current_price["usd"];

    // Calculating the exchange rate
    const exchangeRate = fromCurrencyPrice / toCurrencyPrice;

    // Calculating the price of fromCurrency in terms of toCurrency
    const priceInToCurrency = exchangeRate;

    // console.log("Price in To Currency:", priceInToCurrency);
    //Sending the result as response
    res.status(200).json({
      status: "success",
      price: { priceInToCurrency },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "An error occured while fetching the price!",
    });
  }
};
