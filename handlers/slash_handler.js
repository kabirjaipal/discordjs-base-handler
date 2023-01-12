const { Client } = require("discord.js");
const { readdirSync } = require("fs");
const {
  Slash: { Global, GuildID },
} = require("../settings/config");

/**
 *
 * @param {Client} client
 */
module.exports = async (client) => {
  try {
    let allCommands = [];
    readdirSync("./Commands/Slash").forEach((dir) => {
      const commands = readdirSync(`./Commands/Slash/${dir}`).filter((f) =>
        f.endsWith(".js")
      );

      for (const cmd of commands) {
        const command = require(`../Commands/Slash/${dir}/${cmd}`);
        if (command.name) {
          client.scommands.set(command.name, command);
          allCommands.push(command);
        } else {
          console.log(`${cmd} is not ready`);
        }
      }
    });
    console.log(`> ${client.scommands.size} Slash Commands Loaded !!`);

    client.on("ready", async () => {
      if (Global) {
        client.application.commands.set(allCommands);
      } else {
        client.guilds.cache.get(GuildID)?.commands.set(allCommands);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
