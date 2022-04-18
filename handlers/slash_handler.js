const {
  Client,
  MessageEmbed,
  ApplicationCommandOptionType,
  ApplicationCommandType,
} = require("discord.js");
const fs = require("fs");
const ee = require(`../settings/config`).embed;
const { token, Global } = require(`../settings/config`);


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
    await client.application.commands.set(commands);
    });


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
