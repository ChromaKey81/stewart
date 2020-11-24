const Discord = require("discord.js");
const { prefix, handler } = require('./config.json');

module.exports = {
    name: 'report',
    description: 'Report an anonymouse message to the Handler for review',
    arguments: '<anonID> [<reason>]',
    args: true,
    /**
 * Say hi
 * @param {Discord.Client} client STEWART
 * @param {Discord.Message} msg The name to say hi to
 * @param {String[]} args List of arguments 
 */
    execute(client, msg, args) {
        const channelID = args[0].slice(0, args[0].indexOf("-"));
        const messageID = args[0].slice(args[0].indexOf("-") + 1);
        client.channels.fetch(channelID).then(dmChannel => {
            dmChannel.messages.fetch(messageID).then(reported => {
                msg.react('❗');
                client.users.fetch(handler).then(handler => {
                    handler.send("Reported: \"" + reported.content.substring(reported.content.indexOf(" ", prefix.length + 5) + 1) + "\"");
                    handler.send("Reason: \"" + msg.content.substring(msg.content.indexOf(" ", prefix.length + 7) + 1) + "\"");
                    handler.send("ID: " + args[0]);
                    handler.send("Filed by: " + msg.author.id);
                });
            }, () => {
                msg.channel.send("broken id :(");
            });
        }, () => {
            msg.channel.send("broken id :(");
        });
    }
}