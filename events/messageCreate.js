const { cooldown, getKeyByValue } = require("../handlers/functions");
const client = require("..");
const { prefix: botPrefix, emoji } = require("../settings/config");
const { PermissionFlagsBits } = require("discord.js");

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild || !message.id) return;
  let prefix = botPrefix;
  let mentionprefix = new RegExp(
    `^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`
  );
  if (!mentionprefix.test(message.content)) return;
  const [, nprefix] = message.content.match(mentionprefix);
  const args = message.content.slice(nprefix.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();
  if (cmd.length === 0) {
    if (nprefix.includes(client.user.id)) {
      client.sendEmbed(
        message,
        ` ${emoji.SUCCESS} To See My All Commands Type  \`/help\` or \`${prefix}help\``
      );
    }
  }
  const command =
    client.mcommands.get(cmd) ||
    client.mcommands.find((cmds) => cmds.aliases && cmds.aliases.includes(cmd));
  if (!command) return;
  if (command) {
    if (!message.member.permissions.has(command.userPermissions || null)) {
      return client.sendEmbed(
        message,
        `${emoji.ERROR} You must have the \`${getKeyByValue(
          PermissionFlagsBits,
          command.userPermissions
        )}\` permission to use \`${command.name}\` command!`
      );
    } else if (
      !message.guild.members.me.permissions.has(command.botPermissions || null)
    ) {
      return client.sendEmbed(
        message,
        `${emoji.ERROR} I must have the  \`${getKeyByValue(
          PermissionFlagsBits,
          command.botPermissions
        )}\` permission to use \`${command.name}\` command!`
      );
    } else if (cooldown(message, command)) {
      return client.sendEmbed(
        message,
        `*You are On Cooldown , wait \`${cooldown(
          message,
          command
        ).toFixed()}\` Seconds*`
      );
    } else {
      command.run(client, message, args, nprefix);
    }
  }
});

function escapeRegex(newprefix) {
  return newprefix.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
}
