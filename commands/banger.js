const Discord = require("discord.js");
const { bangers } = require('./music.json');

module.exports = {
    name: 'banger',
    description: 'Plays a banger',
    arguments: '<title> [<sendLyrics>]',
    args: true,
    guild: true,
    /**
 * Say hi
 * @param {Discord.Client} client STEWART
 * @param {Discord.Message} msg The name to say hi to
 * @param {String[]} args List of arguments 
 */
    execute(client, msg, args) {
            var voiceChannel = msg.member.voice.channel;
            var key = args[0];
            if (voiceChannel !== null) {
                voiceChannel.join().then(connection => {
                    const dispatcher = connection.play(bangers[key].path);
                    dispatcher.on("finish", () => {
                        voiceChannel.leave();
                    });
                }).catch(console.error);
            }
            msg.channel.send("Title: " + bangers[key].title + "\nAuthor: " + bangers[key].author + "\nAlbum: " + bangers[key].album);
            if (args[1] === "true") {
                msg.channel.send("```\n" + bangers[key].lyrics.join("\n") + "\n```");
            }
    }
}