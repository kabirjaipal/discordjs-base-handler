// chat input slash commands
const {
  CommandInteraction,
  ApplicationCommandType,
  PermissionFlagsBits,
} = require("discord.js");
const { Bot } = require("../../../handlers/Client");

module.exports = {
  name: "",
  description: ``,
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "",
  type: ApplicationCommandType.ChatInput,
  /**
   *
   * @param {Bot} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    // Code
  },
};

// message input slash commands
const {
  ContextMenuCommandInteraction,
  ApplicationCommandType,
  Client,
} = require("discord.js");

module.exports = {
  name: "",
  category: "",
  type: ApplicationCommandType.Message,
  /**
   *
   * @param {Client} client
   * @param {ContextMenuCommandInteraction} interaction
   */
  run: async (client, interaction) => {
    // Code
  },
};

// user slash commands

const {
  ContextMenuCommandInteraction,
  ApplicationCommandType,
  Client,
} = require("discord.js");

module.exports = {
  name: "",
  category: "",
  type: ApplicationCommandType.User,
  /**
   *
   * @param {Client} client
   * @param {ContextMenuCommandInteraction} interaction
   */
  run: async (client, interaction) => {
    // Code
  },
};

// message commands
const { Message, PermissionFlagsBits } = require("discord.js");
const { Bot } = require("../../../handlers/Client");

module.exports = {
  name: "",
  aliases: [],
  description: ``,
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "",
  cooldown: 10,
  /**
   *
   * @param {Bot} client
   * @param {Message} message
   * @param {String[]} args
   * @param {String} prefix
   */
  run: async (client, message, args, prefix) => {
    // Code
  },
};
