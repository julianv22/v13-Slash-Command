const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder().setName("link").setDescription("Link 🔞"),
  category: "information",
  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true,
    });

    const imgURL =
      "https://media.discordapp.net/attachments/976364997066231828/997976998527914124/Header.png";
    const emArr = [
      "Link",
      "Dưới dây là các liên kết bạn có thể cần",
      `${client.user.username
      } is working in [${client.guilds.cache.size.toLocaleString()}] servers`,
      interaction.guild.iconURL(true),
      imgURL,
      `Server hỗ trợ ^ [${cfg.supportServer} Server](https://discord.gg/dyd8DXbrVq) # Link mời ^ [Invite me (recommended)](${cfg.inviteLink})\n\n[Invite me (admin)](https://shorturl.ae/WnzIo) # Chủ sở hữu ^ [YouTube](${cfg.youtube})`,
    ];

    interaction.editReply({
      content: "Owner Discord: https://discord.gg/24GPY9CmY4",
      embeds: client.genEmbed(message, emArr),
    });
  },
};
