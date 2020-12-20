const Discord = require("discord.js");
const { prefix } = require('../config.json');

module.exports = {
    name: 'reply',
    description: 'Reply to an anonymous message',
    arguments: '<anonID> <text>',
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
            dmChannel.messages.fetch(messageID).then(message => {
                message.channel.send("Someone replied to your anonymous message: \"" + msg.content.substring(msg.content.indexOf(" ", prefix.length + 6) + 1) + "\"").then(() => {
                    msg.react('📧');
                }, () => {
                    msg.channel.send("cant talk to them :(");
                });
                message.channel.send("(Replying to message ID " + messageID + ")").catch();
            }, () => {
                msg.channel.send("broken id :(");
            });
        }, () => {
            msg.channel.send("broken id :(");
        });
    }
}