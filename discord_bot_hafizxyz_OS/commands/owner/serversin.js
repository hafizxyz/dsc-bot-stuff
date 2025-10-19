const { AttachmentBuilder } = require('discord.js');

module.exports = {
    name: 'serversin',
    description: 'List all servers bot is in.',
    ownerOnly: true,
    execute(message, args, client) {
        if (message.author.id !== process.env.BOT_OWNER_ID) {
            return message.reply("😼 nuh uh. GET OUT");
        }

        const guilds = client.guilds.cache.map(g => `${g.name} (ID: ${g.id})`);
        if (!guilds.length) return message.reply("😿 I'm not in any servers.");

        const buffer = Buffer.from(`I'm in ${guilds.length} servers:\n${guilds.join('\n')}`, 'utf-8');
        const file = new AttachmentBuilder(buffer, { name: 'servers.txt' });

        message.author.send({ content: "Here's the list of servers I'm in:", files: [file] })
            .then(() => message.reply("😸 I've sent you a DM with the list of servers."))
            .catch(() => message.reply("😿 I couldn't DM you, maybe your DMs are closed."));
    },
};
