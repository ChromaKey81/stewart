const Discord = require("discord.js");
const { prefix, handler, botID } = require('../config.json');

module.exports = {
    name: 'announce',
    description: 'announces a stewart update to all stewart servers',
    arguments: '<patchNotes...>',
    args: true,
    handlerOnly: true,
    /**
 * Say hi
 * @param {Discord.Client} client STEWART
 * @param {Discord.Message} msg The name to say hi to
 * @param {String[]} args List of arguments 
 */
    execute(client, msg, args) {
            client.guilds.cache.forEach(guild => {
                if (guild.systemChannel && guild.systemChannel.permissionsFor(guild.members.cache.get(botID)).has("SEND_MESSAGES")) {
                    client.settings.ensure(guild.id, guild.systemChannelID, "updates");
                } else if (guild.publicUpdatesChannel && guild.publicUpdatesChannel.permissionsFor(guild.members.cache.get(botID)).has("SEND_MESSAGES")) {
                    client.settings.ensure(guild.id, guild.publicUpdatesChannelID, "updates");
                } else {
                    client.settings.ensure(guild.id, "0", "updates");
                }
                if (client.settings.get(guild.id, "updates") !== "0") {
                    guild.channels.cache.get(client.settings.get(guild.id, "updates")).send("stewart has received an update: " + msg.content.substring(msg.content.indexOf(" ") + 1));
                }
            });
    }
}