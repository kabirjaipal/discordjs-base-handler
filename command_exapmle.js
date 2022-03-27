// chat input slash commands
const {
  Client,
  CommandInteraction,
  ApplicationCommandType,
} = require("discord.js");
const ee = require("../../settings/config").embed;
const emoji = require("../../settings/config").emoji;

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
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    // Code
  },
};

// message input slash commands
const {
  Client,
  ContextMenuCommandInteraction,
  ApplicationCommandType,
} = require("discord.js");
const ee = require("../../settings/config").embed;
const emoji = require("../../settings/config").emoji;

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
  Client,
  ContextMenuCommandInteraction,
  ApplicationCommandType,
} = require("discord.js");
const ee = require("../../settings/config").embed;
const emoji = require("../../settings/config").emoji;

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
