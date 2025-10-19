const { ActivityType } = require('discord.js');

const statuses = [
    (client) => `;help for list of commands`,
    () => `hafizxyz made this bot code`,
    () => `hafizxyz made this bot code`,
    () => `hafizxyz made this bot code`,
    () => `hafizxyz made this bot code`,
];

function rotateStatus(client, interval = 15000) {
    let i = 0;

    const updatePresence = () => {
        try {
            const statusMessage = statuses[i % statuses.length](client);
            client.user.setPresence({
                activities: [{ name: statusMessage, type: ActivityType.Playing }],
                status: 'online',
            });
        } catch (error) {
            console.error('Error setting bot presence:', error);
        }

        i++;
    };

    updatePresence();
    setInterval(updatePresence, interval);
}

module.exports = rotateStatus;
