import { Bot } from "./Client.js";
import { readdir } from "node:fs/promises";

/**
 * @param {Bot} client
 */
export default async (client) => {
  const {
    Slash: { Global, GuildID },
  } = client.config;

  try {
    let allCommands = [];
    const commandsDir = await readdir(`./Commands/Slash`);

    await Promise.all(
      commandsDir.map(async (dir) => {
        const commands = await readdir(`./Commands/Slash/${dir}`);
        let filterCommands = commands.filter((f) => f.endsWith(".js"));

        await Promise.all(
          filterCommands.map(async (cmd) => {
            try {
              /**
               * @type {import("../index.js").Scommand}
               */
              const command = await import(
                `../Commands/Slash/${dir}/${cmd}`
              ).then((r) => r.default);

              if (command.name) {
                client.scommands.set(command.name, command);
                allCommands.push(command);
              }
            } catch (error) {
              console.error(`Error loading command from file ${cmd}:`, error);
            }
          })
        );
      })
    );

    await client.on("ready", async () => {
      if (Global) {
        client.application.commands.set(allCommands);
      } else {
        const guild = client.guilds.cache.get(GuildID);
        if (guild) await guild.commands.set(allCommands);
      }
    });
    console.log(`> ✅ Loaded ${client.scommands.size} Slash Commands !!`);
  } catch (error) {
    console.error("Error reading the commands directory:", error);
  }
};
