const Discord = require("discord.js");
const { prefix } = require('../config.json');

module.exports = {
    name: 'setgotcha',
    description: 'set channel for stewart to track deleted messages',
    arguments: `<channelID>`,
    args: true,
    permissions: ['ADMINISTRATOR'],
    /**
 * Say hi
 * @param {Discord.Client} client STEWART
 * @param {Discord.Message} msg The name to say hi to
 * @param {String[]} args List of arguments 
 * @param {Discord.TextChannel[]} stewartoriums List of arguments 
 */
    execute(client, msg, args, stewartoriums, defaultSettings) {
        client.settings.ensure(msg.guild.id, defaultSettings);
            if (msg.guild.channels.cache.find(c => c.id === args[0])) {
                if (client.settings.get(msg.guild.id, "gotcha") === args[0]) {
                    client.settings.set(msg.guild.id, "0", "gotcha");
                    msg.channel.send("channel is no longer assigned to track deleted messages");
                } else {
                    client.settings.set(msg.guild.id, args[0], "gotcha");
                    msg.channel.send("deleted messages will now be tracked in <#" + args[0] + ">");
                }
            } else {
                msg.channel.send("unknown channel");
            }
    }
}