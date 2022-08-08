const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("commando")
    .setDescription("Slash Commands (/) List"),
  category: "help",
  async execute(interaction, client) {
    const cmdCategories = await client.slashCommands.map((cmd) => cmd.category);
    const catFilter = await cmdCategories.filter(
      (item, index) => cmdCategories.indexOf(item) === index
    );

    const embed = new MessageEmbed()
      .setAuthor(interaction.user.username, interaction.user.displayAvatarURL(true))
      .setTitle("Slash Command (/) List:")
      .addField(`Total comands: [${cmdCategories.length}]`, `\u200b`)
      .setFooter(interaction.guild.name, interaction.guild.iconURL(true))
      .setTimestamp()
      .setColor(cfg.embedcolor)
      .setDescription(`I you need some help, join my support server: [\`🦸〔J-V Bot〕 SUPPORT\`](https://discord.gg/dyd8DXbrVq)`)
      .setThumbnail("https://cdn.discordapp.com/attachments/976364997066231828/1001524699941064745/slash.png");

    for (const cat of catFilter) {
      const commands = await client.slashCommands
        .map((cmd) => cmd)
        .filter((cmd) => cmd.category === cat);
      const cmds = await commands
        .map((cmd) => {
          return `⤷[${cmd.data.name}]⟶ ${cmd.data.description}`;
        })
        .join("\n");

      embed.addField(
        `${cfg.folder} ${cat.toUpperCase()} [${commands.length}]`,
        `\`\`\`${cmds}\`\`\``
      );
      continue;
    }
    interaction.reply({ embeds: [embed] });
  },
};
