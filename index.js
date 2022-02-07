const puppeteer = require('puppeteer');

(async () => {
  const args = process.argv.slice(2);
  console.log(args);
  const [id, psw] = args;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://enroll.scut.edu.cn/door/index_h5.html', { waitUntil: 'load', timeout: 0 });
  await page.type('input[placeholder="用户名"]', id, {
    delay: 30
  });
  await page.type('input[placeholder="密码"]', psw, {
    delay: 30
  });
  await page.click('span[id=index_login_btn]');
  await page.waitForTimeout(2000);
  await page.click('div[url="/health/h5/health.html"]');
  await page.waitForTimeout(2000);
  await page.click('div[onclick="Global_FN.uploadData()"]');
  await page.waitForTimeout(2000);
  const res = await page.$x('//a[text()="确定"]')
  await res[1].click();
  await page.waitForTimeout(2000);
  console.log('job done');
  await browser.close();
})();