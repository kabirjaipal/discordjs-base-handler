import { Bot } from "./Client.js";
import { readdir } from "node:fs/promises";
import { logStatus } from "./functions.js";

/**
 *
 * @param {Bot} client
 */
export default async (client) => {
  // code
  const {
    Slash: { Global, GuildID },
  } = client.config;

  try {
    let allCommands = [];
    const commandsDir = await readdir(`./Commands/Slash`);
    const items = await Promise.all(
      commandsDir.map(async (dir) => {
        const commands = await readdir(`./Commands/Slash/${dir}`);
        let filterCommands = commands.filter((f) => f.endsWith(".js"));
        for (const cmd of filterCommands) {
          /**
           * @type {import("../index.js").Scommand}
           */
          const command = await import(`../Commands/Slash/${dir}/${cmd}`).then(
            (r) => r.default
          );
          if (command.name) {
            client.scommands.set(command.name, command);
            allCommands.push(command);
            logStatus(command.name, true, "Slash");
          } else {
            logStatus(command.name, false, "Slash");
          }
        }
      })
    );

    await Promise.all(items);

   client.on("ready", async () => {
      if (Global) {
        client.application.commands.set(allCommands);
      } else {
        const Guild = client.guilds.cache.get(GuildID);
        if (Guild) Guild.commands.set(allCommands);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
