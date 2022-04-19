const { glob } = require("glob");
const { promisify } = require("util");
const { Client, EmbedBuilder } = require("discord.js");
const globPromise = promisify(glob);
const { embed: ee, emoji, guildID } = require("../settings/config");

/**
 *
 * @param {Client} client
 */
module.exports = async (client) => {
  // LOADING SLASH COMMANDS
  try {
    let arrayOfcommands = [];
    const commandFiles = await globPromise(
      `${process.cwd()}/Commands/Slash/**/*.js`
    );
    commandFiles.map((value) => {
      const file = require(value);
      const splitted = value.split("/");
      const directory = splitted[splitted.length - 2];
      const properties = { directory, ...file };
      client.commands.set(file.name, properties);
      arrayOfcommands.push(file);
    });
    client.on("ready", async () => {
      await client.application.commands.set(arrayOfcommands);
      client.guilds.cache.get(guildID).commands.set(arrayOfcommands);
    });
    console.log(`${client.commands.size} Slash Commands Loaded`);
  } catch (e) {
    console.log(e);
  }

  // LOADING MESSAGE COMMANDS
  try {
    const MessageCommadsFiles = await globPromise(
      `${process.cwd()}/Commands/Message/**/*.js`
    );
    MessageCommadsFiles.map((value) => {
      const file = require(value);
      const splitted = value.split("/");
      const directory = splitted[splitted.length - 2];
      const properties = { directory, ...file };
      client.mcommands.set(file.name, properties);
    });
    console.log(`${client.mcommands.size} Slash Commands Loaded`);
  } catch (e) {
    console.log(e);
  }
  // Loading Event Files
  try {
    const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    eventFiles.map((value) => require(value));
    console.log(`${eventFiles.length} Events Loaded`);
  } catch (e) {
    console.log(e);
  }

  client.embed = (interaction, data) => {
    let user = interaction.user ? interaction.user : interaction.author;
    if (interaction.deferred) {
      interaction
        .followUp({
          embeds: [
            new EmbedBuilder()
              .setColor(ee.color)
              .setDescription(` ** ${data.substring(0, 3000)} **`)
              .setFooter({
                text: user.tag,
                iconURL: user.displayAvatarURL({ dynamic: true }),
              }),
          ],
        })
        .catch((e) => {});
    } else {
      interaction
        .reply({
          embeds: [
            new EmbedBuilder()
              .setColor(ee.color)
              .setDescription(` ** ${data.substring(0, 3000)} **`)
              .setFooter({
                text: user.tag,
                iconURL: user.displayAvatarURL({ dynamic: true }),
              }),
          ],
        })
        .catch((e) => {});
    }
  };
};
