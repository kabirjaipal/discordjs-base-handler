import { ApplicationCommandType, PermissionFlagsBits } from "discord.js";

/**
 * @type {import("../../../index").Scommand}
 */
export default {
  name: "ping",
  description: "Check the bot's latency.",
  userPermissions: [PermissionFlagsBits.SendMessages],
  botPermissions: [
    PermissionFlagsBits.SendMessages,
    PermissionFlagsBits.EmbedLinks,
  ],
  category: "Misc",
  type: ApplicationCommandType.ChatInput,

  run: async ({ client, interaction }) => {
    // Code
    await client.sendEmbed(interaction, `🏓 Pong \`${client.ws.ping}\``);
  },
};
