const { MessageButton } = require("discord.js");
const {
  InteractionPagination, // InteractionPagination
  ChannelPagination, // ChannelPagination
  MessageReplyPagination, // ReplyPagination
  NextPageButton,
  PreviousPageButton,
  StopButton,
  FirstPageButton,
  LastPageButton,
} = require("djs-button-pages");

module.exports = (client) => {
  client.djsButtonPages = async (pages, method, message, interaction, ephemeral) => {
    try {
      const buttons = [
        new FirstPageButton(new MessageButton().setCustomId("first").setLabel("◀◀").setStyle("SUCCESS")),
        new PreviousPageButton(new MessageButton().setCustomId("prev").setLabel("◀").setStyle("PRIMARY")),
        new StopButton(new MessageButton().setCustomId("stop").setLabel("❌").setStyle("DANGER")),
        new NextPageButton(new MessageButton().setCustomId("next").setLabel("▶").setStyle("PRIMARY")),
        new LastPageButton(new MessageButton().setCustomId("last").setLabel("▶▶").setStyle("SUCCESS")),
      ];

      const pagination = new method()
        .setButtons(buttons)
        .setEmbeds(pages)
        .setTime(5 * 60 * 1000);
      if (ephemeral) pagination.setMessageOptions({ ephemeral: true });

      if (message) await pagination.send(message);
      else if (interaction) await pagination.send(interaction);
    } catch (e) {
      console.error(chalk.yellow("djsButtonPages"), e);
    }
  };
};
