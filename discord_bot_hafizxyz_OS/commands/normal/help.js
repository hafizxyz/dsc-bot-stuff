const { EmbedBuilder } = require('discord.js');
const prefix = process.env.prefix;

module.exports = {
    name: 'help',
    description: 'Lists all available commands.',
    execute(message, args, client, commands) {
        const publicCommands = [];
        const ownerCommands = [];

        for (const cmd of commands.values()) {
            const line = `\`${prefix}${cmd.name}\` — ${cmd.description || 'No description'}`;
            if (cmd.ownerOnly) ownerCommands.push(line);
            else publicCommands.push(line);
        }

        const embed = new EmbedBuilder()
            .setColor(0x00FFFF)
            .setTitle('🐱 Command List')
            .setDescription('Here are all available commands!')
            .addFields(
                {
                    name: 'Normal Commands',
                    value: publicCommands.join('\n') || '*(None)*',
                    inline: false,
                },
                {
                    name: 'Owner-Only Commands',
                    value: ownerCommands.join('\n') || '*(None)*',
                    inline: false,
                },
            )
            .setFooter({ text: `Prefix: ${prefix}` })
            .setTimestamp();

        message.reply({ embeds: [embed] });
    },
};
