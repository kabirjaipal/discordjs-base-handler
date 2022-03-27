const {
  Client,
  MessageEmbed,
  ApplicationCommandOptionType,
  ApplicationCommandType,
} = require("discord.js");
const fs = require("fs");
const ee = require(`../settings/config`).embed;
const { token, Global } = require(`../settings/config`);
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

/**
 *
 * @param {Client} client
 */

module.exports = async (client) => {
  try {
    client.arrayOfcommands = [];
    const rest = new REST({ version: "9" }).setToken(token);
    fs.readdirSync("./Commands").forEach((cmd) => {
      if (cmd.category === "Owner") return;
      let commands = fs
        .readdirSync(`./Commands/${cmd}/`)
        .filter((file) => file.endsWith(".js"));
      for (cmds of commands) {
        let pull = require(`../Commands/${cmd}/${cmds}`);
        // changing name to lowercase
        pull.name = pull.name?.toLowerCase();

        if (pull.options) {
          pull.options
            .filter(
              (sub) => sub.type === ApplicationCommandOptionType.Subcommand
            )
            .forEach((sub) => {
              client.subcmd.set(sub.name, sub);
            });
        }
        if (pull.name) {
          if (
            [
              ApplicationCommandType.Message,
              ApplicationCommandType.User,
            ].includes(pull.type)
          )
            delete pull.description;
          client.commands.set(pull.name, pull);
          client.arrayOfcommands.push(pull);
        } else {
          continue;
        }
      }
    });
    // bot online
    let commands = await client.arrayOfcommands.map((cmd) => cmd);
    client.on("ready", async () => {
      if (Global) {
        // code
        await rest.put(Routes.applicationCommands(client.user.id), {
          body: commands,
        });
      } else {
        try {
          await client.guilds.fetch().catch((e) => {});
          await client.guilds.cache.forEach(async (guild) => {
            await rest.put(
              Routes.applicationGuildCommands(client.user.id, guild.id),
              {
                body: commands,
              }
            );
          });
        } catch (e) {
          console.log(e);
        }
      }
    });

    // guild joined

    client.on("guildCreate", async (guild) => {
      if (!guild) return;
      let channel = guild.channels.cache.find(
        (ch) =>
          ch.type === "GUILD_TEXT" &&
          ch.permissionsFor(guild.me).has("SEND_MESSAGES")
      );

      if (guild.me.permissions.has("UseApplicationCommands")) {
        try {
          await rest.put(
            Routes.applicationGuildCommands(client.user.id, guild.id),
            {
              body: commands,
            }
          );
        } catch (e) {
          console.log(e);
        }
      } else {
        channel.send(
          `I don't have \`UseApplicationCommands\` so i can't create slash commands in your server , if you want to use me then give me \`USE_APPLICATION_COMMANDS\` and reinvite`
        );
      }
    });

    console.log(`${client.commands.size} Commands Loaded`);
  } catch (e) {
    console.log(e);
  }
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {String} data
   */
  client.embed = (interaction, data) => {
    return interaction.followUp({
      embeds: [
        new MessageEmbed()
          .setColor(ee.color)
          .setDescription(data.substring(0, 2000))
          .setFooter({
            text: ee.footertext,
            iconURL: ee.footericon,
          }),
      ],
    });
  };
};
