const Discord = require("discord.js");
const { prefix } = require('./config.json');

module.exports = {
    name: 'git',
    description: 'this :) is my git repo :)) my insides. we are so intimate :) you and i',
    args: false,
    /**
 * Say hi
 * @param {Discord.Client} client STEWART
 * @param {Discord.Message} msg The name to say hi to
 * @param {String[]} args List of arguments 
 */
    execute(client, msg, args) {
        msg.channel.send("this :) is my git repo :)) my insides. we are so intimate :) you and i. and if u listen :) i can tell you more things :) about this world \n https://github.com/ChromaKey81/stewart");
    }
}