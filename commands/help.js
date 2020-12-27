const Discord = require("discord.js");
const { prefix, handler } = require('../config.json');

module.exports = {
    name: 'help',
    description: 'Request a list of commands',
    args: false,
    /**
 * Say hi
 * @param {Discord.Client} client STEWART
 * @param {Discord.Message} msg The name to say hi to
 * @param {String[]} args List of arguments 
 * @param {Discord.TextChannel[]} stewartoriums
 */
    execute(client, msg, args, stewartoriums) {
        const { commands } = msg.client;
        const data = [];
        data.push(commands.map(command => {
            if ((!command.handlerOnly || msg.author.id === handler) && (!command.guild || msg.guild) && (!command.stewartorium || stewartoriums.includes(msg.channel)) && (!command.permissions || !msg.guild || msg.member.permissions.toArray().every(p => command.permissions.includes(p)))) {
                if (command.args) {
                    return "`" + command.name + " " + command.arguments + "` " + command.description + "\n";
                } else {
                    return "`" + command.name + "` " + command.description + "\n";
                }
            } else {
                return "`[restricted command]`\n";
            }
        }).join(""));
        msg.channel.send(data);
    }
}