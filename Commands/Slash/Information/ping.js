const { CommandInteraction } = require("discord.js");
const BOT = require("../../../handlers/Client");

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
   * @param {BOT} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    // Code
    client.embed(interaction,`Ping :: \`${client.ws.ping}\``)
  },
};
