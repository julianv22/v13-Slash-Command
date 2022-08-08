const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Help command!'),
  category: "help",
  async execute(interaction, client) {
    const user = interaction.user;    
    let cmds = [];
    const cmdCategories = await client.commands.map(cmd => cmd.category)
    const catFilter = await cmdCategories.filter((item, index) => cmdCategories.indexOf(item) === index)

    for (const cat of catFilter) {
      const cmd = await client.commands.map(cmd => cmd).filter(cmd => cmd.category === cat);
      cmds.push({
        name: `${cfg.folder} ${cat.toUpperCase()} [${cmd.length}]`,
        value: `\`\`\`${cmd.map(cmd => cmd.name).join(' | ')}\`\`\``
      })
    };

    const embed = new MessageEmbed()
      .setAuthor(`Hello ${user.tag}!`, user.displayAvatarURL(true))
      .setTitle('There is some commands may be you need!')
      .setDescription(`I you need some help, join my support server: [\`🎭〔J-V Bot〕 SUPPORT\`](https://discord.gg/dyd8DXbrVq)`)
      .setColor("RANDOM")
      .setThumbnail(cfg.helpPNG)
      .addField(`Total comands: [${client.commands.size}]`, `\u200b\nCommand prefix: \`${cfg.prefix}\``)
      .addFields(cmds)
      .addField(`\u200b`, `\`${cfg.prefix}[command] ?\` to show more help about that command.`)
      .setFooter(interaction.guild.name, interaction.guild.iconURL(true))
      .setTimestamp()

    await interaction.reply({ embeds: [embed] });
  },
}