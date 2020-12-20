const fs = require('fs');
const Discord = require("discord.js");
const path = require('path');
const { prefix, name, configFilepath, botID } = require("../config.json");

module.exports = {
    name: 'easteregg',
    description: 'hides an easter egg',
    args: false,
    /**
 * Say hi
 * @param {Discord.Client} client STEWART
 * @param {Discord.Message} msg The name to say hi to
 * @param {String[]} args List of arguments 
 * @param {Discord.TextChannel[]} stewartoriums List of stewartoriums
 */
    execute(client, msg, args, stewartoriums) {
        console.log(client.easterEggLocation);
        if (client.easterEggLocation === "0") {
            if (msg.channel.name === name + "orium") {
                const guild = client.guilds.cache.filter(g => g.channels.cache.find(c => !stewartoriums.includes(c) && c.permissionsFor(g.roles.cache.find(r => r.name === '@everyone')).serialize().VIEW_CHANNEL && c.type === "text") && g.members.cache.get(botID).permissions.has("MANAGE_CHANNELS")).random();
                const channel = guild.channels.cache.filter(c => !stewartoriums.includes(c) && c.permissionsFor(guild.roles.cache.find(r => r.name === '@everyone')).serialize().VIEW_CHANNEL && c.type === "text").random();
                if (!channel.topic) {
                    channel.setTopic("🥚");
                } else {
                    channel.setTopic(channel.topic + " 🥚");
                }
                console.log(channel.name + " " + guild.name);
                stewartoriums.forEach(st => {
                    st.send("easter egg hidden");
                });
                client.easterEggLocation = channel.id;
                console.log(client.easterEggLocation);
                setTimeout(function () {
                    if (client.easterEggLocation !== "0") {
                        stewartoriums.forEach(st => {
                            st.send("the easter egg is in this server: " + guild.name);
                        });
                    }
                }, 30000);
                setTimeout(function () {
                    if (client.easterEggLocation !== "0") {
                        stewartoriums.forEach(st => {
                                st.send("nobody found the easter egg at " + channel.name + " in " + guild.name);
                                if (channel.topic) {
                                    channel.setTopic(channel.topic.slice(0, -1));
                                }
                                client.easterEggLocation = "0";
                        });
                    }
                }, 120000);
            } else {
                msg.channel.send("you can only use that command in the " + name + "orium for all to see");
            }
        } else {
            if (args[0] === client.easterEggLocation) {
                msg.react('✅');
                const location = client.channels.cache.get(client.easterEggLocation);
                if (location.topic) {
                    location.setTopic(location.topic.slice(0, -1));
                }
                    stewartoriums.forEach(stewartorium => {
                        stewartorium.send(msg.author.username + " found the easter egg at " + location.name + " in " + location.guild.name);
                    });
                client.easterEggLocation = "0";
            } else {
                msg.react('❌');
            }
        }
    }
}