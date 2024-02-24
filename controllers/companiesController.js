const axios = require("axios");

exports.getAllCompanies = async (req, res) => {
  try {
    //Extracting the company name from the request body
    const { currency } = req.body;

    //Checking if currency parameter is provided
    if (!currency) {
      return res.status(400).json({
        status: "error",
        message: "Missing Parameter! Please provide currency name!",
      });
    }
    //Sending request to CoinGecko's API to fetch list of companies
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/companies/public_treasury/${currency}`
    );
    //Extracting the list of the companies from the response body
    const companies = response.data.companies.map(
      (companies) => companies.name
    );

    // console.log(companies);
    //Sending back the response
    res.status(200).json({
      status: "success",
      data: {
        companies,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "An error occured while fetching the list of companies!",
    });
  }
};
