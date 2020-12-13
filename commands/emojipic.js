const Discord = require("discord.js");
const { prefix } = require('./config.json');

module.exports = {
    name: 'emojipic',
    description: 'Grab the image of an emoji',
    arguments: '<emoji>',
    args: true,
    /**
 * Say hi
 * @param {Discord.Client} client STEWART
 * @param {Discord.Message} msg The name to say hi to
 * @param {String[]} args List of arguments 
 */
    execute(client, msg, args) {
        const emojiID = args[0].match(/\d+/g);
        if (args[0].startsWith("<a:")) {
            msg.channel.send("https://cdn.discordapp.com/emojis/" + emojiID + ".gif?v=1");
        } else {
            msg.channel.send("https://cdn.discordapp.com/emojis/" + emojiID + ".png?v=1")
        }
    }
}