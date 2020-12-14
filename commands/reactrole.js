const Discord = require("discord.js");
const { prefix } = require('./config.json');

module.exports = {
    name: 'reactrole',
    description: 'give all who react with `<emojiID>` the role `<roleID>`',
    arguments: `<messageID> <emojiID> <roleID>`,
    args: true,
    /**
 * Say hi
 * @param {Discord.Client} client STEWART
 * @param {Discord.Message} msg The name to say hi to
 * @param {String[]} args List of arguments 
 */
    execute(client, msg, args) {
        if (msg.member.hasPermission('ADMINISTRATOR')) {
            msg.guild.roles.fetch(args[2]).then(role => {
                msg.channel.messages.fetch(args[0]).then(message => {
                    const reaction = message.reactions.resolve(args[1]);
                        if (typeof reaction === "null") {
                            msg.channel.send("nobody reacted with that");
                        } else {
                            reaction.users.cache.forEach(user => {
                                msg.guild.members.cache.find(member => member.id === user.id).roles.add(role);
                                msg.react('✅');
                            });
                        }
                }, () => {
                    msg.channel.send("not a message in this channel");
                });
            }, () => {
                msg.channel.send("couldn't find that role");
            });
        } else {
            msg.channel.send("you gotta be an admin bud");
        }
    }
}