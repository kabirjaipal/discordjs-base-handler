const { ActivityType } = require("discord.js");
const client = require("../index");

client.on("ready", () => {
  console.log(`bot is ready for work !!`);
  client.user.setActivity({
    name: `Coded By Kabir ❤️‍🔥`,
    type: ActivityType.Watching,
  });
});
