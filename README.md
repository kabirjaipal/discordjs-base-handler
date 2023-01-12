# Hi, I'm Kabir! 👋

I'm a Discord Bot Developer and here is mine bot handler

## **Installation | How to use the Handler**

a discord.js handler which support slash commands , message commands , events

**3.** Fill in everything in **`settings/config.js`**

**4.** after Fill everything in config Type in shall **`npm install`**

**5.** start the bot with **`node index.js`**
<br/>

### _Modify - config.js_

```js
module.exports = {
  TOKEN: process.env.TOKEN || "BOT_TOKEN",
  PREFIX: process.env.PREFIX || "BOT_PREFIX",
  Slash: {
    Global: false,
    GuildID: process.env.GuildID || "GUILD_ID",
  },
};
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
  Client,
} = require("discord.js");

module.exports = {
  name: "",
  description: ``,
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "",
  type: ApplicationCommandType.ChatInput,
  /**
   *
   * @param {Client} client
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
const { Message, PermissionFlagsBits, Client } = require("discord.js");

module.exports = {
  name: "",
  description: ``,
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "",
  cooldown: 10,
  /**
   *
   * @param {Client} client
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
<br/>

# Thanks For Using Mine Handler Please Give a Star

If Any Bug Open Pull Request
