const {
  ContextMenuCommandInteraction,
  ApplicationCommandType,
} = require("discord.js");
const BOT = require("../../../handlers/Client");

module.exports = {
  name: "avatar",
  category: "Context",
  type: ApplicationCommandType.User,
  /**
   *
   * @param {BOT} client
   * @param {ContextMenuCommandInteraction} interaction
   */
  run: async (client, interaction) => {
    // Code
    let user =
      interaction.guild.members.cache.get(interaction.targetId) ||
      client.users.cache.get(interaction.targetId);

    interaction.editReply({
      content: user.displayAvatarURL({ extension: "png", size: 2048 }),
    });
  },
};
