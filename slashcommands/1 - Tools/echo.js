const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Replies with your input!')
    .addStringOption(option =>
      option.setName('input')
        .setDescription('The input to echo back')
        .setRequired(true)),
  category: "tools",
  async execute(interaction) {
    const stInput = interaction.options.getString('input');
    await interaction.reply(stInput);
  },
}