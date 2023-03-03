const { Message, PermissionFlagsBits } = require("discord.js");
const { Bot } = require("../../../handlers/Client");

module.exports = {
  name: "ping",
  description: "Get Bot Real Ping !!",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "Misc",
  cooldown: 5,
  /**
   *
   * @param {Bot} client
   * @param {Message} message
   * @param {String[]} args
   * @param {String} prefix
   */
  run: async (client, message, args, prefix) => {
    // Code
    return client.sendEmbed(message, `🏓 Pong \`${client.ws.ping}\``);
  },
};
