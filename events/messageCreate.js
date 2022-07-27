module.exports = {
  name: 'messageCreate',
  async execute(message, client) {
    try {
      if (message.channel.type === 'DM') return;
      if (message.author.bot) return;
      if (!message.content.startsWith(cfg.prefix)) return;

      // Check Bot Permissions 
      const botPermission = "SEND_MESSAGES" && "MANAGE_MESSAGES" && "EMBED_LINKS" && "ADD_REACTIONS";
      // const isAdmin = message.member.permissions.has("ADMINISTRATOR");
      if (!message.channel.permissionsFor(cfg.botID).toArray().includes(botPermission))
        return console.log("\n\n-----------Bot CANT send message!!-----------\n\n");

      const args = message.content.slice(cfg.prefix.length).split(/ +/);
      const cmdName = args.shift().toLowerCase();
      const command =
        client.commands.get(cmdName) ||
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));

      if (!command) return message.reply(`\`\`\`❌ | Command [${cmdName}] không chính xác hoặc không tồn tại!\`\`\``);

      await command.execute(message, args, client);
    } catch (error) {
      console.error(error);
    };
  }
}