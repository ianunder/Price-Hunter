module.exports = {
  amazon: {
    url: "https://www.amazon.com/s?k=",
    productContainerSelector: "div.puis-card-container",
    priceSelector: ".a-price span.a-offscreen",
    titleSelector: "div[data-cy='title-recipe'] h2 span",
    linkSelector: "div[data-cy='title-recipe'] a",
  },
  walmart: {
    url: "https://www.walmart.com/search?q=",
    productContainerSelector: 'div[data-testid="item-stack"] div[role="group"]',
    priceSelector: "div[data-automation-id='product-price'] span.w_iUH7",
    titleSelector: "span.w_iUH7",
    linkSelector: "a",
  },
};
