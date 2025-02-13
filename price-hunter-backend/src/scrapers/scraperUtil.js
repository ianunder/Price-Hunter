const puppeteer = require("puppeteer");

const scrapeData = async (page, siteConfig) => {
  const productData = await page.evaluate((siteConfig) => {
    const filterNonSponsoredProducts = (
      allProducts,
      sponsorSelector,
      sponsorText
    ) => {
      return allProducts.filter(
        (p) =>
          !p.querySelector(sponsorSelector)?.innerText.includes(sponsorText)
      );
    };

    const allProducts = [
      ...document.querySelectorAll(siteConfig.productContainerSelector),
    ];

    const sponsorSelector = siteConfig.sponsor?.sponsorSelector;
    const sponsorText = siteConfig.sponsor?.sponsorText;

    const nonSponsoredProducts =
      sponsorSelector && sponsorText
        ? filterNonSponsoredProducts(allProducts, sponsorSelector, sponsorText) // filter for non-sponsored products, if no filters then use allProducts
        : allProducts;

    const product = nonSponsoredProducts[0] || null;
    if (!product) {
      return null;
    }
    const title =
      product.querySelector(siteConfig.titleSelector)?.innerText || "No title";

    const price =
      product.querySelector(siteConfig.priceSelector)?.innerText || "No price";

    const linkElement = product.querySelector(siteConfig.linkSelector);
    let productLink = linkElement ? linkElement.getAttribute("href") : null;

    return { title, price, productLink };
  }, siteConfig);

  return productData;
};

const scrapeWebsite = async (siteConfig, queryParam) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );
  
  const url = `${siteConfig.url}${encodeURIComponent(queryParam)}`;
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.setJavaScriptEnabled(true);
  try {
    await page.waitForSelector(siteConfig.productContainerSelector, {
      timeout: 3000,
    });
  } catch (error) {
    console.error("Error: Product container not found");
  }

  page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));

  const productData = await scrapeData(page, siteConfig);
  await browser.close();

  return productData;
};

const scrapeWithFallback = async (siteConfig, ean, title) => {  // scrape by ean first, then try title
  let productData = await scrapeWebsite(siteConfig, ean);
  if (!productData) {
    console.log("No product data found with ean, trying with title:", title);
    productData = await scrapeWebsite(siteConfig, title);
  }

  return productData;
};

module.exports = { scrapeWebsite, scrapeWithFallback };
