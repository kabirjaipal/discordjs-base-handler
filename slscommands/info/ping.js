const { CommandInteraction, Client } = require("discord.js");

module.exports = {
    name: "ping",
    description: "show ping",
    aliases: ['p'],
    permissions : ["ADMINISTRATOR"],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        interaction.followUp({ content: `${client.ws.ping} ws ping` })
    },
};