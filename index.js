const { Client, GatewayIntentBits, Events, ActivityType } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] });
const { token } = require('./config.json');

client.once(Events.ClientReady, clientReady => {
    // clientReady.user.setActivity(`over ${clientReady.guilds.cache.size} servers`, { type: ActivityType.Watching });
    // clientReady.user.setStatus('dnd');

    const activities = [
        `over ${clientReady.guilds.cache.size} servers`,
        `over ${clientReady.users.cache.size} users`,
        `over ${clientReady.channels.cache.size} channels`,
        `for !ping`
    ]

    setInterval(() => {
        const index = Math.floor(Math.random() * (activities.length - 1) + 1);
        clientReady.user.setActivity(activities[index], { type: ActivityType.Watching });
    }, 5000);

    console.log(`Logged in as ${clientReady.user.tag}!`);
});

client.on(Events.MessageCreate, (message) => {
    if(message.author.bot) return;

    if(message.content === '!ping') {
        message.channel.send('Pong.');
    }
});

client.login(token);