const {
  Client,
  ContextMenuCommandInteraction,
  ApplicationCommandType,
  EmbedBuilder,
} = require("discord.js");
const ee = require("../../settings/config").embed;
const emoji = require("../../settings/config").emoji;

module.exports = {
  name: "get_avatar",
  category: "Context",
  type: ApplicationCommandType.User,
  /**
   *
   * @param {Client} client
   * @param {ContextMenuCommandInteraction} interaction
   */
  run: async (client, interaction) => {
    // Code
    let user =
      interaction.guild.members.cache.get(interaction.targetId) ||
      client.users.cache.get(interaction.targetId);

    interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setColor("Blurple")
          .setImage(user.displayAvatarURL({ extension: "png" }))
          .setTitle(`Avatar of ${interaction.user.tag}`),
      ],
    });
  },
};
