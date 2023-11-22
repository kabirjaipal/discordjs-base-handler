# Hi, I'm Kabir! 👋

I'm a Discord Bot Developer and here is mine bot handler

## Installation | How to use the Handler

1. Clone this repository.
2. Fill in the required details in **`settings/config.js`**.
3. Run `npm install` to install dependencies.
4. Start the bot with `node index.js`.

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

- Easy-to-use Handler
- Event handling support
- Slash commands
- Message commands
- Built on [discord.js](https://discord.js.org/#/)
- Code snippets for commands
- Subdirectory support in the commands folder
- Code suggestions in Handler

## Feedback

If you have any feedback or need assistance, please join out [Discord Server](https://discord.gg/PcUVWApWN3)

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
