const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
  EmbedBuilder,
  Options,
  CommandInteraction,
} = require("discord.js");
const fs = require("fs");

class BOT extends Client {
  constructor() {
    super({
      allowedMentions: {
        parse: ["everyone", "roles", "users"],
        users: [],
        roles: [],
        repliedUser: false,
      },
      failIfNotExists: false,
      partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.User,
      ],
      shards: "auto",
      makeCache: Options.cacheWithLimits({
        // read to understand caching system https://discordjs.guide/miscellaneous/cache-customization.html#limiting-caches
        ...Options.DefaultMakeCacheSettings,
        ApplicationCommandManager: {
          maxSize: 0,
        },
        BaseGuildEmojiManager: {
          maxSize: 0,
        },
        GuildBanManager: {
          maxSize: 0,
        },
        GuildStickerManager: {
          maxSize: 0,
        },
        GuildScheduledEventManager: {
          maxSize: 0,
        },
        ReactionUserManager: {
          maxSize: 0,
        },
        PresenceManager: {
          maxSize: 0,
        },
        GuildInviteManager: {
          maxSize: 0,
        },
        ReactionManager: {
          maxSize: 0,
        },
        MessageManager: {
          maxSize: 0,
        },
        GuildMemberManager: {
          maxSize: 200,
          keepOverLimit: (member) => member.id === client.user.id,
        },
      }),
      sweepers: Options.DefaultSweeperSettings,
      intents: [
        GatewayIntentBits.Guilds, // for guild related things
        GatewayIntentBits.GuildMembers, // for guild members related things
        // GatewayIntentBits.GuildBans, // for manage guild bans
        //  GatewayIntentBits.GuildEmojisAndStickers, // for manage emojis and stickers
        GatewayIntentBits.GuildIntegrations, // for discord Integrations
        // GatewayIntentBits.GuildWebhooks, // for discord webhooks
        //  GatewayIntentBits.GuildInvites, // for guild invite managing
        // GatewayIntentBits.GuildVoiceStates, // for voice related things
        // GatewayIntentBits.GuildPresences, // for user presence things
        GatewayIntentBits.GuildMessages, // for guild messages things
        GatewayIntentBits.GuildMessageReactions, // for message reactions things
        GatewayIntentBits.GuildMessageTyping, // for message typing things
        GatewayIntentBits.DirectMessages, // for dm messages
        GatewayIntentBits.DirectMessageReactions, // for dm message reaction
        GatewayIntentBits.DirectMessageTyping, // for dm message typinh
        GatewayIntentBits.MessageContent, // enable if you need message content things
      ],
    });

    this.events = new Collection();
    this.cooldowns = new Collection();
    this.mcommands = new Collection();
    this.commands = new Collection();
    this.aliases = new Collection();
    this.mcategories = fs.readdirSync("./Commands/Message");
    this.scategories = fs.readdirSync("./Commands/Slash");
    this.config = require("../settings/config");
  }

  getFooter(user) {
    return {
      text: `Requested By ${user.tag}`,
      iconURL: user.displayAvatarURL(),
    };
  }

  getAuthor(user) {
    return {
      text: user.tag,
      iconURL: user.displayAvatarURL(),
    };
  }

  /**
   *
   * @param {CommandInteraction} interaction
   * @param {String} data
   */
  sendEmbed(interaction, data, ephemeral = false) {
    let user = interaction.user ? interaction.user : interaction.author;
    if (interaction.user) {
      interaction
        .followUp({
          embeds: [
            new EmbedBuilder()
              .setColor(this.config.embed.color)
              .setDescription(`${data.substring(0, 3000)}`)
              .setFooter(this.getFooter(user)),
          ],
          ephemeral: ephemeral,
        })
        .catch((e) => {});
    } else {
      interaction
        .reply({
          embeds: [
            new EmbedBuilder()
              .setColor(this.config.embed.color)
              .setDescription(`${data.substring(0, 3000)}`)
              .setFooter(this.getFooter(user)),
          ],
          ephemeral: ephemeral,
        })
        .catch((e) => {});
    }
  }


  build(token) {
    ["handler"].forEach((handler) => {
      require(`./${handler}`)(this);
    });
    this.login(token);
  }
}

module.exports = BOT;
