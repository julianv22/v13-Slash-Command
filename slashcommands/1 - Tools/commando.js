const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("commando")
    .setDescription("Slash Commands (/) List"),
  category: "help",
  async execute(interaction, client) {
    let cmds = [];
    const cmdCategories = await client.slashCommands.map((cmd) => cmd.category);
    const catFilter = await cmdCategories.filter(
      (item, index) => cmdCategories.indexOf(item) === index
    );

    for (const cat of catFilter) {
      const cmd = await client.slashCommands
        .map((cmd) => cmd)
        .filter((cmd) => cmd.category === cat);
      cmds.push({
        name: `${cfg.folder} ${cat.toUpperCase()} [${cmd.length}]`,
        value: `\`\`\`${cmd.map((cmd) => cmd.data.name).join(" | ")}\`\`\``,
      });
    }

    const embed = new MessageEmbed()
      .setAuthor(
        interaction.member.user.username,
        interaction.member.user.displayAvatarURL(true)
      )
      .setTitle("Slash Command (/) List:")
      .setFooter(interaction.guild.name, interaction.guild.iconURL(true))
      .setTimestamp()
      .setColor(cfg.embedcolor)
      .addField(`Total comands: [${cmdCategories.length}]`, `\u200b`)
      .addFields(cmds)
      .setDescription(
        `I you need some help, join my support server: [\`🎭〔J-V Bot〕 SUPPORT\`](https://discord.gg/dyd8DXbrVq)`
      )
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/976364997066231828/1001524699941064745/slash.png"
      );

    interaction.reply({ embeds: [embed] });
  },
};
