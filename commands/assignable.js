const Discord = require("discord.js");
const { prefix } = require('../config.json');

module.exports = {
    name: 'assignable',
    description: 'make a role assignable through stewart',
    arguments: `<roleID>`,
    args: true,
    /**
 * Say hi
 * @param {Discord.Client} client STEWART
 * @param {Discord.Message} msg The name to say hi to
 * @param {String[]} args List of arguments 
 * @param {Discord.TextChannel[]} stewartoriums List of arguments 
 */
    execute(client, msg, args, stewartoriums, defaultSettings) {
        client.settings.ensure(msg.guild.id, defaultSettings);
        if (msg.member.permissions.has("ADMINISTRATOR")) {
            if (msg.guild.roles.cache.find(r => r.id === args[0])) {
                if (client.settings.get(msg.guild.id, "assignableRoles").includes(args[0])) {
                    client.settings.remove(msg.guild.id, args[0], "assignableRoles");
                    msg.channel.send("role is no longer assignable");
                } else {
                    client.settings.push(msg.guild.id, args[0], "assignableRoles");
                    msg.channel.send("role is now assignable");
                }
            } else {
                msg.channel.send("unknown role");
            }
        } else {
            msg.channel.send("must be admin");
        }
    }
}