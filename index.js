require("dotenv").config()
const Discord = require("discord.js")
const client = new Discord.Client()

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", (msg) => {
  if (msg.content === "stewart") {
    msg.channel.send("STEWART");
  }
  if (msg.content === "hey babe" && msg.channel instanceof Discord.DMChannel) {
    msg.channel.send("i'm gay");
  }
  if ((msg.content.includes("nigger") || msg.content.includes("nigga") || msg.content.includes("niggers") || msg.content.includes("niggas")) && !(msg.member.roles.cache.find(role => role.name === "black") || msg.member.roles.cache.find(role => role.name === "n word pass"))) {
    msg.reply("YOU AIN'T BLACK");
    msg.delete;
  }
})

client.login(process.env.BOT_TOKEN)