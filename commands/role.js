const Discord = require("discord.js");
const { prefix } = require('../config.json');

module.exports = {
    name: 'role',
    description: 'give yourself a role or remove it',
    arguments: `<roleName>`,
    args: true,
    /**
 * Say hi
 * @param {Discord.Client} client STEWART
 * @param {Discord.Message} msg The name to say hi to
 * @param {String[]} args List of arguments 
 */
    execute(client, msg, args, stewartoriums, defaultSettings) {
        if (msg.guild.members.cache.get(client.user.id).hasPermission("MANAGE_ROLES")) {
            client.settings.ensure(msg.guild.id, defaultSettings);
            if (msg.member.guild.roles.cache.find(r => r.name === args.join(" ") && client.settings.get(msg.guild.id, "assignableRoles").includes(r.id))) {
                let role = msg.member.guild.roles.cache.find(r => r.name === args.join(" ") && client.settings.get(msg.guild.id, "assignableRoles").includes(r.id));
                if(msg.member.roles.cache.find(r => r === role)) {
                    msg.member.roles.remove(role);
                    msg.channel.send("took the role don't even worry");
                } else {
                    msg.member.roles.add(role);
                    msg.channel.send("gave you the role don't even worry");
                }
            } else {
                msg.channel.send("unknown or unassignable role");
            }
        } else {
            msg.channel.send("i don't have the perms to assign roles. please consider the following");
            msg.channel.send("https://cdn.discordapp.com/attachments/788984167198621727/789541939187154975/video0_1.mov");
        }
    }
}