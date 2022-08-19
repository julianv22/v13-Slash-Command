const { MessageEmbed, MessageButton } = require("discord.js");
const {
  InteractionPagination,
  NextPageButton,
  PreviousPageButton,
  StopButton,
  FirstPageButton,
  LastPageButton,
} = require("djs-button-pages");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("commando")
    .setDescription("Return Slash (/) Commands List"),
  category: "help",
  async execute(interaction, client) {
    const isAdmin = interaction.member.permissions.has("ADMINISTRATOR");

    const cmdCategories = await client.slashCommands.map((cmd) => cmd.category);
    const catFilter = await cmdCategories.filter(
      (item, index) => cmdCategories.indexOf(item) === index
    );

    let pages = [];
    catFilter.forEach((cat) => {
      const commands = client.slashCommands.map((cmd) => cmd).filter((cmd) => cmd.category === cat);

      const cmds = commands.map((cmd) => {
        if (isAdmin) {
          return { name: cmd.data.name, value: `⤷${cmd.data.description}`, inline: true };
        } else {
          if (!cmd.data.description.includes(cfg.adminRole))
            return { name: cmd.data.name, value: `⤷${cmd.data.description}`, inline: true };
        }
      });

      const embed = new MessageEmbed()
        .setAuthor(interaction.user.username, interaction.user.displayAvatarURL(true))
        .setTitle("Slash Commands (/) List")
        .setDescription(`I you need some help, join my support server: [\`🎭〔J-V Bot〕 SUPPORT\`](https://discord.gg/dyd8DXbrVq)`)
        .setColor("AQUA")
        .setThumbnail("https://cdn.discordapp.com/attachments/976364997066231828/1001524699941064745/slash.png")
        .setFooter(interaction.guild.name, interaction.guild.iconURL(true))
        .setTimestamp()
        .addField(`${cfg.folder} ${cat.toUpperCase()} [${commands.length}]`, `\u200b`)
        .addFields(cmds.filter((cmd) => cmd != undefined));

      pages.push(embed);
    });

    const buttons = [
      new FirstPageButton(new MessageButton().setCustomId("first").setLabel("◀◀").setStyle("SUCCESS")),
      new PreviousPageButton(new MessageButton().setCustomId("prev").setLabel("◀").setStyle("PRIMARY")),
      new StopButton(new MessageButton().setCustomId("stop").setLabel("❌").setStyle("DANGER")),
      new NextPageButton(new MessageButton().setCustomId("next").setLabel("▶").setStyle("PRIMARY")),
      new LastPageButton(new MessageButton().setCustomId("last").setLabel("▶▶").setStyle("SUCCESS")),
    ];

    const pagination = new InteractionPagination()
      .setButtons(buttons)
      .setEmbeds(pages)
      .setTime(60 * 1000);
    await pagination.send(interaction);
  },
};
