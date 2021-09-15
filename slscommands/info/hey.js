const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'hey',
    type : "MESSAGE",
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        interaction.followUp({content : "Hey how are you"})
    }
}