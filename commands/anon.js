const Discord = require("discord.js");
const { prefix } = require('../config.json');

module.exports = {
    name: 'anon',
    description: 'Sends an anonymous message to a user',
    arguments: '<userID> <text>',
    args: true,
    /**
 * Say hi
 * @param {Discord.Client} client STEWART
 * @param {Discord.Message} msg The name to say hi to
 * @param {String[]} args List of arguments 
 */
    execute(client, msg, args) {
        client.users.fetch(args[0]).then(user => {
            user.send("You received an anonymous message: \"" + msg.content.substring(msg.content.indexOf(" ", prefix.length + 5) + 1) + "\"").then(() => {
                msg.react('📧');
                user.send("ID: " + msg.channel.id + "-" + msg.id);
            }, () => {
                msg.channel.send("cant talk to them :(");
            });
        }, () => {
            msg.channel.send("idk who that is");
        });
    }
}