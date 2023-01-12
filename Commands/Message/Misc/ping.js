const { Message, PermissionFlagsBits, Client } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Get Bot Real Ping !!",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "Misc",
  cooldown: 5,
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   * @param {String} prefix
   */
  run: async (client, message, args, prefix) => {
    // Code
    message.reply({
      content: `> Pong \`${client.ws.ping}\``,
    });
  },
};
