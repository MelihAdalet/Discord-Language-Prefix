const Discord = require('discord.js');
const db = require('quick.db')
const fs = require("fs");

exports.run = async (client, message, args, prefix) => {

  let language = db.fetch(`lang_${message.guild.id}`)
  if (language === null) language = client.config.mainLang
  const lang = require(`../lang/${language}.js`)

  const mg = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(lang.lang.mg)

  const msg = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(lang.lang.msg + `\`${prefix}${lang.lang.msg2}\``)

  if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(mg)
  if (!args[0]) return message.channel.send(msg);


  if (args[0] === "de") {
    const err = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(lang.lang.err)

    if (language === "de") return message.channel.send(err)
    db.set(`lang_${message.guild.id}`, "de")


    const embed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(":flag_de: Die Sprache wurde geändert auf `Deutsch`")
    message.channel.send(embed).then(messageToReact => {
      messageToReact.react("<a:LunaYes:817452322418196535>");
    })
  }

  if (args[0] === "en") {
    const err = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(lang.lang.err)

    if (language === "en") return message.channel.send(err)
    db.set(`lang_${message.guild.id}`, "en")

    const embed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(":flag_us: The language has been changed to `English`")
    message.channel.send(embed).then(messageToReact => {
      messageToReact.react("<a:LunaYes:817452322418196535>");
    })
  }

  if (args[0] === "tr") {
    const err = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(lang.lang.err)

    if (language === "tr") return message.channel.send(err)
    db.set(`lang_${message.guild.id}`, "tr")

    const embed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(":flag_tr: Dil `Türkçe` olarak değiştirildi")
    message.channel.send(embed).then(messageToReact => {
      messageToReact.react("<a:LunaYes:817452322418196535>");
    })
  }

  if (args[0] === "ru") {
    const err = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(lang.lang.err)

    if (language === "ru") return message.channel.send(err)
    db.set(`lang_${message.guild.id}`, "ru")

    const embed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(":flag_ru: Язык изменен на `Pусский`")
    message.channel.send(embed).then(messageToReact => {
      messageToReact.react("<a:LunaYes:817452322418196535>");
    })
  }

  if (args[0] === "es") {
    const err = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(lang.lang.err)

    if (language === "es") return message.channel.send(err)
    db.set(`lang_${message.guild.id}`, "es")

    const embed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(":flag_es: El idioma fue cambiado a `Español`")
    message.channel.send(embed).then(messageToReact => {
      messageToReact.react("<a:LunaYes:817452322418196535>");
    })
  }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'lang'
};