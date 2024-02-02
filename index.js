const { Client, GatewayIntentBits, Events } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] });
const { token } = require('./config.json');

client.once(Events.ClientReady, clientReady => {
    console.log(`Logged in as ${clientReady.user.tag}!`);
});

client.on(Events.MessageCreate, (message) => {
    if(message.author.bot) return;

    if(message.content === '!ping') {
        message.channel.send('Pong.');
    }
});

client.login(token);