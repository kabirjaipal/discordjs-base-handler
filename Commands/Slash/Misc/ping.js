const {
  CommandInteraction,
  ApplicationCommandType,
  PermissionFlagsBits,
  Client,
} = require("discord.js");

module.exports = {
  name: "ping",
  description: `Get Bot Real Ping !!`,
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "Misc",
  type: ApplicationCommandType.ChatInput,
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    // Code
    interaction.reply({
      content: `> Pong \`${client.ws.ping}\``,
      ephemeral: true,
    });
  },
};
