module.exports = (client) => {
  client.genEmbed = function genEmbed(message, args) {
    function addFields(name, value, inline) {
      this.name = name
      this.value = value
      if (inline) {
        this.inline = false
      } else {
        this.inline = true
      }
    };

    try {
      const user = message.author
      let res = [{
        author: { // Set Author
          name: user.username,
          icon_url: user.displayAvatarURL(true)
        },
        title: args[0], // Set Tittle
        description: args[1], // Set Description
        color: cfg.embedcolor, // Set Color
        timestamp: new Date(), // Set Timestamp      
      }]
      if (args[2]) res[0].footer = { // Set Footer
        text: args[2],
        icon_url: message.guild.iconURL(true),
      }
      if (client.checkURL(args[3])) res[0].thumbnail = { // Set Thumbnail
        url: args[3]
      }
      if (client.checkURL(args[4])) res[0].image = { //Set ImageURL
        url: args[4]
      }
      if (args[5]) { // addFields
        const arrays = args[5].split(' # ')
        const fields = arrays.map(f => f.split(' ^ '))
        let objFields = []
        for (const field of fields) {
          const f = new addFields(field[0], field[1], field[2])
          objFields.push(f)
        }
        res[0].fields = objFields
      }
      return res
    } catch (e) {
      console.error(chalk.yellow("genEmbed: "), e)
    }
  };
}