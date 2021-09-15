const client = require("..");
var config = require("../settings/config.json");
var ee = require("../settings/embed.json");
const ms = require('ms')
const { MessageEmbed } = require("discord.js");
const { cooldown_op, mentionprefixnew } = require('../utils/function');

client.on('messageCreate', async message => {
    let prefix = config.prefix
    if (!message.guild) return;
    if (message.author.bot) return;
    if (message.channel.partial) await message.channel.fetch();
    if (message.partial) await message.fetch();
    let mentionprefix = new RegExp(`^(<@!?${client.user.id}>|${mentionprefixnew(prefix)})`)
    const [, nprefix] = message.content.match(mentionprefix);
    const args = message.content.slice(nprefix.length).trim().split(/ +/);
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
        // // cheking roles role only command
        // if(command.role === true){
        //     let role = message.member.roles.cache.find(f => f.name === "modrole")
        //     if(!message.member.roles.cache.has(role)){
        //         return message.reply(`You dont have role`)
        //     }
        // }
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

        /// command cooldown  code
        // cooldown code from tomato#6966
        if (cooldown_op(message, command)) {
            let timeLeft = cooldown_op(message, command)
            return message.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor(ee.embed_color)
                        .setDescription(`** You are on cooldown wait \`${timeLeft.toFixed()}\` Seconds for use \`${command.name}\` command **`)
                ]
            }).then(msg => setTimeout(() => {
                msg.delete()
            }, config.mst))
        }
        command.run(client, message, args, prefix)
    }
})


