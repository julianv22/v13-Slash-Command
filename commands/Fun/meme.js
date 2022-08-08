const { MessageEmbed } = require("discord.js");

exports.name = "meme";
//exports.aliases = [""];
exports.category = "fun";
exports.cooldown = 5;
exports.description = "⤷Gửi một meme!";
exports.usage = `\`${cfg.prefix}${exports.name}\``;

exports.execute = async (message, args, client) => {
  if (args.join(' ').trim() === '?')
    return client.cmdGuide(message, exports.name, exports.description, exports.usage);
  //Start
  const Reds = [
    "memes",
    "me_irl",
    "dankmemes",
    "comedyheaven",
    "Animemes"
  ];

  const Rads = Reds[Math.floor(Math.random() * Reds.length)];
  const res = await fetch(`https://www.reddit.com/r/${Rads}/random/.json`);
  const json = await res.json();

  if (!json[0]) return message.channel.send(`\`\`\`${cfg.x} | Đồn như lời!\`\`\``);

  const data = json[0].data.children[0].data;
  const Embed = new MessageEmbed()
    .setColor(cfg.embedcolor)
    .setURL(`https://reddit.com${data.permalink}`)
    .setTitle(data.title)
    .setDescription(`Tác giả: **${data.author}**`)
    .setImage(data.url)
    .setFooter(`${data.ups || 0} 👍 | ${data.downs || 0} 👎 | ${data.num_comments || 0} 💬`)
    .setTimestamp()
  message.channel.send({ embeds: [Embed] }).then(() => message.delete());
  //End
}
