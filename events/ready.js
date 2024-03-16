const client = require('../index.js');
const { Events, ActivityType } = require('discord.js');
const express = require('express');
const app = express();
const port = 22567;

client.once(Events.ClientReady, clientReady => {
    // clientReady.user.setActivity(`over ${clientReady.guilds.cache.size} servers`, { type: ActivityType.Watching });
    // clientReady.user.setStatus('dnd');

    app.get('/', (req, res) => {
        res.status(200).send('Tutorial Bot is online!');
    });

    app.listen(port, () => {
        console.log(`Tutorial bot is listening at http://localhost:${port}`);
    });

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