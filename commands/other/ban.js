const { Message, Client } = require("discord.js");

module.exports = {
    name: "ban",
    aliases: ['p'],
    cooldown: 10,
    permissions : ["SEND_MESSAGES"],
    role : true,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        message.channel.send({ content: `${client.ws.ping} ws ping` });
    },
};