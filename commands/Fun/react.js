exports.name = "react";
//exports.aliases = [""]
exports.description = "⤷Cool! 😎";
exports.ussage = `\`${cfg.prefix}${exports.name}\``;

exports.execute = async (message, args, client) => {
  if (args.join(' ').trim() === '?') return client.cmdGuide(message, exports.name, exports.description, exports.ussage);

  let stReact = [
    ["Cool!", "😎"],
    ["Greet!", "👍"],
    ["Perfect!", "🥳"],
    ["Wonderful!", "😍"],
    ["Amazing!", "😮"],
    ["Holy!", "😱"],
  ];
  message.delete();
  const raID = Math.floor(Math.random() * stReact.length);
  const msgReact = await message.channel.send(stReact[raID][0]);
  await msgReact.react(stReact[raID][1]);
}