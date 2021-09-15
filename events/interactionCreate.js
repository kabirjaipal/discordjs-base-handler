const { MessageEmbed } = require("discord.js");
const client = require("..");
var config = require("../settings/config.json");
var ee = require("../settings/embed.json");

client.on('interactionCreate', async interaction => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => { });

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "An error has occured " });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        if (cmd) {
            // checking user perms
            if (!interaction.member.permissions.has(cmd.permissions || [])) {
                return interaction.followUp({
                    embeds: [
                        new MessageEmbed()
                            .setColor(ee.embed_color)
                            .setDescription(`You don't Have ${cmd.permissions} To Run Command..`)
                            .setFooter(ee.embed_footertext, ee.embed_footericon)
                    ]
                })
            }
            cmd.run(client, interaction, args);

        }
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }
})