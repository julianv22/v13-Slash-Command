const { MessageEmbed } = require("discord.js");

exports.name = "kiss";
//exports.aliases = [""];
exports.description = "⤷👄";
exports.ussage = `**Trao hụ hôn thắm thiết cho người bạn thương 😘**
\`${cfg.prefix}${exports.name} @tên thành viên\``;

exports.execute = async (message, args, client) => {
  if (args.join(' ').trim() === '?') return client.cmdGuide(message, exports.name, '', exports.ussage);

  let user = message.mentions.members.first();
  if (!user)
    return message.reply(`\`\`\`❌ | Bạn phải @ đến một ai đó!\`\`\``);

  if (user.id === message.author.id)
    return message.reply(`\`\`\`❌ | Đừng có tự sướng thế chứ 🤣\`\`\``);

  let kissing = [
    "https://c.tenor.com/hK8IUmweJWAAAAAC/kiss-me-%D0%BB%D1%8E%D0%B1%D0%BB%D1%8E.gif",
    "https://cdn.myanimelist.net/s/common/uploaded_files/1483589602-6b6484adddd5d3e70b9eaaaccdf6867e.gif",
    "https://c.tenor.com/I8kWjuAtX-QAAAAM/anime-ano.gif",
    "https://i.pinimg.com/originals/58/bd/29/58bd29ff879af961e41e7f7096f5c0aa.gif",
    "https://thumbs.gfycat.com/HopefulFabulousKouprey-max-1mb.gif",
    "https://data.whicdn.com/images/106742359/original.gif",
    "https://acegif.com/wp-content/uploads/anime-kissin-3.gif",
    "https://c.tenor.com/Aaxuq2evHe8AAAAM/kiss-cute.gif",
    "https://cutewallpaper.org/21/cute-anime-kiss/Anime-Cute-GIF-Anime-Cute-Kiss-Discover-and-Share-GIFs.gif",
    "https://media4.giphy.com/media/11GnTlz9rJ07Mk/giphy.gif",
    "https://cutewallpaper.org/21/kiss-anime-pictures/forehead-kiss-anime-Album-on-Imgur.gif",
    "https://cdn.myanimelist.net/s/common/uploaded_files/1483589646-9c8cd327454990f5da24af7d3f057627.gif",
    "http://37.media.tumblr.com/b12bd032e97037081108f993aadcae62/tumblr_mwo343m7tK1sv72vno1_500.gif",
    "https://aniyuki.com/wp-content/uploads/2021/07/aniyuki-anime-gif-kiss-85.gif",
    "https://i.pinimg.com/originals/6e/2f/e9/6e2fe9073f4e6aa4080e2e9ab5e3f790.gif",
    "https://thumbs.gfycat.com/PreciousSharpBuffalo-size_restricted.gif",
    "https://cutewallpaper.org/21/anime-passionate-kiss/Anime-Scums-Wish-GIF-Anime-ScumsWish-Passionate-Discover-Share-GIFs.gif",
  ];

  let embed = new MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`👄 **|** **${message.author}** *kissed*  **${user}**`)
    .setImage(`${kissing[Math.floor(Math.random() * kissing.length)]}`)
    .setFooter(`👀`)
  message.delete().then(() => message.channel.send({ embeds: [embed] }));
}