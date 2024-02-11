const { Client, GatewayIntentBits, Events, ActivityType, EmbedBuilder, Collection } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] });
const { token } = require('./config.json');

client.commands = new Collection();
module.exports = client;

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

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
    if(!message.content.startsWith('!')) return;
    message.content.split("!");

    const args = message.content.slice("!".length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    let command = client.commands.get(cmd);
    if(command) {
        command.run(client, message, args);
    }
});

client.login(token);