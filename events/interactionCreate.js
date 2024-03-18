import { PermissionsBitField } from "discord.js";
import { client } from "../bot.js";

/**
 * Handles interaction events, such as slash commands.
 * @param {Interaction} interaction - The interaction received from Discord.
 */
client.on("interactionCreate", async (interaction) => {
  try {
    // Ignore interactions from bots or outside of guilds
    if (interaction.user.bot || !interaction.guild) return;

    // Check if the interaction is a command
    if (!interaction.isCommand()) return;

    // Get the command object from the command collection
    const command = client.scommands.get(interaction.commandName);

    // If command not found, respond with error message
    if (!command) {
      return client.send(interaction, {
        content: `\`${interaction.commandName}\` is not a valid command !!`,
        ephemeral: true,
      });
    }

    // Extract member and command permissions
    const { member } = interaction;
    const { userPermissions, botPermissions } = command;

    // Create a permissions bitfield to track missing permissions
    const missingPermissions = new PermissionsBitField();

    // Check user permissions
    if (userPermissions && !member.permissions.has(userPermissions)) {
      // Add missing user permissions to the bitfield
      missingPermissions.add(userPermissions);

      // Send an error message listing missing user permissions
      await client.sendEmbed(
        interaction,
        `You are missing the following permissions: \`${missingPermissions
          .toArray()
          .join(", ")}\``
      );

      // Return early if user permissions are missing
      return;
    }

    // Check bot permissions
    if (
      botPermissions &&
      !interaction.guild.members.me.permissions.has(botPermissions)
    ) {
      // Add missing bot permissions to the bitfield
      missingPermissions.add(botPermissions);

      // Send an error message listing missing bot permissions
      await client.sendEmbed(
        interaction,
        `I am missing the following permissions: \`${missingPermissions
          .toArray()
          .join(", ")}\``
      );

      // Return early if bot permissions are missing
      return;
    }

    // Run the command
    await command.run({ client, interaction });
  } catch (error) {
    // Log any errors that occur
    console.error("An error occurred in interactionCreate event:", error);

    // Send a generic error message to the user
    await client.sendEmbed(
      interaction,
      "An error occurred while processing your command. Please try again later."
    );
  }
});
