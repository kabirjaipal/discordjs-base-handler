const { Client, Message } = require("discord.js");
const { embed: ee, emoji } = require("../../../settings/config");

module.exports = {
  name: "ping",
  description: `get ping of bot`,
  userPermissions: [],
  botPermissions: [],
  category: 'Information',
  cooldown: 10,
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   * @param {String} prefix
   */
  run: async (client, message, args, prefix) => {
    // Code
    client.embed(message,`Ping :: \`${client.ws.ping}\``)
  },
};
