module.exports = {
    name: 'uptime',
    description: 'Shows how long the bot has been running.',
    execute(message, args, client) {
        const totalSeconds = Math.floor(client.uptime / 1000);

        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        let uptimeString = '';
        if (days) uptimeString += `${days}d `;
        if (hours) uptimeString += `${hours}h `;
        if (minutes) uptimeString += `${minutes}m `;
        uptimeString += `${seconds}s`;

        message.reply(`😸 I've been running for: **${uptimeString}**`);
    },
};