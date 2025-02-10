const { scrapeWebsite } = require("./scraperUtil");
const scraperConfig = require("./scraperConfig");

const scrapeAmazon = async (query) => {
  return await scrapeWebsite(scraperConfig.amazon, query);
};

module.exports = scrapeAmazon;