const {
  ContextMenuCommandInteraction,
  ApplicationCommandType,
} = require("discord.js");
const BOT = require("../../../handlers/Client");

module.exports = {
  name: "messagedata",
  category: "Context",
  type: ApplicationCommandType.Message,
  /**
   *
   * @param {BOT} client
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
