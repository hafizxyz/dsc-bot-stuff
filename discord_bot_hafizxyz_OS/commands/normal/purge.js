module.exports = {
    name: 'purge',
    description: 'Deletes a specified number of recent (14 days) messages from the channel',
    execute(message, args) {
        if (!message.member.permissions.has('ManageMessages')) {
            return message.reply("😾 You don't have permission to use this command.");
        }

        const amount = parseInt(args[0]);
        if (isNaN(amount) || amount < 1 || amount > 100) {
            return message.reply("🙀 Please provide a number between 1 and 100.");
        }

        message.channel.messages.fetch({ limit: amount + 1 })
            .then(messages => {
                message.channel.bulkDelete(messages, true)
                    .then(deleted => {
                        const actualDeleted = deleted.has(message.id) ? deleted.size - 1 : deleted.size;

                        message.channel.send(`😼 I have clawed **${actualDeleted}** messages.`)
                            .then(confirm => setTimeout(() => confirm.delete().catch(() => {}), 3000))
                            .catch(() => {});
                    })
                    .catch(() => message.reply("😿 There was an error trying to purge messages."));
            })
            .catch(() => message.reply("😿 There was an error fetching messages."));
    },
};
