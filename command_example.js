// chat input slash commands
const { CommandInteraction, ApplicationCommandType } = require("discord.js");
const BOT = require("../../../handlers/Client");

module.exports = {
  name: "",
  description: ``,
  userPermissions: [],
  botPermissions: [],
  category: "",
  cooldown: 10,
  type: ApplicationCommandType.ChatInput,
  /**
   *
   * @param {BOT} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    // Code
  },
};

// message input slash commands
const {
  ContextMenuCommandInteraction,
  ApplicationCommandType,
} = require("discord.js");
const BOT = require("../../../handlers/Client");

module.exports = {
  name: "",
  category: "",
  type: ApplicationCommandType.Message,
  /**
   *
   * @param {BOT} client
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
} = require("discord.js");
const BOT = require("../../../handlers/Client");

module.exports = {
  name: "",
  category: "",
  type: ApplicationCommandType.User,
  /**
   *
   * @param {BOT} client
   * @param {ContextMenuCommandInteraction} interaction
   */
  run: async (client, interaction) => {
    // Code
  },
};

// message commands
const { Message } = require("discord.js");
const BOT = require("../../../handlers/Client");

module.exports = {
  name: "",
  description: ``,
  userPermissions: [],
  botPermissions: [],
  category: "",
  cooldown: 10,
  /**
   *
   * @param {BOT} client
   * @param {Message} message
   * @param {String[]} args
   * @param {String} prefix
   */
  run: async (client, message, args, prefix) => {
    // Code
  },
};
