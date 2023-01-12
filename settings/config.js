module.exports = {
  TOKEN: process.env.TOKEN || "BOT_TOKEN",
  PREFIX: process.env.PREFIX || "BOT_PREFIX",
  Slash: {
    Global: false,
    GuildID: process.env.GuildID || "GUILD_ID",
  },
};
