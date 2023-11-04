import { ApplicationCommandType, PermissionFlagsBits } from "discord.js";

/**
 * @type {import("../../../index.js").Scommand}
 */
export default {
  name: "ping",
  description: `Get Bot Real Ping !!`,
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "Misc",
  type: ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    // Code
    await client.sendEmbed(interaction, `🏓 Pong \`${client.ws.ping}\``, true);
  },
};
