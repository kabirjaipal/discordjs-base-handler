const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
const BOT = require("./Client");

/**
 *
 * @param {BOT} client
 */
module.exports = async (client) => {
  const { guildID, embed: ee } = client.config;
  // LOADING SLASH COMMANDS
  try {
    let arrayOfcommands = [];
    fs.readdirSync("./Commands/Slash").forEach((cmd) => {
      let commands = fs
        .readdirSync(`./Commands/Slash/${cmd}/`)
        .filter((file) => file.endsWith(".js"));
      for (cmds of commands) {
        let pull = require(`../Commands/Slash/${cmd}/${cmds}`);
        if (pull.name) {
          client.commands.set(pull.name, pull);
          arrayOfcommands.push(pull);
        } else {
          continue;
        }
      }
    });
    client.on("ready", async () => {
      // // for global slash commands
      // await client.application.commands.set(arrayOfcommands);
      // for guild commands
      if (guildID) {
        client.guilds.cache.get(guildID).commands.set(arrayOfcommands);
      }
    });
    console.log(`${client.commands.size} Slash Commands Loaded`);
  } catch (e) {
    console.log(e);
  }

  // LOADING MESSAGE COMMANDS
  try {
    fs.readdirSync("./Commands/Message").forEach((cmd) => {
      let commands = fs
        .readdirSync(`./Commands/Message/${cmd}/`)
        .filter((file) => file.endsWith(".js"));
      for (cmds of commands) {
        let pull = require(`../Commands/Message/${cmd}/${cmds}`);
        if (pull.name) {
          client.mcommands.set(pull.name, pull);
        } else {
          console.log(`${cmds} Command is not Ready`);
          continue;
        }
        if (pull.aliases && Array.isArray(pull.aliases))
          pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
      }
    });
    console.log(`${client.mcommands.size} Message Commands lOADED`);
  } catch (e) {
    console.log(e);
  }
  // Loading Event Files
  try {
    fs.readdirSync("./events/").forEach((file) => {
      const events = fs
        .readdirSync("./events/")
        .filter((file) => file.endsWith(".js"));
      for (let file of events) {
        let pull = require(`../events/${file}`);
        if (pull) {
          client.events.set(file, pull);
        }
      }
    });
    console.log(`${client.events.size} Events Loaded`);
  } catch (e) {
    console.log(e);
  }
};
