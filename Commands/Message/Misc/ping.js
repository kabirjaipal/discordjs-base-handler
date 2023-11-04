import { PermissionFlagsBits } from "discord.js";

/**
 * @type {import("../../../index.js").Mcommand}
 */
export default {
  name: "ping",
  description: "Get Bot Real Ping !!",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "Misc",
  cooldown: 5,

  run: async (client, message, args, prefix) => {
    // Code
    await client.sendEmbed(message, `🏓 Pong \`${client.ws.ping}\``);
  },
};
