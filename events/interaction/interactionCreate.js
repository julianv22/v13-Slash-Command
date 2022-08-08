const { Collection } = require("discord.js");

module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    try {
      if (!interaction.isCommand()) return;

      const { slashCommands } = client;
      const { commandName } = interaction;
      const command = slashCommands.get(commandName);

      if (!command) return;
      if (command.permission && command.permission.length > 0)
        return interaction.reply({
          content: `\`\`\`❌ | You do not have permission to use this command!\`\`\``,
          ephemeral: true
        });

      // Start Command Cooldown
      if (!client.cooldowns.has(command.data.name))
        client.cooldowns.set(command.data.name, new Collection());

      const now = Date.now();
      const timeStamp = client.cooldowns.get(command.data.name);
      const amount = (command.cooldown || 5) * 1000;

      if (timeStamp.has(interaction.user.id)) {
        const exprTime = timeStamp.get(interaction.user.id) + amount;
        if (now < exprTime) {
          const timeLeft = (exprTime - now) / 1000;
          return interaction.reply({
            content: `\`\`\`❌ | Tôi mệt rồi! Vui lòng chờ ${timeLeft.toFixed(1)}s để sử dụng tiếp command [${command.data.name}]\`\`\``,
            ephemeral: true,
          });
        }
      }

      timeStamp.set(interaction.user.id, now);
      setTimeout(() => timeStamp.delete(interaction.user.id), amount);
      // End Command Colldown

      await command.execute(interaction, client);
    } catch (error) {
      console.error(error);
      return await interaction.reply({ content: `Error: ${error}`, ephemeral: true });
    };
  }
}