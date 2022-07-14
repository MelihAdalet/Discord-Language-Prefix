const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const db = require("quick.db")
const { MessageEmbed } = require("discord.js")
const { PREFIX } = require("../../config")

module.exports = {
    config: {
        name: "lang",
        description: "Chnage/Know The server's Prefix or the Global Prefix",
        usage: "m/prefix <new prefix/reset>",
        example: "1) m/prefix = \n2) m/prefix reset",
        aliases: ["lang"]
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

  let language = db.fetch(`lang_${message.guild.id}`)
  if (language === null) language = "en"
  const lang = require(`../../lang/${language}.js`)

  const mg = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`${lang.lang.mg} **[Github](https://github.com/Dev-Span/Discord-Language-Prefix)**`)

  const msg = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`${lang.lang.msg}` + `\`${prefix}${lang.lang.msg2}\`` + ` **[Github](https://github.com/Dev-Span/Discord-Language-Prefix)**`)

  if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(mg)
  if (!args[0]) return message.channel.send(msg);


  if (args[0] === "en") {
    const err = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(`${lang.lang.err} **[Github](https://github.com/Dev-Span/Discord-Language-Prefix)**`)

    if (language === "en") return message.channel.send(err)
    db.set(`lang_${message.guild.id}`, "en")

    const embed = new Discord.MessageEmbed()
      .setColor("#55ff55")
      .setDescription(":flag_us: The language has been changed to `English` **[Github](https://github.com/Dev-Span/Discord-Language-Prefix)**")
    message.channel.send(embed).then(messageToReact => {
      messageToReact.react("✅");
    })
  }

  if (args[0] === "tr") {
    const err = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(`${lang.lang.err} **[Github](https://github.com/Dev-Span/Discord-Language-Prefix)**`)

    if (language === "tr") return message.channel.send(err)
    db.set(`lang_${message.guild.id}`, "tr")

    const embed = new Discord.MessageEmbed()
      .setColor("#55ff55")
      .setDescription(":flag_tr: Dil `Türkçe` olarak değiştirildi **[Github](https://github.com/Dev-Span/Discord-Language-Prefix)**")
    message.channel.send(embed).then(messageToReact => {
      messageToReact.react("✅");
    })
  }

  }
}