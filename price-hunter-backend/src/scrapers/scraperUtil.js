const puppeteer = require('puppeteer');

const scrapeWebsite = async (siteConfig, query) => {

  const url = `${siteConfig.url}${encodeURIComponent(query)}`;
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.setJavaScriptEnabled(true);

  page.on('console', (msg) => console.log("PAGE LOG:", msg.text()));

const productData = await page.evaluate((siteConfig) => {

    const product = document.querySelector(siteConfig.titleSelector);
    if (!product) {
      return null;
    }
    const title = product.innerText;
    const price = document.querySelector(siteConfig.priceSelector)?.innerText;

    const linkElement = document.querySelector(siteConfig.linkSelector)
    let productLink = linkElement ? linkElement.getAttribute("href") : null;
    if (productLink && !productLink.startsWith("http")) {
        productLink = `https://www.amazon.com${productLink}`;
    }
  
    return { title, price, productLink };
    
  }, siteConfig);

  await browser.close();
  return productData;
};

module.exports = { scrapeWebsite };