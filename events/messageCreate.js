const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { cooldown } = require("../handlers/functions");
const client = require("../index");
const { PREFIX } = require("../settings/config");

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild || !message.id) return;

  let prefix = PREFIX;
  let mentionprefix = new RegExp(
    `^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`
  );
  if (!mentionprefix.test(message.content)) return;
  const [, nprefix] = message.content.match(mentionprefix);
  const args = message.content.slice(nprefix.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();
  if (cmd.length === 0) {
    if (nprefix.includes(client.user.id)) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(client.config.embed.color)
            .setDescription(
              ` ${client.config.emoji.success} To See My All Commands Type  \`/help\` or \`${prefix}help\``
            ),
        ],
      });
    }
  }
  const command =
    client.mcommands.get(cmd) ||
    client.mcommands.find((cmds) => cmds.aliases && cmds.aliases.includes(cmd));
  if (!command) return;
  if (command) {
    if (
      command.userPermissions &&
      !message.member.permissions.has(
        PermissionsBitField.resolve(command.userPermissions)
      )
    ) {
      return client.sendEmbed(message, `You don't have enough Permissions !!`);
    } else if (
      command.botPermissions &&
      !message.guild.members.me.permissions.has(
        PermissionsBitField.resolve(command.botPermissions)
      )
    ) {
      return client.sendEmbed(message, `I don't have enough Permissions !!`);
    } else if (cooldown(message, command)) {
      return client.sendEmbed(
        message,
        ` You are On Cooldown , wait \`${cooldown(
          message,
          command
        ).toFixed()}\` Seconds`
      );
    } else {
      command.run(client, message, args, prefix);
    }
  }
});

function escapeRegex(newprefix) {
  return newprefix.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
}
