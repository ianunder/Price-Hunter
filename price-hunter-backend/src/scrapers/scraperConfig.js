module.exports = {
  amazon: {
    url: "https://www.amazon.com/s?k=",
    productContainerSelector: "div.puis-card-container",
    priceSelector: 'a[aria-describedby="price-link"] span.a-price span.a-offscreen',
    titleSelector: "div[data-cy='title-recipe'] h2 span",
    linkSelector: "div[data-cy='title-recipe'] a",
    sponsor: {
      sponsorSelector: "span.a-color-secondary",
      sponsorText: "Sponsored"
    }
  },
  walmart: {
    url: "https://www.walmart.com/search?q=",
    productContainerSelector: 'div.mb0',
    priceSelector: "div[data-automation-id='product-price'] span.w_iUH7",
    titleSelector: "span.w_iUH7",
    linkSelector: "a",
    sponsor: {
      sponsorSelector: "div.gray.f7",
      sponsorText: "Sponsored"
    }
  },
  target: {
    url: "https://www.target.com/s?searchTerm=",
    productContainerSelector: 'div[data-test="@web/site-top-of-funnel/ProductCardWrapper"]',
    priceSelector: 'span[data-test="current-price"] span',
    titleSelector: 'a[data-test="product-title"] div',
    linkSelector: "a",
  },
};
