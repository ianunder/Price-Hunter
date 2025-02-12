const scrapeAmazon = require("../scrapers/amazonScraper");
const scrapeWalmart = require("../scrapers/walmartScraper");

const getPrices = async (req, res) => {
  const { ean, title } = req.query;

  if (!ean || !title) {
    return res.status(400).json({ error: "Missing query paramater" });
  }

  try {
    const amazonData = await scrapeAmazon(ean);
    const walmartData = await scrapeWalmart(ean, title);

    const prices = [];
    prices.push({ shop: "Amazon", data: amazonData });
    prices.push({ shop: "Walmart", data: walmartData });

    return res.status(200).json({ prices });
  } catch (error) {
    console.error("Error scraping:", error);
    return res.status(500).json({ error: "Failed to fetch price" });
  }
};

module.exports = {
  getPrices,
};
