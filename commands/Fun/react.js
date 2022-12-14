exports.name = "react";
//exports.aliases = [""];
exports.category = "fun";
exports.description = "โคทCool! ๐";
exports.usage = `\`${cfg.prefix}${exports.name}\``;

exports.execute = async (message, args, client) => {
  if (args.join(' ').trim() === '?') return client.cmdGuide(message, exports.name, exports.description, exports.usage);

  let stReact = [
    ["Cool!", "๐"],
    ["Greet!", "๐"],
    ["Perfect!", "๐ฅณ"],
    ["Wonderful!", "๐"],
    ["Amazing!", "๐ฎ"],
    ["Holy!", "๐ฑ"],
  ];
  message.delete();
  const raID = Math.floor(Math.random() * stReact.length);
  const msgReact = await message.channel.send(stReact[raID][0]);
  await msgReact.react(stReact[raID][1]);
}