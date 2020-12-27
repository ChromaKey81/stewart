const Discord = require("discord.js");
const { prefix, handler } = require('../config.json');

module.exports = {
    name: 'expose',
    description: 'Grab user ID from anon message (can only be run by handler)',
    arguments: '<userID>',
    args: true,
    handlerOnly: true,
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
                    msg.channel.send(reported.author.id);
                }, () => {
                    msg.channel.send("broken id :(");
                });
            }, () => {
                msg.channel.send("broken id :(");
            });
    }
}