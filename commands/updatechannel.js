const Discord = require("discord.js");
const config = require('../config.json');

module.exports = {
    name: 'updatechannel',
    description: 'set channel for stewart updates (or disable the announcements)',
    arguments: `(<channelID> | null | default)`,
    args: true,
    permissions: ['ADMINISTRATOR'],
    /**
 * Say hi
 * @param {Discord.Client} client STEWART
 * @param {Discord.Message} msg The name to say hi to
 * @param {String[]} args List of arguments 
 * @param {Discord.TextChannel[]} stewartoriums List of arguments 
 */
    execute(client, msg, args) {
            if (msg.guild.channels.cache.find(c => c.id === args[0])) {
                if (client.settings.get(msg.guild.id, "updates") === args[0]) {
                    client.settings.set(msg.guild.id, "0", "updates");
                    msg.channel.send("channel will no longer receive stewart updates");
                } else {
                    if (msg.guild.channels.cache.get(args[0]).permissionsFor(msg.guild.members.cache.get(config.botID)).has("SEND_MESSAGES")) {
                        client.settings.set(msg.guild.id, args[0], "updates");
                        msg.channel.send("stewart updates will now be announced in <#" + args[0] + ">");
                    } else {
                        msg.channel.send("no perms to send messages there");
                    }
                }
            } else if (args[0] === "null") {
                client.settings.set(msg.guild.id, "0", "updates");
                msg.channel.send("server will no longer receive stewart updates");
            } else if (args[0] === "default") {
                client.settings.delete(msg.guild.id, "updates");
                msg.channel.send("server will now receive updates in the system messages or community announcement channels if possible");
            } else {
                msg.channel.send("unknown channel");
            }
    }
}