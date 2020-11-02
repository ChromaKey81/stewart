const fs = require('fs');
const Discord = require("discord.js");
const { 
    prefix, token, GMOD_DEATH_SOUND_PATH, BRUH_SOUND_PATH
} = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on("ready", () => {
    console.log("Logged in as ${client.user.tag}!");
})

client.on("message", (msg) => {
    switch (msg.content) {
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
            msg.channel.send("https://media.discordapp.net/attachments/771835757560070166/772078874947354634/bad_news.png");
            break;
        }
    }
    if (msg.guild !== null) {
        if ((msg.content.includes("nigger") || msg.content.includes("nigga") || msg.content.includes("niggers") || msg.content.includes("niggas")) && !(msg.member.roles.cache.find(role => role.name === "black") || msg.member.roles.cache.find(role => role.name === "n word pass"))) {
            msg.reply("YOU AIN'T BLACK");
            msg.delete();
        }
        if (msg.content.includes("gmod death")) {
            var voiceChannel = msg.member.voice.channel;
            if (voiceChannel !== null) {
                voiceChannel.join().then(connection => {
                    const dispatcher = connection.play(GMOD_DEATH_SOUND_PATH);
                    dispatcher.on("finish", () => {
                        voiceChannel.leave();
                    });
                }).catch(console.error);
            }
        }
        if (msg.content.includes("bruh")) {
            var voiceChannel = msg.member.voice.channel;
            if (voiceChannel !== null) {
                voiceChannel.join().then(connection => {
                    const dispatcher = connection.play(BRUH_SOUND_PATH);
                    dispatcher.on("finish", () => {
                        voiceChannel.leave();
                    });
                }).catch(console.error);
            }
        }
        if (msg.content.includes("monke") && msg.author.bot === false) {
            msg.channel.send("MONKE MONKE :monkey: :banana: OOO OOOO OOO AA AA");
        }
    }
    if (msg.content.includes("allah")) {
        msg.channel.send("PRAISE :star_struck: :kaaba:");
    }
    if(msg.content.includes("stewart")) {
        msg.channel.send("STEWART");
    }
    if (msg.content.startsWith(prefix)) {
        const args = msg.content.slice(prefix.length).trim().split(" ");
        const commandName = args.shift().toLowerCase();
        if (!client.commands.has(commandName)) return msg.channel.send("no comprendo señor");
        const command = client.commands.get(commandName);

        if (command.args && !args.length) {
            return msg.channel.send("no argumento señor");
        }

        try {
            command.execute(client, msg, args);
        } catch (error) {
            console.error(error);
            msg.channel.send("/shrug");
        }
    }
});

client.login(token);