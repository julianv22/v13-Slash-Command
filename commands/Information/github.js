const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const fetch = require('node-fetch');

exports.name = "github";
exports.aliases = ["git"];
exports.category = "information";
exports.description = `⤷Thông tin tài khoản Github!\n\nAlias: \`${exports.aliases}\``;
exports.ussage = `${cfg.prefix}${exports.name} <Username>`;

exports.execute = async (message, args, client) => {
  if (args.join(' ').trim() === '?')
    return client.cmdGuide(message, exports.name, exports.description, exports.ussage);

  if (!args[0]) return message.channel.send(`\`\`\`${cfg.x} | Hãy nhập username!\`\`\``);

  fetch(`https://api.github.com/users/${args.join('-')}`)
    .then(res => res.json()).then(body => {
      if (body.message)
        return message.channel.send(`\`\`\`${cfg.x} | Không tìm thấy người dùng, hãy nhập chính xác username!\`\`\``);
      let { login, avatar_url, name, id, html_url, public_repos, followers, following, location, created_at, bio } = body;

      const embed = new MessageEmbed()
        .setAuthor('Githup Information!', avatar_url)
        .setColor(`#211F1F`)
        .setThumbnail(`${avatar_url}`)
        .addField(`Username`, `${login}`, true)
        .addField(`ID`, `${id}`, true)
        .addField(`Bio`, `${bio || "No Bio"}`, true)
        .addField(`Public Repositories`, `${public_repos || "None"}`, true)
        .addField(`Followers`, `${followers}`, true)
        .addField(`Following`, `${following}`, true)
        .addField(`Location`, `${location || "No Location"}`, true)
        .addField(`Account Created`, moment.utc(created_at).format("dddd, MMMM Do - YYYY"), true)
        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL(true))
        .setTimestamp()
      message.channel.send({ embeds: [embed] });
    })
}