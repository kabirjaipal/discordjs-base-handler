const { EmbedBuilder } = require("discord.js");
const client = require("..");

client.on("messageCreate", async (message) => {
  console.log(message.content)
  if (message.author.bot || !message.guild) return;
  if (message.channel.partial) await message.channel.fetch(true);
  if (message.partial) await message.fetch(true);
  if (message.content.includes(client.user.id)) {
    message.reply({
      embeds: [
        new EmbedBuilder({
          author: {
            name: client.user.tag,
            iconURL: client.user.displayAvatarURL(),
          },
          description: `**To See My All Commans Type **\`/help\``,
          footer: {
            text: message.author.tag,
            iconURL: message.author.displayAvatarURL(),
          },
        }),
      ],
    });
  }
});
