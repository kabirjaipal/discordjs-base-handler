require("dotenv").config();
const { Bot } = require("./handlers/Client");
const { TOKEN } = require("./settings/config");

const client = new Bot();

module.exports = client;

// login bot
client.build(TOKEN);
