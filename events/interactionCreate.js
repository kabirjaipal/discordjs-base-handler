import { InteractionType, PermissionsBitField } from "discord.js";
import { client } from "../bot.js";

client.on("interactionCreate", async (interaction) => {
  if (interaction.user.bot || !interaction.guild) return;
  if (interaction.type == InteractionType.ApplicationCommand) {
    const command = client.scommands.get(interaction.commandName);
    if (!command) {
      return client.send(interaction, {
        content: `\`${interaction.commandName}\` is not valid command !!`,
        ephemeral: true,
      });
    } else {
      if (
        command.userPermissions &&
        !interaction.member.permissions.has(
          PermissionsBitField.resolve(command.userPermissions)
        )
      ) {
        return client.sendEmbed(
          interaction,
          `You don't have enough Permissions !!`
        );
      } else if (
        command.botPermissions &&
        !interaction.guild.members.me.permissions.has(
          PermissionsBitField.resolve(command.botPermissions)
        )
      ) {
        return client.sendEmbed(
          interaction,
          `I don't have enough Permissions !!`
        );
      } else {
        command.run(client, interaction);
      }
    }
  }
});
