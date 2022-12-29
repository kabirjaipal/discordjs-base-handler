const { Message, PermissionFlagsBits } = require("discord.js");
const BOT = require("../../../handlers/Client");

module.exports = {
  name: "ping",
  description: `get ping of bot`,
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "Misc",
  cooldown: 10,
  /**
   *
   * @param {BOT} client
   * @param {Message} message
   * @param {String[]} args
   * @param {String} prefix
   */
  run: async (client, message, args, prefix) => {
    // Code
    client.sendEmbed(message, `Ping :: \`${client.ws.ping}\``);
  },
};
