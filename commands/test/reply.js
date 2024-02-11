module.exports = {
    name: "reply",
    description: "Reply command",
    run: async (client, message, args) => {
        message.reply({ content: "This is a reply!" });
    }
}