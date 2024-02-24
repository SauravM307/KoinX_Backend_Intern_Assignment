const axios = require("axios");

exports.getAllCompanies = async (req, res) => {
  try {
    //Extracting the company name from the request body
    let { currency } = req.body;
    console.log(req);
    //Checking if currency parameter is provided
    let curr;
    if (!currency) {
      const { currency } = req.query;
      curr = currency;
      console.log(curr);
      if (!curr)
        return res.status(400).json({
          status: "error",
          message: "Missing Parameter! Please provide currency name!",
        });
    }
    if (curr) currency = curr;

    //Sending request to CoinGecko's API to fetch list of companies
    const url = `https://api.coingecko.com/api/v3/companies/public_treasury/${currency}?&x_cg_demo_api_key=YOUR_API_KEY`;
    const req_url = url.replace("YOUR_API_KEY", process.env.COINGECKO_API_KEY);
    // console.log(req_url);
    const response = await axios.get(req_url);
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
