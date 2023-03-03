const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  EmbedBuilder,
} = require("discord.js");

class Bot extends Client {
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
    this.config = require("../settings/config");
    this.scommands = new Collection();
    this.mcommands = new Collection();
    this.cooldowns = new Collection();
    this.events = 0;
  }

  async build(token) {
    await loadHandlers(this);
    this.login(token);
  }

  sendEmbed(interaction, data) {
    if (interaction.deferred) {
      interaction
        .followUp({
          embeds: [
            new EmbedBuilder()
              .setColor(this.config.embed.color)
              .setDescription(`${data.substring(0, 3000)}`),
          ],
        })
        .catch((e) => {});
    } else {
      interaction
        .reply({
          embeds: [
            new EmbedBuilder()
              .setColor(this.config.embed.color)
              .setDescription(`${data.substring(0, 3000)}`),
          ],
        })
        .catch((e) => {});
    }
  }

  getFooter(user) {
    return {
      text: `Requested By ${user.username}`,
      iconURL: user.displayAvatarURL(),
    };
  }
}

module.exports = { Bot };

function loadHandlers(client) {
  ["handler"].forEach((file) => {
    require(`./${file}`)(client);
  });
}
