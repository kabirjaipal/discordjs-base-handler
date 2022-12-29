const {
  CommandInteraction,
  ApplicationCommandType,
  PermissionFlagsBits,
  EmbedBuilder,
  Colors,
} = require("discord.js");
const BOT = require("../../../handlers/Client");

module.exports = {
  // options
  name: "help",
  description: `See My All Commands`,
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "Misc",
  type: ApplicationCommandType.ChatInput,
  cooldown: 10,
  // command start
  /**
   *
   * @param {BOT} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    // Code
    const commands = client.scategories.map((cat) => {
      const cmds = client.commands
        .filter((cmd) => cmd.category === cat)
        .map((cmd) => `\`${cmd.name}\``);
      return {
        name: `${cat}`,
        value: cmds.join(", "),
      };
    });

    interaction.followUp({
      embeds: [
        new EmbedBuilder()
          .setAuthor({
            name: client.user.tag,
            iconURL: client.user.displayAvatarURL(),
          })
          .setColor(Colors.Blurple)
          .addFields(commands)
          .setFooter(client.getFooter(interaction.user)),
      ],
    });
  },
};
