const fs = require('fs');
const Discord = require("discord.js");
const {
    prefix, token, GMOD_DEATH_SOUND_PATH, BRUH_SOUND_PATH, stewartoriumBlacklist, stewartoriumNumber, name
} = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
var stewartoriums = [client.channels.cache.find(channel => channel.type === "text" && channel.name === name + "orium" && channel.nsfw)];

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on("ready", () => {
    console.log("Logged in as ${client.user.tag}!");
    client.user.setActivity("st!help", {
        type: "LISTENING"
    });
});



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
        case "based": {
            msg.channel.send("https://cdn.discordapp.com/attachments/618527046527614986/778733104420094012/Based.mp4");
            break;
        }
        case "da wobot!": {
            msg.channel.send("https://cdn.discordapp.com/attachments/440372667514880001/779729159689076736/1605123501570.webm");
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
        if ((msg.content.toLowerCase().includes("nigger") || msg.content.toLowerCase().includes("nigga") || msg.content.toLowerCase().includes("niggers") || msg.content.toLowerCase().includes("niggas")) && !(msg.member.roles.cache.find(role => role.name === "black") || msg.member.roles.cache.find(role => role.name === "n word pass"))) {
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
        if (msg.content.includes("nut") && msg.content.includes("baby")) {
            msg.channel.send("https://cdn.discordapp.com/attachments/770024867541286912/786253166198259782/from_the_ballsack.mp4");
        }
        if (msg.content.includes(name) && msg.content.includes("hate")) {
            msg.channel.send("What the fuck did you just fucking say about me, you little bitch? I'll have you know I graduated top of my class in the Navy Seals, and I've been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I'm the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You're fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that's just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little \"clever\" comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn't, you didn't, and now you're paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You're fucking dead, kiddo.");
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
        if ((msg.content.includes("unfunny") || msg.content.includes("not funny") || msg.content.includes("cringe") || msg.content.includes("repost")) && !msg.author.bot) {
            msg.channel.send("https://cdn.discordapp.com/attachments/279294297398837249/776488535775117322/cringe_as_hell.mp4");
        }
        if (msg.content.includes("monke") && msg.author.bot === false) {
            msg.channel.send("MONKE MONKE :monkey: :banana: OOO OOOO OOO AA AA");
        }
    }
    if (msg.content.includes("allah")) {
        msg.channel.send("PRAISE :star_struck: :kaaba:");
    }
    if (msg.content.includes("stickbug")) {
        msg.channel.send("https://cdn.discordapp.com/attachments/633059174539984901/784411180918898698/video0-1.mov");
    }
    if (msg.content.includes(name) && !(msg.content.includes("<a:stewartpet:788420421850366002>" || msg.content.includes(":stewartpet:"))) && !msg.author.bot) {
        msg.channel.send(name.toUpperCase());
    }
    if ((msg.content.includes("<a:stewartpet:788420421850366002>") || msg.content.includes(":stewartpet:")) && !msg.author.bot) {
        msg.channel.send("uwu <a:stewartpet:788420421850366002>");
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
    if (msg.channel.name === name + "orium" && msg.author.id !== "771831772157313024" && msg.channel.nsfw) {
        const stewartoriums = client.channels.cache.filter(channel => channel.type === "text" && channel.name === name + "orium" && channel.nsfw);
        const attachments = [];
        const typing = stewartoriums.map(stewartorium => {
            stewartorium.guild.members.fetch(stewartorium._typing.keys().next()).username;
        });
        console.log(typing.join(" "));
        const embeds = [];
        attachments.push(msg.attachments.map(attachment => {
            return "\n" + attachment.url;
        }));
        embeds.push(msg.embeds.map(embed => {
            return embed;
        }));
        var message = "**" + msg.author.tag + "**: " + msg.content + attachments;
        msg.react('🥚').then(egg => {
            egg.remove();
        });
        stewartoriums.forEach(stewartorium => {
            if (stewartorium !== msg.channel) {
                if (stewartoriumBlacklist.includes(msg.author.id)) {
                    stewartorium.send("**" + msg.author.tag + "**: [blocked message]");
                } else {
                    stewartorium.send(message, { "allowedMentions": { "users": [] } });
                }
                if ((msg.content.includes("<a:stewartpet:788420421850366002>") || msg.content.includes(":stewartpet:")) && !msg.author.bot) {
                    stewartorium.send("uwu <a:stewartpet:788420421850366002>");
                }
            }
            switch (typing.length) {
                case 0: {
                    stewartorium.setTopic(stewartoriums.size + " stewartoriums entangled");
                    break;
                }
                case 1: {
                    stewartorium.setTopic(typing[0] + " is typing...");
                }
                case 2: {
                    stewartorium.setTopic(typing[0] + " and " + typing[1] + " are typing...");
                }
                case 3: {
                    stewartorium.setTopic(typing[0] + ", " + typing[1] + ", and " + typing[2] + " are typing...");
                }
                default: {
                    stewartorium.setTopic("Several people are typing...");
                }
            }
        });
    }
});

client.login(token);