const Discord = require("discord.js");
const { prefix } = require('../config.json');

module.exports = {
    name: 'sailor',
    description: 'congrats sailor',
    args: false,
    /**
 * Say hi
 * @param {Discord.Client} client STEWART
 * @param {Discord.Message} msg The name to say hi to
 * @param {String[]} args List of arguments 
 */
    execute(client, msg, args) {
        const day = new Date().getDay();
        switch (day) {
            case 0: {
                msg.channel.send("https://cdn.discordapp.com/attachments/771835757560070166/787487740400500736/Sailor_Sunday_It_be_Sunday_sailors_A_new_week_is_upon_us.mp4");
                break;
            }
            case 1: {
                msg.channel.send("https://cdn.discordapp.com/attachments/771835757560070166/787487738177257482/Rise_and_shine_sailors.mp4");
                break;
            }
            case 2: {
                msg.channel.send("https://cdn.discordapp.com/attachments/771835757560070166/787487739268038676/its_tuesday_hang_in_there_mateys_meme.mp4");
                break;
            }
            case 3: {
                msg.channel.send("https://cdn.discordapp.com/attachments/771835757560070166/787487738722779136/Mr._Krabs_Clancy_Brown_Day_of_the_Week-_You_Made_it_to_Wednesday_Vo.codes.mp4");
                break;
            }
            case 4: {
                msg.channel.send("https://cdn.discordapp.com/attachments/771835757560070166/787487738097827880/its_thursday_laddies.mp4");
                break;
            }
            case 5: {
                msg.channel.send("https://cdn.discordapp.com/attachments/771835757560070166/787488396670140416/Congratulations_sailer_you_made_it_to_friday.mp4");
                break;
            }
            case 6: {
                msg.channel.send("https://cdn.discordapp.com/attachments/771835757560070166/787487742614437938/welcome_to_the_weekend_sailor.mp4");
                break;
            }
        }
    }
}