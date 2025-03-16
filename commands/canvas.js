const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const { createCanvas, Image } = require("canvas");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("canvas")
    .setDescription("ct"),

  async execute(interaction) {
    const canvas = createCanvas(1800, 1600);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const image = new Image();
    image.src = 'https://i.redd.it/8u3iw3bhj5d81.jpg'
  }
}