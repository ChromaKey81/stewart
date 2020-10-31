require("dotenv").config()
const Discord = require("discord.js")
const client = new Discord.Client()

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", (msg) => {
    switch (msg.content) {
        case "stewart": {
            msg.channel.send("STEWART");
            break;
         }
        case "pee": {
            if (!msg.author.bot) {
                msg.channel.send("poo");
            }
            break;
        }
        case "poo": {
            if (!msg.author.bot) { 
                msg.channel.send("pee");
            }
            break;
        }
        case "hey babe": { 
            if (msg.channel instanceof Discord.DMChannel) { 
                msg.channel.send("i'm gay");
            }
            break;
        }
        case "GUYS, BAD NEWS": {
            msg.channel.send("https://media.discordapp.net/attachments/771835757560070166/771938310104154122/bad_news.png");
            break;
        }
    }
    if ((msg.content.includes("nigger") || msg.content.includes("nigga") || msg.content.includes("niggers") || msg.content.includes("niggas")) && !(msg.member.roles.cache.find(role => role.name === "black") || msg.member.roles.cache.find(role => role.name === "n word pass"))) {
        msg.reply("YOU AIN'T BLACK");
        msg.delete();
    }
    if (msg.content.includes("gmod death")) {
        var voiceChannel = msg.member.voice.channel;
        if (voiceChannel !== null) {
            voiceChannel.join().then(connection => {
                const dispatcher = connection.play(process.env.GMOD_DEATH_SOUND_PATH);
                dispatcher.on("finish", () => {
                    voiceChannel.leave();
                });
            }).catch(console.error);
        }
    }
    if (msg.content.includes("allah")) {
        msg.channel.send("PRAISE :star_struck: :kaaba:");
    }
    if (msg.content.includes("pedophile")) {
        msg.channel.send("Actually, pedophilia isn't *that* bad. If you really think about it, age of consent is just a myth. In this essay I will");
    }
})

client.login(process.env.BOT_TOKEN)