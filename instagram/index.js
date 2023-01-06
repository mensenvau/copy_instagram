const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const { Builder, By, Key, until } = require('selenium-webdriver');
const promise = require('selenium-webdriver').promise;


const driver = new webdriver.Builder().forBrowser('chrome').build();

let password = 'xxx'
let username = 'xxx'

const Start = async () => {

    await driver.get('https://www.instagram.com/accounts/login/');

    // wait 2second ...
    await driver.sleep(3000);

    //login ...
    await driver.findElement(By.css('[name="username"]')).sendKeys(username, Key.ENTER);
    await driver.findElement(By.css('[name="password"]')).sendKeys(password, Key.ENTER);

    // wait login  ...
    await driver.sleep(3000);
    await GetExplore(driver);

    await driver.quit();
};


let GetExplore = async (driver) => {

    // open explore find url ...
    await driver.get('https://www.instagram.com/explore/');
    let arr = await driver.findElements(By.className('_a6hd'))

    for (let el of arr) {
        console.log(await el.getAttribute("href"));
    }

}

Start();