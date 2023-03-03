const {
  CommandInteraction,
  ApplicationCommandType,
  PermissionFlagsBits,
} = require("discord.js");
const { Bot } = require("../../../handlers/Client");

module.exports = {
  name: "ping",
  description: `Get Bot Real Ping !!`,
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "Misc",
  type: ApplicationCommandType.ChatInput,
  /**
   *
   * @param {Bot} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    // Code
    return client.sendEmbed(interaction, `🏓 Pong \`${client.ws.ping}\``);
  },
};
