const { Client, GatewayIntentBits, Events, Collection } = require('discord.js');
const { token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
//const loadTextCommands = require('./Events/Text');
//const guildCreate = require('./Events/GuildCreate');
//const guildDelete = require('./Events/GuildDelete');
//const refreshConfig = require('./Events/Refresh');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

client.once(Events.ClientReady, (c) => {
  console.log(`Bot - ${c.user.username} Runtime Up`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
      await command.execute(interaction);
  } catch (error) {
      console.error(error);
      await interaction.reply({
          content: 'There was an error while executing this command!',
          ephemeral: true
      });
  }
});

client.login(token);

function getFiles(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  let commandFiles = [];

  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      commandFiles.push(...getFiles(fullPath));
    } else if (file.name.endsWith(".js")) {
      commandFiles.push(fullPath);
    }
  }

  return commandFiles;
}