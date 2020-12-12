const Discord = require("discord.js");
const { prefix } = require('./config.json');

module.exports = {
    name: 'help',
    description: 'Request a list of commands',
    args: false,
    /**
 * Say hi
 * @param {Discord.Client} client STEWART
 * @param {Discord.Message} msg The name to say hi to
 * @param {String[]} args List of arguments 
 */
    execute(client, msg, args) {
        const { commands } = msg.client;
        const data = [];
        data.push(commands.map(command => {
            if ((command.guild && command.guild === msg.guild.id) || !command.guild) {
                if (command.args) {
                    return "`" + command.name + " " + command.arguments + "` " + command.description;
                } else {
                    return "`" + command.name + "` " + command.description;
                }
            }
        }).join("\n"));
        msg.channel.send(data);
    }
}