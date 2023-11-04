import {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  EmbedBuilder,
} from "discord.js";
import settings from "../settings/config.js";

export class Bot extends Client {
  constructor() {
    super({
      partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.User,
      ],
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
      ],
      shards: "auto",
      failIfNotExists: false,
      allowedMentions: {
        parse: ["everyone", "roles", "users"],
        users: [],
        roles: [],
        repliedUser: false,
      },
    });

    // global variables
    this.config = settings;
    this.scommands = new Collection();
    this.mcommands = new Collection();
    this.cooldowns = new Collection();
    this.events = new Collection();
  }

  async build(token) {
    await loadHandlers(this);
    this.login(token);
  }

  /**
   * @type {import("../index.js").SendEmbedFunction}
   */
  async sendEmbed(interaction, data, ephemeral = false) {
    return this.send(interaction, {
      embeds: [
        new EmbedBuilder()
          .setColor(this.config.embed.color)
          .setDescription(`${data.substring(0, 3000)}`),
      ],
      ephemeral: ephemeral,
    });
  }

  getFooter(user) {
    return {
      text: `Requested By ${user.username}`,
      iconURL: user.displayAvatarURL(),
    };
  }

  /**
   * @type {import("../index.js").send}
   */
  async send(interactionOrMessage, options) {
    try {
      if (interactionOrMessage.deferred || interactionOrMessage.replied) {
        await interactionOrMessage.deferReply().catch((e) => {});
        return interactionOrMessage.followUp(options);
      } else {
        return interactionOrMessage.reply(options);
      }
    } catch (error) {
      return interactionOrMessage.channel.send(options);
    }
  }
}

async function loadHandlers(client) {
  ["messageHandler", "slashHandler", "eventHandler"].forEach(async (file) => {
    let handler = await import(`./${file}.js`).then((r) => r.default);
    await handler(client);
  });
}
