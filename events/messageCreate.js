const { MessageEmbed, Collection } = require("discord.js");
var config = require("../config/config.json");
var ee = require("../config/config.json");
const client = require("..");
const prefix = config.prefix;

client.on("messageCreate", async (message) => {
  const { escapeRegex, onCoolDown } = require("../utils/function");
  if (!message.guild) return;
  if (message.author.bot) return;
  if (message.channel.partial) await message.channel.fetch();
  if (message.partial) await message.fetch();
  const prefixRegex = new RegExp(
    `^(<@!?${client.user.id}>|${escapeRegex(config.prefix)})\\s*`
  );
  if (!prefixRegex.test(message.content)) return;
  const [, matchedPrefix] = message.content.match(prefixRegex);
  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();
  // getting mention prefix
  if (cmd.length === 0) {
    if (matchedPrefix.includes(client.user.id)) {
      message.reply(
        `<@${message.author.id}>To see all Commands type: \`${config.prefix}help\``
      );
    }
  }
  const command = client.commands.get(cmd.toLowerCase());
  if (!command) return;
  if (command) {
    let perms = new MessageEmbed().setDescription(
      `You don't Have ${command.permissions} To Run Command..`
    );
    if (!message.member.permissions.has(command.permissions || []))
      return message.channel.send({ embeds: [perms] });


    //Check if user is on cooldown with the cmd, with Tomato#6966's Function from /handlers/functions.js
    if (onCoolDown(message, command)) {
      let cool = new MessageEmbed()
      .setDescription(`❌ Please wait ${onCoolDown(message, command)} more Second(s) before reusing the ${command.name} command.`)
      return message.channel.send({embeds : [cool]})
    }
    await command.run(client, message, args, prefix);
  }

  // new start from here
});
