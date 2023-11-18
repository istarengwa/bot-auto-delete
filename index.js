require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageTyping
    ]
});

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
//const ALLOWED_CHANNEL_ID = process.env.ALLOWED_CHANNEL_ID;

client.once('ready', async () => {
    console.log('Bot is ready!');
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;
    //if (message.channel.id !== ALLOWED_CHANNEL_ID) return;

    const inviteCodeRegex = /\b[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}\b/;
    if (inviteCodeRegex.test(message.content)) {
        try {
            await message.delete();
            const warningEmbed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('Invitation Code Detected')
                .setDescription(`${message.author}, sharing invite codes in this server is not allowed, thank you.`)
                .setTimestamp();

            try {
                await message.author.send({ embeds: [warningEmbed] });
            } catch (error) {
                message.channel.send({ embeds: [warningEmbed] });
            }
        } catch (error) {
            console.error("Error while deleting the message or sending the warning message:", error);
        }
    } else {
        console.log(`Message received from ${message.author.tag}: ${message.content}`);
    }
});

client.login(DISCORD_BOT_TOKEN);