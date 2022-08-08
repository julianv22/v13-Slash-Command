const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setDefaultMemberPermissions(8192)
    .setName('new-embed')
    .setDescription(`Create a simple embed\n${cfg.modRole} only)`)
    .addStringOption(option => option
      .setName('title')
      .setDescription(`Embed's Title`)
      .setRequired(true))
    .addStringOption(option => option
      .setName('description')
      .setDescription(`Embed's Description`)
      .setRequired(true))
    .addStringOption(option => option
      .setName('footer')
      .setDescription(`Embed's Footer`))
    .addAttachmentOption(option => option
      .setName('image')
      .setDescription(`Set Embed's Image`))
    .addAttachmentOption(option => option
      .setName('thumbnail')
      .setDescription(`Set Embed's Thumbnail`)),
  category: "moderator",
  async execute(interaction, client) {
    const user = interaction.user
    const sTitle = interaction.options.getString('title')
    const sDesc = interaction.options.getString('description')
    const sFooter = interaction.options.getString('footer')
    const aImg = interaction.options.getAttachment('image')
    const aThumb = interaction.options.getAttachment('thumbnail')
    const emb = new MessageEmbed()
      .setAuthor(user.username, user.displayAvatarURL(true))
      .setTitle(sTitle)
      .setDescription(sDesc)
      .setTimestamp()
      .setColor(cfg.embedcolor)
      .setFooter(sFooter || interaction.guild.name, interaction.guild.iconURL(true))
    if (aImg) emb.setImage(aImg.url)
    if (aThumb) emb.setThumbnail(aThumb.url)

    await interaction.reply({ embeds: [emb] });
  }
}