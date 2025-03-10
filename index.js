const { Client, Events, SlashCommandBuilder } = require('discord.js');
const {token} = require('./config.json');

const client = new Client({intents: []});

client.once(Events.ClientReady, c => {
  console.log(`Bot - ${c.user.username} Runtime Up`);

  const ping =  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("pong");
  
  client.application.commands.create(ping);
});

client.on(Events.InteractionCreate, Interaction => {
  if(Interaction.commandName === "ping"){
    console.log(Interaction)
    Interaction.reply(`Pong`);
  }
});

client.login(token);