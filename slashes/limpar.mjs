import { EmbedBuilder, messageLink } from '@discordjs/builders';
import { MessageFlags } from '@discordjs/core';

export async function execute(interaction, api) {
  const channelCbk = Object.values(interaction.data.resolved.channels);
   
  const isCleaning = new EmbedBuilder()
    .setTitle("Limpezinha!")
    .setDescription(`Limpando a sala ${channelCbk[0].name} Onichan!`)
    .setAuthor({name: interaction.member.user.username})
    .setColor(0x000)
    .setImage("https://e0.pxfuel.com/wallpapers/847/322/desktop-wallpaper-anime-girls-clean-clean-anime.jpg");
  const cleanDone = new EmbedBuilder()
    .setTitle("LIMPEZA!")
    .setDescription(`Você limpou com sucesso ${channelCbk[0].name}`)
    .setAuthor({name:interaction.member.user.username})
    .setColor(0x000)
    .setImage("https://e0.pxfuel.com/wallpapers/847/322/desktop-wallpaper-anime-girls-clean-clean-anime.jpg");
  
  await api.interactions.reply(interaction.id, interaction.token, {
    embeds: [isCleaning],
  });

  try {
    let rawIdData = [];
    const messages = await api.channels.getMessages(channelCbk[0].id, {limit: 100});

    if(messages.length <= 1) {
      return api.interactions.editReply(interaction.application_id, interaction.token, {
        content: "Não há mensagens!"
      })
    }
    
    for(const msgId in messages) {
      messages[msgId] = rawIdData.push(messages[msgId].id);
    }
    console.log(rawIdData);
    await api.channels.bulkDeleteMessages(channelCbk[0].id, rawIdData);

    await api.interactions.followUp(interaction.application_id, interaction.token, {
      embeds: [cleanDone],
    })

    rawIdData = [];
  } catch(err) {
    console.log(err);
    await api.interactions.editReply(interaction.application_id, interaction.token, {
      content: "Não foi possível apagar as mensagens!",
      flags: MessageFlags.Ephemeral,
    })
  }
}
