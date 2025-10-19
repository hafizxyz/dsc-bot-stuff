require('dotenv/config');
const fs = require('fs');
const { Client, GatewayIntentBits } = require('discord.js');
const rotateStatus = require('./utils/status');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.commands = new Map();
const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(f => f.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

client.once('clientReady', () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
    rotateStatus(client, 15000); // 15 seconds
});

client.on('messageCreate', (message) => {
    const prefix = process.env.prefix;
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);
    if (!command) return;

    if (command.ownerOnly && message.author.id !== process.env.BOT_OWNER_ID) {
        return message.reply("😿 You don't have permission to use this command.");
    }

    // Ensure logs folder exists
    if (!fs.existsSync('./logs')) fs.mkdirSync('./logs');

    try {
        command.execute(message, args, client, client.commands);
        
        const timestamp = new Date().toLocaleString();
        const log = `[${timestamp}] ${message.author.username} used: ${prefix}${commandName}\n`;

        fs.appendFile('./logs/command_logs.txt', log, (err) => {
            if (err) console.error('Log error:', err);
        });

    } catch (error) {
        console.error(`Error executing command ${commandName}:`, error);
        message.reply("😿 There was an error executing that command.");

        const timestamp = new Date().toLocaleString();
        const errorLog = `[${timestamp}] Error in command: ${prefix}${commandName}\nUser: ${message.author.username} (${message.author.id})\nError: ${error.message}\n\n`;

        fs.appendFile('./logs/error_log.txt', errorLog, (err) => {
            if (err) console.error('Failed to write error log:', err);
        });
    }
});

client.login(process.env.DISCORD_TOKEN);
