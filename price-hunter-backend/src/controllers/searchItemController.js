const axios = require("axios");

const searchItem = async (req, res) => {
  try {
    const { productName } = req.query;

    if (!productName) {
      return res.status(400).json({ error: "Product name is required" });
    }

    const response = await axios.get(
      "https://api.upcitemdb.com/prod/trial/search",
      {
        params: {
          s: productName,
          match_mode: 1,
          type: "product",
        },
      }
    );

    if (!response.data) {
      return res
        .status(500)
        .json({ error: "No data returned from external API" });
    }

    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching data from external API:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({
      error: "Error fetching data from external API",
      details: error.response ? error.response.data : error.message,
    });
  }
};

module.exports = {
  searchItem,
};
