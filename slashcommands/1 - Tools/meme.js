const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('meme')
    .setDescription('Replies with a meme!'),
  category: "funny",
  cooldown: 10,
  async execute(interaction) {
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
      .setColor(cfg.embedcorlor)
      .setURL(`https://reddit.com${data.permalink}`)
      .setTitle(data.title)
      .setDescription(`Tác giả: **${data.author}**`)
      .setImage(data.url)
      .setFooter(`${data.ups || 0} 👍 | ${data.downs || 0} 👎 | ${data.num_comments || 0} 💬`)
      .setTimestamp()

    await interaction.reply({ embeds: [Embed] });
    //End
  },
}