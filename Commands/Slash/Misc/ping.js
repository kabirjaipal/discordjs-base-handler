const {
  CommandInteraction,
  ApplicationCommandType,
  PermissionFlagsBits,
} = require("discord.js");
const BOT = require("../../../handlers/Client");

module.exports = {
  // options
  name: "ping",
  description: `get ping of bot`,
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
    client.sendEmbed(interaction, `Ping :: \`${client.ws.ping}\``, true);
  },
};
