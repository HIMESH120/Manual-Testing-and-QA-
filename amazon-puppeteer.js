const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Step 1: Navigate
  await page.goto('https://www.amazon.in');

  // Step 2: Search
  await page.type('#twotabsearchtextbox', 'laptop');
  await page.keyboard.press('Enter');
  await page.waitForSelector('.s-title-instructions-style h2 a');

  // Step 3: Click first product
  const links = await page.$$('.s-title-instructions-style h2 a');
  if (links.length > 0) {
    await links[0].click();
  }

  // Step 4: Assertions
  await page.waitForSelector('#productTitle', { visible: true });
  console.log('✅ Product title is visible');

  const addToCartVisible = await page.$('#add-to-cart-button') !== null;
  console.log(addToCartVisible ? '✅ Add to Cart is visible' : '❌ Add to Cart not found');

  await browser.close();
})
();
