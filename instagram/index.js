const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');
const sendInstagramToTelegram = require('../telegram');


const driver = new webdriver.Builder().forBrowser('chrome').build();
driver.ignoreSynchronization = true

let password = 'X'
let username = 'X'

const Start = async () => {

    await driver.get('https://www.instagram.com/accounts/login/');
    await driver.manage().window().maximize(); 

    // wait 2second ...
    await driver.sleep(10000);

    //login ...
    await driver.findElement(By.css('[name="username"]')).sendKeys(username, Key.ENTER);
    await driver.findElement(By.css('[name="password"]')).sendKeys(password, Key.ENTER);

    // wait login  ...
    await driver.sleep(4000);
    await GetExplore(driver);
    // await eachURL(driver, 'https://www.instagram.com/p/CmwFVJ0r6Ft/')
    // await driver.quit();
};


let GetExplore = async (driver) => {
    try {
        // open explore find url ...
        await driver.get('https://www.instagram.com/explore/'); 

        // scroll ...
        await driver.sleep(2000);
        await driver.executeScript("window.scrollBy(0,20000); return 1;");

        // wait open ...
        await driver.sleep(2000);
        let arr = await driver.findElements(By.className('_a6hd'))
        let list = [];

        for (let el of arr) { list.push(await el.getAttribute("href")); }

        const regex = new RegExp('/p/\\b', 'g');
        list = list.filter((href) => href.match(regex));

        // start && wait ...
        for (let url of list) {
            await driver.sleep(2000);
            await eachURL(driver, url);
        }
    } catch {
        console.log("Are You Have Error Bro In GetExplore")
    }

    await GetExplore(driver);
}

let eachURL = async (driver, url) => {

    console.log('opening ... ', url)

    try {
        let path = url.replace('https://www.instagram.com/', '').replaceAll('/', '');
        if (fs.existsSync('./data/' + path + '.txt')) {
            console.log("Bunaqasi bor!")
        }
        else {
            // open && wait  ...
            await driver.get(url);
            await driver.sleep(2000);

            let text = await (await driver.findElements(By.className('_aacl _aaco _aacu _aacx _aad7 _aade')))[0].getText();
            fs.writeFileSync('./data/' + path + '.txt', url + '\n' + text, { encoding: "utf-8" });

            sendInstagramToTelegram(url, text);

            try {
                await (await driver.findElement(By.className('_ab8w  _ab94 _ab97 _ab9h _ab9k _ab9p _abcm'))).click();
            } catch (e) {
                console.log("Are You Have Error Bro in Follows")
            }
        }
    } catch {
        console.log("Are You Have Error Bro in eachURL")
    }
}


Start();