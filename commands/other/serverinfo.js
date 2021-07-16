const { Client, Message, MessageEmbed } = require("discord.js");
var ee = require("../../config/embed.json");
var config = require("../../config/config.json");
const moment = require("moment")

module.exports = {
  name: "serverinfo",
  aliases: ["srv"],
  categories: "other",
  permissions: " ",
  description: "Show All Info Of Server",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
      function trimArray(arr, maxLen = 25) {
        if (arr.array().length > maxLen) {
          const len = arr.array().length - maxLen;
          arr = arr
            .array()
            .sort((a, b) => b.rawPosition - a.rawPosition)
            .slice(0, maxLen);
          arr.map((role) => `<@&${role.id}>`);
          arr.push(`${len} more...`);
        }
        return arr.join(", ");
      }
      await message.guild.members.fetch();
      function emojitrimarray(arr, maxLen = 20) {
        if (arr.length > maxLen) {
          const len = arr.length - maxLen;
          arr = arr.slice(0, maxLen);
          arr.push(`${len} more...`);
        }
        return arr.join(", ");
      }
      let boosts = message.guild.premiumSubscriptionCount;
      var boostlevel = 0;
      if (boosts >= 2) boostlevel = "1";
      if (boosts >= 15) boostlevel = "2";
      if (boosts >= 30) boostlevel = "3 / ∞";
      let maxbitrate = 96000;
      if (boosts >= 2) maxbitrate = 128000;
      if (boosts >= 15) maxbitrate = 256000;
      if (boosts >= 30) maxbitrate = 384000;

      let srv = new MessageEmbed()
      .setAuthor(
        "Server Information About: " + message.guild.name,
        message.guild.iconURL({
          dynamic: true,
        })
      )
      .setColor(ee.color)
      .addField(
        "❱ Owner",
        `,<@${(await message.guild.fetchOwner()).id}>\n\`${message.guild.name}\``,
        true
      )
      .addField(
        "❱ Created On",
        "`" +
          moment(message.guild.createdTimestamp).format("DD/MM/YYYY") +
          "`\n" +
          "`" +
          moment(message.guild.createdTimestamp).format("hh:mm:ss") +
          "`",
        true
      )
      .addField(
        "❱ You Joined",
        "`" +
          moment(message.member.joinedTimestamp).format("DD/MM/YYYY") +
          "`\n" +
          "`" +
          moment(message.member.joinedTimestamp).format("hh:mm:ss") +
          "`",
        true
      )

      .addField(
        "❱ All Channels",
        "👁‍🗨 `" + message.guild.channels.cache.size + "`",
        true
      )
      .addField(
        "❱ Text Channels",
        "💬 `" +
          message.guild.channels.cache.filter(
            (channel) => channel.type == "text"
          ).size +
          "`",
        true
      )
      .addField(
        "❱ Voice Channels",
        "🔈 `" +
          message.guild.channels.cache.filter(
            (channel) => channel.type == "voice"
          ).size +
          "`",
        true
      )

      .addField(
        "❱ Total USERS",
        "😀 `" + message.guild.memberCount + "`",
        true
      )
      .addField(
        "❱ Total HUMANS",
        "👤 `" +
          message.guild.members.cache.filter((member) => !member.user.bot)
            .size +
          "`",
        true
      )
      .addField(
        "❱ Total BOTS",
        "🤖 `" +
          message.guild.members.cache.filter((member) => member.user.bot)
            .size +
          "`",
        true
      )

      .addField(
        "❱ Total Boosts",
        "`" + message.guild.premiumSubscriptionCount + "`",
        true
      )
      .addField("❱ Boost-Level", "`" + boostlevel + "`", true)
      .addField("❱ Max-Talk-Bitrate", "👾 `" + maxbitrate + " kbps`", true)

      .addField(
        `❱ [${message.guild.emojis.cache.size}] Emojis: `,
        "> " + message.guild.emojis.cache.size < 20
          ? message.guild.emojis.cache.map((emoji) => `${emoji}`).join(", ")
          : message.guild.emojis.cache.size > 20
          ? emojitrimarray(
              message.guild.emojis.cache.map((emoji) => `${emoji}`)
            ).substr(0, 1024)
          : "No Emojis"
      )
      .addField(
        `❱ [${message.guild.roles.cache.size}] Roles: `,
        "> " + message.guild.roles.cache.size < 25
          ? message.guild.roles.cache
              .array()
              .sort((a, b) => b.rawPosition - a.rawPosition)
              .map((role) => `<@&${role.id}>`)
              .join(", ")
          : message.guild.roles.cache.size > 25
          ? trimArray(message.guild.roles.cache)
          : "None"
      )
      .setThumbnail(
        message.guild.iconURL({
          dynamic: true,
        })
      )
      .setFooter(
        "ID: " + message.guild.id,
        message.guild.iconURL({
          dynamic: true,
        })
      )
      message.channel.send({embeds : [srv]});
 
  },
};
