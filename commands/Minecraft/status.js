const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Статус вашего сервера Minecraft.'),

  async execute(interaction) {
    const serverURL = 'https://api.mcsrvstat.us/2/176.37.97.175:25565';
    try {
      const res = await fetch(serverURL);
      const data = await res.json();

      let status = "❌ | Оффлайн";
      let motd = 'Сервер для друзей';
      let players = "Никто не играет :(";
      let onlineplayers = data.players ? data.players.online : 0;
      let maxplayers = data.players ? data.players.max : 0;

      if (data.online) {
        status = "✅ | Онлайн";
        if (data.players && data.players.list) {
          if (data.players.list.length > 10) {
            players = "На сервере больше 10 игроков...";
          } else {
            players = data.players.list.join(', ');
          }
        }
      }

      const embedStatus = new EmbedBuilder()
        .setTitle('Статус сервера')
        .addFields(
          { name: '**`•`** IP сервера', value: `**\`176.37.97.175\`**,**\`26.111.1.71\`**`, inline: true },
          { name: '**`•`** Порт', value: `**\`25565\`**`, inline: true },
          { name: '**`•`** Статус', value: `\`\`\`${status}\`\`\``, inline: true },
          { name: '**`•`** Количество игроков', value: `\`\`\`${onlineplayers} | ${maxplayers} Игроков\`\`\``, inline: true },
          { name: '**`•`** Версия', value: `\`\`\`${data.version || 'N/A'}\`\`\``, inline: true },
          { name: '**`•`** Описание', value: `\`\`\`${motd}\`\`\``, inline: false },
          { name: '**`•`** Игроки:', value: `\`\`\`${players}\`\`\``, inline: false }
        )
        .setColor(0x2F3136)
        .setFooter({ text: 'Ruina Development™' })
        .setTimestamp();

      await interaction.reply({ embeds: [embedStatus] });
    } catch (error) {
      console.error(error);
      const err_embed = new EmbedBuilder()
        .setTitle('Error')
        .addFields(
          { name: 'Ошибка', value: '**`•`** `Возможно проблема в IP/PORT`.\n**`•`** `Проблемы с сервером`.\n**`•`** `Ден руина`.' }
        )
        .setColor(0x2F3136)
        .setFooter({ text: 'Ruina Development™' })
        .setTimestamp();

      await interaction.reply({ embeds: [err_embed], ephemeral: true });
    }
  }
};