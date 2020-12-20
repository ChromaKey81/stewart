const Discord = require("discord.js");
const { prefix } = require('../config.json');

module.exports = {
    name: 'vote',
    description: 'based? cringe?',
    arguments: '<channelID> <msgID>',
    args: true,
    /**
 * Say hi
 * @param {Discord.Client} client STEWART
 * @param {Discord.Message} msg The name to say hi to
 * @param {String[]} args List of arguments 
 */
    execute(client, msg, args) {
        if (args[0] === "null") {
            msg.channel.send("https://media.discordapp.net/attachments/440372667514880001/768741806211858432/image0.jpg?width=476&height=475").then(message => {
                message.react('🟢');
                message.react('🔴');
                msg.delete();
            });
        } else {
            client.channels.cache.find(channel => channel.id === args[0]).messages.fetch(args[1]).then(message => {
                message.react('🟢');
                message.react('🔴');
                msg.delete();
            }).catch(() => {
                msg.react('❓');
            });
        }
    }
}

