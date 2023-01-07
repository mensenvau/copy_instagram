const TelegramBot = require('node-telegram-bot-api');
const axios = require("axios");

const token = '5909902232:AAHq2IPFNO_mo21VJbqWvTQIZr5aYXFuOLs';
const bot = new TelegramBot(token, { polling: true });
const chatId = '-1001658187452';

let sendInstagramToTelegram = async (url, text) => {
    try {
        const instagramGetUrl = require("instagram-url-direct")
        let links = await instagramGetUrl(url)

        let arr = []
        for (let url of links.url_list) {
            arr.push({
                type: "video",
                media: url,
                caption: text
            });
            text = '';
        }

        bot.sendMediaGroup(chatId, arr)
    } catch {
        console.log("Are You Have Error Bro in sendInstagramToTelegram")
    }
}

module.exports = sendInstagramToTelegram

