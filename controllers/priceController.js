const axios = require("axios");

exports.priceInTermsOf = async (req, res) => {
  try {
    // Extract parameters from request
    let { fromCurrency, toCurrency, date } = req.body;
    let f, t, d;
    // console.log(date);
    if (!fromCurrency || !toCurrency || !date) {
      const { fromCurrency, toCurrency, date } = req.query;

      if (!fromCurrency || !toCurrency || !date)
        return res.status(400).json({
          error: "Missing parameters. Required: fromCurrency, toCurrency, date",
        });
      f = fromCurrency;
      t = toCurrency;
      d = date;
    }
    if (f) {
      fromCurrency = f;
      toCurrency = t;
      date = d;
    }

    // Make request to Coingecko API to fetch historical price data for fromCurrency
    let url = `https://api.coingecko.com/api/v3/coins/${fromCurrency}/history?&x_cg_demo_api_key=YOUR_API_KEY`;
    let req_url = url.replace("YOUR_API_KEY", process.env.COINGECKO_API_KEY);
    const fromCurrencyResponse = await axios.get(req_url, {
      params: {
        date,
        localization: false,
      },
    });

    // sending request to Coingecko API to fetch historical price data for toCurrency
    url = `https://api.coingecko.com/api/v3/coins/${toCurrency}/history?&x_cg_demo_api_key=YOUR_API_KEY`;
    req_url = url.replace("YOUR_API_KEY", process.env.COINGECKO_API_KEY);
    const toCurrencyResponse = await axios.get(req_url, {
      params: {
        date,
        localization: false,
      },
    });

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
