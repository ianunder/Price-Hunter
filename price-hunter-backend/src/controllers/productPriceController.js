const scrapeAmazon = require("../scrapers/amazonScraper")

const getPrices = async (req, res) => {

const {query} = req.query;

if( !query ){
  return res.status(400).json({error: "Missing query paramater"});
}

try {
  const amazonData = await scrapeAmazon(query);
  return res.status(200).json({ amazonData });
} catch (error) {
  console.error("Error scraping Amazon:", error);
  return res.status(500).json({ error: "Failed to fetch price" });
}
};

module.exports = {
    getPrices,
  };
  