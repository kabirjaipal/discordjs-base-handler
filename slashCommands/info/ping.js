const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    aliases: [''], 
    categories : ' ', 
    description: 'showping',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        interaction.editReply({content : `Ping : ${client.ws.ping}`})
    }
}