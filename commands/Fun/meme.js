const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const Color = `RANDOM`;
const Fetch = require("node-fetch"); //Install Node-fetch - npm i node-fetch

exports.name = "meme";
//exports.aliases = [""];
exports.category = "fun";
exports.description = "⤷Gửi một meme!";
exports.ussage = `\`${cfg.prefix}${exports.name}\``;

exports.execute = async (message, args, client) => {
  if (args.join(' ').trim() === '?')
    return client.cmdGuide(message, exports.name, exports.description, exports.ussage);
  //Start
  const Reds = [
    "memes",
    "me_irl",
    "dankmemes",
    "comedyheaven",
    "Animemes"
  ];

  const Rads = Reds[Math.floor(Math.random() * Reds.length)];
  const res = await Fetch(`https://www.reddit.com/r/${Rads}/random/.json`);
  const json = await res.json();

  if (!json[0]) return message.channel.send(`\`\`\`"Đồn như lời!\`\`\``);

  const data = json[0].data.children[0].data;
  const Embed = new MessageEmbed()
    .setColor(Color)
    .setURL(`https://reddit.com${data.permalink}`)
    .setTitle(data.title)
    .setDescription(`Tác giả: **${data.author}**`)
    .setImage(data.url)
    .setFooter(`${data.ups || 0} 👍 | ${data.downs || 0} 👎 | ${data.num_comments || 0} 💬`)
    .setTimestamp()
  message.channel.send({ embeds: [Embed] }).then(() => message.delete());
  //End
}
