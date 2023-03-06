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
import { Colors } from "discord.js";

const settings = {
  TOKEN: process.env.TOKEN || "BOT_TOKEN",
  PREFIX: process.env.PREFIX || "BOT_PREFIX",
  Owners: ["OwnersId", "OwnersId"],
  Slash: {
    Global: false,
    GuildID: process.env.GuildID || "GUILD_ID",
  },
};

export default settings;
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

# Slash Chat Input Command

```js
import { ApplicationCommandType, PermissionFlagsBits } from "discord.js";

/**
 * @type {import("../../../index.js").Scommand}
 */
export default {
  name: "",
  description: "",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "",
  type: ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    // Code
  },
};
```

# Slash Message Input Command

```js
import { ApplicationCommandType } from "discord.js";

/**
 * @type {import("../../..").CMcommand}
 */
export default {
  name: "",
  category: "",
  type: ApplicationCommandType.Message,

  run: async (client, interaction) => {
    // Code
  },
};
```

# Slash User Input Command

```js
const { ApplicationCommandType } = require("discord.js");

/**
 * @type {import("../../..").CUcommand}
 */
export default {
  name: "",
  category: "",
  type: ApplicationCommandType.User,

  run: async (client, interaction) => {
    // Code
  },
};
```

# Message/Prefix Command

```js
import { PermissionFlagsBits } from "discord.js";

/**
 * @type {import("../../../index.js").Mcommand}
 */
export default {
  name: "",
  description: "",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "",
  cooldown: 5,

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
