const { Client, GatewayIntentBits, Collection } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] });
const { token } = require('./config.json');

client.commands = new Collection();
client.events = new Collection();
module.exports = client;

["command", "event"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.login(token);