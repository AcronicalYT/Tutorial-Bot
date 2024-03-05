const client = require('../index.js');
const { Events } = require('discord.js');

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