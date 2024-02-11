const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "help",
    description: "The help command",
    run: async (client, message, args) => {
        const embed = new EmbedBuilder()
            .setTitle("Help!")
            .addFields(
                { name: "!help", value: "Provides help for all commands." },
                { name: "!ping", value: "A test command." },
                { name: "!reply", value: "A command to test replies." }
            );
        message.channel.send({ embeds: [embed] });
    }
}