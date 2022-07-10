const Discord = require('discord.js');
const client = new Discord.Client();
const db = require("quick.db")
const { MessageEmbed } = require("discord.js")
const { PREFIX } = require("../../config")

module.exports = {
  config: {
    name: "prefix",
    description: "Chnage/Know The server's Prefix or the Global Prefix",
    usage: "m/prefix <new prefix/reset>",
    example: "1) m/prefix = \n2) m/prefix reset",
    aliases: ["prefix"]
  },

  run: async (bot, message, args) => {
    let prefix;
    if (message.author.bot || message.channel.type === "dm") return;
        try {
            let fetched = await db.fetch(`prefix_${message.guild.id}`);
            if (fetched == null) {
                prefix = PREFIX
            } else {
                prefix = fetched
            }
        } catch (e) {
            console.log(e)
    };

    let option = args[0];

    //PERMISSION
    if (!message.member.hasPermission("MANAGE_GUILD")) {
      return message.channel.send("You are not allowed or do not have permission to change prefix")
    }





    let embed1 = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(`You can not send prefix more than 5 characters`); //did


    let embed2 = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(`Please enter a Prefix!`); //did

    if (!message.member.hasPermission("ADMINISTRATOR")) return;
    if (!args[0]) return message.channel.send(embed2);
    if (args[0].length >= 5)
      return message.reply(embed1);


    db.set(`prefix_${message.guild.id}`, args[0]), err => {
      if (err) console.log(err);
    };


    let embed = new Discord.MessageEmbed()
      .setColor("#55ff55")
      .setDescription(`You have Successfully changed the prefix to ${prefix}!`); //did
    message.channel.send(embed).then(messageToReact => {
      messageToReact.react("✅");
    })

  }

}
