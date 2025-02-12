const { scrapeWebsite } = require("./scraperUtil");
const scraperConfig = require("./scraperConfig");

const scrapeAmazon = async (query) => {
  const amazonData = await scrapeWebsite(scraperConfig.amazon, query);
  console.log("amazon", amazonData);
  if (amazonData) {
    if (amazonData.productLink && !amazonData.productLink.startsWith("http")) {
      amazonData.productLink = `https://www.amazon.com${amazonData.productLink}`;
    }
    return amazonData;
  }
  console.log("null return");
  return null;
};

module.exports = scrapeAmazon;
