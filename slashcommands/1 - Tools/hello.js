const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Replies with Hello!')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Which user do you want to say hello')),
  category: "tools",
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user
    await interaction.reply(`Hello ${user}!`);
    await wait(3000);
    await interaction.followUp('Have a good day!');
  },
}