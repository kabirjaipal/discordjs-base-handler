const { Collection } = require("discord.js");
const client = require("../index");
const { PREFIX } = require("../settings/config");

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild) return;
  let prefix = PREFIX;
  let args = message.content.slice(PREFIX.length).trim().split(/ +/);
  let cmd = args.shift()?.toLowerCase();
  const command = client.mcommands.get(cmd);
  if (!command) return;
  if (command) {
    if (
      command.userPermissions &&
      !message.member.permissions.has(command.userPermissions)
    ) {
      return message.reply({
        content: `you don't have enough permissions !!`,
      });
    } else if (
      command.botPermissions &&
      !message.guild.members.me.permissions.has(command.botPermissions)
    ) {
      return message.reply({
        content: `i don't have enough permissions !!`,
      });
    } else if (cooldown(message, command)) {
      return message.reply({
        content: ` You are On Cooldown , wait \`${cooldown(
          message,
          command
        ).toFixed()}\` Seconds`,
      });
    } else {
      command.run(client, message, args, prefix);
    }
  }
});

function cooldown(message, cmd) {
  if (!message || !cmd) return;
  let { client, member } = message;
  if (!client.cooldowns.has(cmd.name)) {
    client.cooldowns.set(cmd.name, new Collection());
  }
  const now = Date.now();
  const timestamps = client.cooldowns.get(cmd.name);
  const cooldownAmount = cmd.cooldown * 1000;
  if (timestamps.has(member.id)) {
    const expirationTime = timestamps.get(member.id) + cooldownAmount;
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000; //get the lefttime
      //return true
      return timeLeft;
    } else {
      timestamps.set(member.id, now);
      setTimeout(() => timestamps.delete(member.id), cooldownAmount);
      return false;
    }
  } else {
    timestamps.set(member.id, now);
    setTimeout(() => timestamps.delete(member.id), cooldownAmount);
    return false;
  }
}
