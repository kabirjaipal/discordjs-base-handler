const client = require("..");

client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    await interaction.defer().catch((e) => {
      console.log(e);
    });
    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd) return interaction.followUp({ content: "ERROR, HHAHAHAHA" });

    const args = [];
    interaction.options.array().map((x) => {
      args.push(x.value);
    });
    cmd.run(client, interaction, args);
  }
});
