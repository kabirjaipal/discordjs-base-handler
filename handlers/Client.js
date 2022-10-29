const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
  EmbedBuilder,
} = require("discord.js");
const fs = require("fs");

class BOT extends Client {
  constructor() {
    super({
      messageCacheLifetime: 60,
      fetchAllMembers: false,
      messageCacheMaxSize: 10,
      restTimeOffset: 0,
      restWsBridgetimeout: 100,
      shards: "auto",
      allowedMentions: {
        parse: ["roles", "users", "everyone"],
        repliedUser: false,
      },
      partials: [
        Partials.Message, // for message
        Partials.Channel, // for text channel
        Partials.GuildMember, // for guild member
        Partials.Reaction, // for message reaction
        Partials.GuildScheduledEvent, // for guild events
        Partials.User, // for discord user
        Partials.ThreadMember, // for thread member
      ],
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
    this.getFooter = (user) => {
      return {
        text: `Requested By ${user.tag}`,
        iconURL: user.displayAvatarURL(),
      };
    };
    this.getAuthor = (user) => {
      return {
        text: user.tag,
        iconURL: user.displayAvatarURL(),
      };
    };
    this.embed = (interaction, data) => {
      let user = interaction.user ? interaction.user : interaction.author;
      if (interaction.deferred) {
        interaction
          .followUp({
            embeds: [
              new EmbedBuilder()
                .setColor(this.config.embed.color)
                .setDescription(`${data.substring(0, 3000)}`)
                .setFooter(this.getFooter(user)),
            ],
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
          })
          .catch((e) => {});
      }
    };
  }

  build(token) {
    ["handler"].forEach((handler) => {
      require(`./${handler}`)(this);
    });
    this.login(token);
  }
}

module.exports = BOT;
