const {
  Message,
  PermissionFlagsBits,
  Client,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  name: "avatar",
  description: "Get Avar Of a User !!",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "Misc",
  cooldown: 5,
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   * @param {String} prefix
   */
  run: async (client, message, args, prefix) => {
    // Code
    let AvatarUrl = message.author.displayAvatarURL({
      extension: "png",
      size: 512,
    });
    message.reply({
      embeds: [
        new EmbedBuilder()
          .setColor("Blurple")
          .setAuthor({
            name: `Avatar Of ${message.author.tag}`,
            iconURL: AvatarUrl,
          })
          .setImage(AvatarUrl)
          .setTimestamp(),
      ],
    });
  },
};
