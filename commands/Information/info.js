const { MessageEmbed } = require("discord.js");

exports.name = "info";
exports.aliases = ["serverinfo", "inf"];
exports.category = "information";
exports.description = `⤷Alias: \`${exports.aliases}\``;
exports.ussage = `**Xem thông tin server:**
\`${cfg.prefix}${exports.aliases[0]}\`
\n**Xem thông tin của thành viên:**
\`${cfg.prefix}${exports.name} @tên thành viên\``;

exports.execute = async (message, args, client) => {
  const msg = args.join(' ');
  if (msg.trim() === '?') return client.cmdGuide(message, exports.name, exports.description, exports.ussage);

  if (!msg) {
    let guild = message.guild;
    let members = guild.memberCount;
    let bots = message.guild.members.cache.filter((bot) => bot.user.bot).size;
    let channels = guild.channels.cache.filter(r => r.type === "GUILD_TEXT").size;
    let voices = guild.channels.cache.filter(r => r.type === "GUILD_VOICE").size;
    var embed = new MessageEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL(true))
      .setTitle("Server Info")
      .setColor(cfg.embedcolor)
      .setFooter(`Requested by ${message.member.user.tag}`, `${message.member.displayAvatarURL(true)}`)
      .setTimestamp()
      .setThumbnail(guild.iconURL(true))
      .addFields(
        { name: 'Server Name', value: `${guild.name}`, inline: true },
        { name: 'Server ID', value: `${guild.id}`, inline: true },
        { name: 'Server Owner', value: `${guild.ownerID}`, inline: true },
        { name: 'Total Members', value: `${members} Members\n${bots} Bots`, inline: true },
        { name: 'Total Roles', value: `${guild.roles.cache.size}`, inline: true },
        { name: 'Total Channels', value: `${channels} Text\n${voices} Voice`, inline: true },
        { name: 'Server Region', value: `${guild.region}`, inline: true },
        { name: 'Verification Level', value: `${guild.verificationLevel}`, inline: true },
        { name: 'Created in', value: `${guild.createdAt.toLocaleString()}`, inline: true },
        { name: 'Total Boosts', value: `${guild.premiumSubscriptionCount}`, inline: true },
      )
    message.reply({ embeds: [embed] });
  } else {
    if (!message.mentions.members.first()) return message.reply(`\`\`\`${cfg.x} | Bạn phải @ đến một thành viên!\`\`\``);

    var permissions = [];
    var acknowledgements = "";
    const member = message.mentions.members.first() || message.member || message.guild.members.cache.get(args[0]);
    if (member.id === message.guild.ownerId) acknowledgements = "Server Owner";
    if (member.premiumSince) {
      // If there was an acknowledgement, add a comma
      if (acknowledgements.length > 0) acknowledgements += ", Server Booster"
      else acknowledgements = "Server Booster"
    }
    // If no acknowledgement, set it to None
    if (!acknowledgements) acknowledgements = "None";

    const embed = new MessageEmbed()
      .setTitle("Member Info")
      .setDescription(`**Name:** ${member}`)
      .setAuthor({
        name: member.user.tag,
        iconURL: member.displayAvatarURL(true),
      })
      .setColor(cfg.embedcolor)
      .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL(true))
      .setThumbnail(member.displayAvatarURL(true))
      .setTimestamp()
      .setThumbnail(member.displayAvatarURL(true))
      .addFields(
        { name: 'Joined at:', value: `${moment(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm")}`, inline: true },
        { name: 'Created at:', value: `${moment(message.author.createdAt).format("dddd, MMMM Do YYYY, HH:mm")}`, inline: true },
        { name: 'User ID', value: `${member.user.id}`, inline: true },
        { name: 'Acknowledgements', value: `${acknowledgements}`, inline: true },
        {
          name: `Roles [${member.roles.cache
            .filter((r) => r.id !== message.guild.id)
            .map((roles) => `\`${roles.name}\``).length
            }]`,
          value: `${member.roles.cache
            .filter((r) => r.id !== message.guild.id)
            .map((roles) => `<@&${roles.id}>`)
            .join(' ') || "No Roles"
            }`
        },
      )
    message.reply({ embeds: [embed] });
  }
}