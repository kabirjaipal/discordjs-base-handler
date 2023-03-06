import { CommandInteraction, Collection } from "discord.js";

/**
 *
 * @param {CommandInteraction} interaction
 * @param {String} cmd
 */
export function cooldown(interaction, cmd) {
  if (!interaction || !cmd) return;
  let { client, member } = interaction;
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

export function logStatus(name, isLoaded, type) {
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();

  const statusIcon = isLoaded ? "\x1b[32m✅\x1b[0m" : "\x1b[31m❌\x1b[0m";
  const statusText = isLoaded ? "Loaded" : "Not Loaded";
  console.log(
    `[${date} ${time}] ${type} : ${name} | Status: ${statusIcon} ${statusText}`
  );
}
