const settings = {
  TOKEN: process.env.TOKEN || "Bot_Token",
  PREFIX: "BotPrefix",
  Owners: ["OwnersId", "OwnersId"],
  Slash: {
    Global: false,
    GuildID: process.env.GuildID || "Guild_Id",
  },
  embed: {
    color: "Blurple",
    wrongColor: "Red",
  },
  emoji: {
    success: "✅",
    error: "❌",
  },
};

export default settings;
