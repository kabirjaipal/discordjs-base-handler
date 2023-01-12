const { Client } = require("discord.js");
const { readdirSync } = require("fs");

/**
 *
 * @param {Client} client
 */
module.exports = async (client) => {
  readdirSync("./events")
    .filter((f) => f.endsWith(".js"))
    .forEach((event) => {
      require(`../events/${event}`);
      client.events++;
    });

  console.log(`> ${client.events} Events Loaded !!`);
};
