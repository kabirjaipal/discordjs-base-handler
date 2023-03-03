const { Bot } = require("./Client");
const { readdirSync } = require("fs");
const {
  Slash: { Global, GuildID },
} = require("../settings/config");

/**
 *
 * @param {Bot} client
 */
module.exports = async (client) => {
  // code
  //   Message Command Handler
  try {
    readdirSync("./Commands/Message").forEach((dir) => {
      const commands = readdirSync(`./Commands/Message/${dir}`).filter((f) =>
        f.endsWith(".js")
      );

      for (const cmd of commands) {
        const command = require(`../Commands/Message/${dir}/${cmd}`);
        if (command.name) {
          client.mcommands.set(command.name, command);
        } else {
          console.log(`${cmd} is not ready`);
        }
      }
    });
    console.log(`> ${client.mcommands.size} Message Commands Loaded !!`);
  } catch (error) {
    console.log(error);
  }

  //   Slash Command Handler
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

  //   Event Handler
  try {
    readdirSync("./events")
      .filter((f) => f.endsWith(".js"))
      .forEach((event) => {
        require(`../events/${event}`);
        client.events++;
      });

    console.log(`> ${client.events} Events Loaded !!`);
  } catch (error) {
    console.log(error);
  }
};
