const {
  Message,
  PermissionFlagsBits,
  EmbedBuilder,
  Colors,
} = require("discord.js");
const BOT = require("../../../handlers/Client");

module.exports = {
  name: "help",
  description: `See My All Commands`,
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "Misc",
  cooldown: 10,
  /**
   *
   * @param {BOT} client
   * @param {Message} message
   * @param {String[]} args
   * @param {String} prefix
   */
  run: async (client, message, args, prefix) => {
    // Code
    const commands = client.mcategories.map((cat) => {
      const cmds = client.mcommands
        .filter((cmd) => cmd.category === cat)
        .map((cmd) => `\`${cmd.name}\``);
      return {
        name: `${cat}`,
        value: cmds.join(", "),
      };
    });

    message.reply({
      embeds: [
        new EmbedBuilder()
          .setAuthor({
            name: client.user.tag,
            iconURL: client.user.displayAvatarURL(),
          })
          .setColor(Colors.Blurple)
          .addFields(commands)
          .setFooter(client.getFooter(message.author)),
      ],
    });
  },
};
