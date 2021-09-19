
// slash example
const { CommandInteraction, Client } = require("discord.js");

module.exports = {
    name: "",
    description: "",
    permissions : [""],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        
    },
};


// command example
const { Message, Client } = require("discord.js");

module.exports = {
    name: "",
    aliases: [''],
    permissions : [""],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
       
    },
};
