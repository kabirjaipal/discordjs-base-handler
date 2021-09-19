const client = require("..");
var config = require("../settings/config.json");
var ee = require("../settings/embed.json");
const { MessageEmbed } = require("discord.js");

client.on('messageCreate', async message => {
    let prefix = config.prefix
    if (!message.guild) return;
    if (message.author.bot) return;
    if (message.channel.partial) await message.channel.fetch();
    if (message.partial) await message.fetch();
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();

    // getting prefix when bot mention
    if (cmd.length === 0) {
        if (message.mentions.has(client.user)) {
            message.channel.send({
                embeds: [new MessageEmbed()
                    .setColor(ee.embed_color)
                    .setAuthor(`Hey, You Pinged me.. 😉`)
                    .setDescription(`My Developer is <@882481863661342770> \n\n My Name is **${client.user.username}** \n My prefix is \`${prefix}\` \n You can see my all commands by type \`${prefix}help\` \n [My Support Server](${config.server}) `)
                    .setFooter(ee.embed_footertext, ee.embed_footericon)
                ]
            });

        }
    }

    const command = client.commands.get(cmd.toLowerCase());
    if (!command) return;
    if (command) {
        // checking user perms
        if (!message.member.permissions.has(command.permissions || [])) {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor(ee.embed_color)
                        .setDescription(`** ❌ You don't Have ${command.permissions} To Run Command.. **`)
                ]
            })
        }
        command.run(client, message, args, prefix)
    }
})


