const { Client, Message, MessageEmbed, Collection } = require("discord.js");
const colors = require("colors");
const fs = require("fs");
const client = new Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  shards: "auto",
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: true,
  },
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: [
    "GUILDS",
    "GUILD_MEMBERS",
    "GUILD_BANS",
    "GUILD_EMOJIS",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_MESSAGES",
  ],
});
module.exports = client;

const config = require("./config/config.json");
const db = require("./utils/ReconDB");
client.db = db;
// MongoDB
const mongoose = require("mongoose");
mongoose
  .connect(config.mongooseConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(console.log("MongoDB Conneted.."));

const ee = require("./config/embed.json");
const prefix = config.prefix;
const token = config.token;
// Global Variables
client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();
client.cooldowns = new Collection();
client.slashCommands = new Collection();
client.categories = fs.readdirSync("./commands/");

// Initializing the project
//Loading files, with the client variable like Command Handler, Event Handler, ...
["command"].forEach((handler) => {
  require(`./handler/${handler}`)(client);
});

client.login(token);
