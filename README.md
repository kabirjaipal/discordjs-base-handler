# Hi, I'm Kabir! 👋

I'm a Discord Bot Developer and here is mine bot handler

# Discord.JS V14 Handler

a discord.js handler which support slash commands , message commands , events and more...

## **Installation | How to use the Bot**

**1.** Install [node.js v16](https://nodejs.org/en/) or higher

**2.** Download this repo and unzip it | or git clone it

**3.** Fill in everything in **`settings/config.js`**

**4.** after Fill everything in config Type in shall **`npm install`**

**5.** start the bot with **`node index.js`**
<br/>

### _Modify - config.js_

```javascript
{
  token: "BOT_TOKEN"
  prefix: "BOT_PREFIX",
}
```

## Handler Features

- easy to use Handler
- support event Handler
- slash commands support
- message commands support
- based on [discord.js](https://discord.js.org/#/)
- provied code snipet for commands
- support sub directory in commands folder
- support code suggestions in Handler

## Feedback

If you have any feedback, please reach out to us at [Discord Server](https://discord.gg/PcUVWApWN3)

## Usage/Examples

- Commands Example

```javascript
// chat input slash commands
const {
  CommandInteraction,
  ApplicationCommandType,
  PermissionFlagsBits,
} = require("discord.js");
const BOT = require("../../../handlers/Client");

module.exports = {
  name: "",
  description: ``,
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
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
const { Message, PermissionFlagsBits } = require("discord.js");
const BOT = require("../../../handlers/Client");

module.exports = {
  name: "",
  description: ``,
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
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
```

## License

[MIT](https://choosealicense.com/licenses/mit/)

# Thanks For Using Mine Handler Please Give a Star
