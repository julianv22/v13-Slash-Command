const serverThanks = require("../../mongodb/thanksProfile");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("thanks")
    .setDescription("Give thank to a member!")
    .addUserOption((opt) =>
      opt.setName("user").setDescription("Provide user you wanna thanks!").setRequired(true)
    ),
  category: "tools",
  cooldown: 30,
  async execute(interaction, client) {
    const user = interaction.options.getUser("user");
    const guild = interaction.guild;
    const imgURL = [
      "https://cdn.discordapp.com/attachments/976364997066231828/987822146279587850/unknown.png",
      "https://media.discordapp.net/attachments/976364997066231828/988317420106174484/unknown.png",
      "https://cdn.discordapp.com/attachments/976364997066231828/988317854610907136/unknown.png",
      "https://cdn.discordapp.com/attachments/976364997066231828/988318049616670740/unknown.png",
      "https://media.discordapp.net/attachments/976364997066231828/988318184018960464/unknown.png",
      "https://cdn.discordapp.com/attachments/976364997066231828/988318415037005904/unknown.png",
      "https://cdn.discordapp.com/attachments/976364997066231828/988318803664445530/unknown.png",
      "https://www.ketoan.vn/wp-content/uploads/2020/12/thank.jpg",
      "https://img.freepik.com/free-vector/thank-you-neon-sign-design-template-neon-sign_77399-331.jpg",
      "https://i.pinimg.com/originals/7b/d9/46/7bd946c65b8aa3654236e6f5cb7fa0fd.gif",
      "https://2.bp.blogspot.com/-83klB_SGIfA/VpyvOosaHyI/AAAAAAAASJI/ol3l6ADeLc0/s1600/Hinh-anh-cam-on-thank-you-dep-nhat-Ohaylam.com-%25283%2529.jpg",
      "https://png.pngtree.com/thumb_back/fw800/background/20201020/pngtree-rose-thank-you-background-image_425104.jpg",
    ];

    if (user.bot)
      return interaction.reply({
        content: `\`\`\`❌ | Bot does not need to thanks 😝!\`\`\``,
        ephemeral: true,
      });

    if (user.id === interaction.user.id)
      return interaction.reply({
        content: `\`\`\`❌ | You can not thanks yourself 😅!\`\`\``,
        ephemeral: true,
      });

    const dateNow = moment(Date.now()).tz('Asia/Ho_Chi_Minh').format("HH:mm, dddd - DD/MM/YYYY")

    const thanksCount = await serverThanks.findOne({ guildID: guild.id, userID: user.id, });
    if (!thanksCount) {
      let createOne = await serverThanks.create({
        guildID: guild.id,
        guildName: guild.name,
        userID: user.id,
        usertag: user.tag,
        count: 1,
        lastThanks: Date.now(),
      });
      createOne.save();
    }

    let lastThanks;
    if (thanksCount?.lastThanks) lastThanks = thanksCount?.lastThanks
    else lastThanks = dateNow

    const embed = new MessageEmbed()
      .setAuthor({
        name: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL(true),
      })
      .setTitle("💖 | Special thanks!")
      .setDescription(`${interaction.user} special thanks to ${user}!`)
      .addField(`Thanks count: [${thanksCount?.count + 1 || 1}]`, `\u200b`, true)
      .addField("Last thanks:", lastThanks, true)
      .setFooter({
        text: `Use /thanks to thank someone`,
        iconURL: guild.iconURL(true),
      })
      .setTimestamp()
      .setColor(cfg.embedcolor)
      .setImage(`${imgURL[Math.floor(Math.random() * imgURL.length)]}`);

    interaction.reply({ embeds: [embed] });

    // Update thanksCount
    await serverThanks.findOneAndUpdate(
      {
        guildID: guild.id,
        userID: user.id,
      },
      {
        guildName: guild.name,
        usertag: user.tag,
        count: thanksCount?.count + 1 || 1,
        lastThanks: dateNow,
      }
    );
  },
};
