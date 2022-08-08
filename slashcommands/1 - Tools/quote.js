const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('cross-fetch');
const { MessageEmbed } = require("discord.js")

function getQuote() {
  return fetch("https://zenquotes.io/api/random")
    .then(res => {
      return res.json();
    })
    .then(data => {
      return "❝ **" + data[0]["q"] + "** ❞\n\n- " + data[0]["a"] + " -";
    })
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('quote')
    .setDescription('Replies with a quote from https://zenquotes.io'),
  category: "tools",
  cooldown: 10,
  async execute(interaction) {
    const message = await interaction.deferReply({
      fetchReply: true
    });
    getQuote().then(quote => {
      const user = interaction.user
      const embed = new MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL(true))
        .setDescription(quote)
        .setColor(cfg.embedcolor)
        .setThumbnail(cfg.thumbnailURL)
        .setFooter(`Requested by ${user.username}`, user.displayAvatarURL(true))
        .setTimestamp()

      interaction.editReply({ embeds: [embed] });
    });
  }
}