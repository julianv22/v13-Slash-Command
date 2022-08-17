const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Ping pong!'),
  category: "information",
  async execute(interaction, client) {
    const ping = client.ws.ping;
    const delay = Date.now() - interaction.createdTimestamp;
    let color = 'RANDOM';

    if (ping < 101) color = 'GREEN'
    else if (ping > 100 && ping < 301) color = 'ORANGE'
    else color = 'RED'

    const embed = new MessageEmbed()
      .setColor(color)
      .setDescription(`**⏱ | Ping:** ${ping} / *${delay}ms*`)

    await interaction.reply({ embeds: [embed] });
  }
}