const { Message } = require("discord.js");
const BOT = require("../../../handlers/Client");

module.exports = {
  name: "owner",
  description: `Only For Owner`,
  category: "Owner",
  /**
   *
   * @param {BOT} client
   * @param {Message} message
   * @param {String[]} args
   * @param {String} prefix
   */
  run: async (client, message, args, prefix) => {
    // Code
    client.sendEmbed(message, `Oh.. You are Owner`);
  },
};
