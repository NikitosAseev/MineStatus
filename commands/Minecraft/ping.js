const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Проверить Ping"),
  async execute(interaction, client) {
    const message = await interaction.deferReply({ fetchReply: true });

    const newMessage = new EmbedBuilder()
      .setColor("#db722c")
      .setTitle(`<:ping:940992752324321350> Понг!`)
      .setFooter({text: "©2022 - 2023"})
       .addFields(
        {
          name: `Ответ от API`,
          value: `> **\`${client.ws.ping}\`**`,
          inline: true,
        },        
        )
       .addFields(
        {
          name: `Пинг Клиента`,
          value: `> **\`${message.createdTimestamp - interaction.createdTimestamp}\`**`,
          inline: true,
        }        
        )    

    await interaction.editReply({ embeds: [newMessage] });
  },
};