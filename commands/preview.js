const Discord = require("discord.js");
const { prefix, handler, botID } = require('../config.json');

module.exports = {
    name: 'preview',
    description: 'previews stewart update announcement',
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
        msg.channel.send("stewart has received an update: " + msg.content.substring(msg.content.indexOf(" ") + 1));
    }
}