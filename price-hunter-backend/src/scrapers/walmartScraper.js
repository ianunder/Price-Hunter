const { scrapeWithFallback } = require("./scraperUtil");
const scraperConfig = require("./scraperConfig");

const scrapeWalmart = async (ean, title) => {
  const walmartData = await scrapeWithFallback(scraperConfig.walmart, ean, title);
    if(walmartData && walmartData.price){
        walmartData.price = walmartData.price.substring(walmartData.price.indexOf('$'));
    }
    if (walmartData.productLink && !walmartData.productLink.startsWith("http")) {
        walmartData.productLink = `https://www.walmart.com${walmartData.productLink}`;
      }
    return walmartData;
};

module.exports = scrapeWalmart;