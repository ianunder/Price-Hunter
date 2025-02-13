const { scrapeWebsite } = require("./scraperUtil");
const scraperConfig = require("./scraperConfig");

const scrapeTarget = async (ean) => {
  const targetData = await scrapeWebsite(scraperConfig.target, ean.substring(1));
  if(targetData){
  if(targetData && targetData.price){
        targetData.price = targetData.price.substring(targetData.price.indexOf('$'));
    }
    if (targetData.productLink && !targetData.productLink.startsWith("http")) {
        targetData.productLink = `https://www.target.com${targetData.productLink}`;
      }
    return targetData;
  }
  return null;
};

module.exports = scrapeTarget;