const { Client, CommandInteraction } = require("discord.js");
const { embed: ee, emoji } = require("../../../settings/config");

module.exports = {
  // options
  name: "ping",
  description: `get ping of bot`,
  userPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES"],
  category: "Information",
  cooldown: 10,
  // command start
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    // Code
    interaction.followUp({ content: `Pong`, ephemeral: true });
  },
};
