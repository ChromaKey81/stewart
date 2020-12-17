const fs = require('fs');
const Discord = require("discord.js");
const path = require('path');
const { prefix, name, easterEggLocation, configFilepath, botID } = require("../config.json");

module.exports = {
    name: 'easteregg',
    description: 'hides an easter egg',
    args: false,
    /**
 * Say hi
 * @param {Discord.Client} client STEWART
 * @param {Discord.Message} msg The name to say hi to
 * @param {String[]} args List of arguments 
 */
    execute(client, msg, args) {
        console.log(easterEggLocation);
        if (easterEggLocation === "0") {
            if (msg.channel.name === name + "orium") {
                const guild = client.guilds.cache.filter(g => g.channels.cache.find(c => c.type !== "voice" && c.name !== name + "orium") && g.members.cache.get(botID).permissions.has("MANAGE_CHANNELS")).array()[Math.floor(Math.random() * client.guilds.cache.size)];
                const channel = guild.channels.cache.filter(c => c.type === "text" && c.name !== name + "orium" && c.permissionsFor(guild.roles.cache.find(r => r.name === '@everyone')).serialize().VIEW_CHANNEL).array()[Math.floor(Math.random() * guild.channels.cache.size)];
                if (channel.topic) {
                    channel.setTopic(channel.topic + " 🥚");
                } else {
                    channel.setTopic("🥚");
                }
                console.log(channel.name + " " + guild.name);
                msg.channel.send("easter egg hidden");
                setTimeout(function () {
                    const ogObject = JSON.parse(fs.readFileSync(configFilepath).toString());
                    ogObject.easterEggLocation = channel.id;
                    fs.writeFile(configFilepath, JSON.stringify(ogObject), function (err) {
                        if (err) return console.log(err);
                    });
                }, 2000);
            } else {
                msg.channel.send("you can only use that command in the " + name + "orium for all to see");
            }
        } else {
            if (args[0] === easterEggLocation) {
                msg.react('✅');
                const location = client.channels.cache.get(easterEggLocation);
                if (location.topic) {
                    location.setTopic(location.topic.slice(0, -1));
                }
                client.guilds.cache.forEach(g => {
                    g.channels.cache.filter(c => c.name === name + "orium" && c.nsfw).forEach(stewartorium => {
                        stewartorium.send(msg.author.username + " found the easter egg at " + location.name + " in " + location.guild.name);
                    });
                });
                setTimeout(function () {
                    const ogObject = JSON.parse(fs.readFileSync(configFilepath).toString());
                    ogObject.easterEggLocation = "0";
                    fs.writeFile(configFilepath, JSON.stringify(ogObject), function (err) {
                        if (err) return console.log(err);
                    });
                }, 2000);
            } else {
                msg.react('❌');
            }
        }
    }
}