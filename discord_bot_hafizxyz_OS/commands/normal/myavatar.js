const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'myavatar',
    description: "Shows user's PFP.",
    execute(message, args) {
        const user = message.mentions.users.first() || message.author;
        const embed = new EmbedBuilder()
            .setTitle(`${user.username}'s avatar`)
            .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setColor(0x00FFFF);

        message.reply({ embeds: [embed] });
    },
};
