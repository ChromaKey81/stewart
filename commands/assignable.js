const Discord = require("discord.js");
const { prefix } = require('../config.json');

module.exports = {
    name: 'assignable',
    description: 'make a role assignable through stewart',
    arguments: `<roleID>`,
    args: true,
    permissions: ['MANAGE_ROLES'],
    guild: true,
    /**
 * Say hi
 * @param {Discord.Client} client STEWART
 * @param {Discord.Message} msg The name to say hi to
 * @param {String[]} args List of arguments 
 * @param {Discord.TextChannel[]} stewartoriums List of arguments 
 */
    execute(client, msg, args, stewartoriums, defaultSettings) {
        client.settings.ensure(msg.guild.id, defaultSettings);
            if (msg.guild.roles.cache.find(r => r.id === args[0]) && msg.guild.roles.cache.get(args[0]).comparePositionTo(msg.member.roles.highest) > 0) {
                if (client.settings.get(msg.guild.id, "assignableRoles").includes(args[0])) {
                    client.settings.remove(msg.guild.id, args[0], "assignableRoles");
                    msg.channel.send("role is no longer assignable");
                } else {
                    client.settings.push(msg.guild.id, args[0], "assignableRoles");
                    msg.channel.send("role is now assignable");
                }
            } else {
                msg.channel.send("unknown role or the role is too high for you to manage");
            }
    }
}