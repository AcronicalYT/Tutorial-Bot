const { readdirSync } = require('fs');
const path = require('path');
const ascii = require('ascii-table');
let table = new ascii("Commands");
table.setHeading('Command', 'Load Status');

module.exports = async (client) => {
    readdirSync('./commands/').forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
        for(let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);
            if(pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, '✅');
            } else {
                table.addRow(file, '❌ -> Missing help.name, or help.name is not a string!')
                continue;
            }
        }
    });

    console.log(table.toString());
}