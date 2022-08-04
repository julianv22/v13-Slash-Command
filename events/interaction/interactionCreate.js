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

      await command.execute(interaction, client);
    } catch (error) {
      console.error(error);
      await interaction.followUp({ content: `Error: ${error}`, ephemeral: true });
    };
  }
}