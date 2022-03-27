const {
  Client,
  ContextMenuCommandInteraction,
  ApplicationCommandType,
} = require("discord.js");
const ee = require("../../settings/config").embed;
const emoji = require("../../settings/config").emoji;

module.exports = {
  name: "get_data",
  category: "Context",
  type: ApplicationCommandType.Message,
  /**
   *
   * @param {Client} client
   * @param {ContextMenuCommandInteraction} interaction
   */
  run: async (client, interaction) => {
    // Code
    let msg = await interaction.channel.messages.fetch(interaction.targetId);
    interaction.editReply({
      content: msg.cleanContent || "No Message Found",
    });
  },
};
