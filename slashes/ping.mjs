import { MessageFlags } from '@discordjs/core';

export async function execute(interaction, api) {
  await api.interactions.reply(interaction.id, interaction.token, {
    content: "SOU LTD! RESPEITA-ME SE FOR CAPAZ! Ops, oi!",
    flags: MessageFlags.Ephemeral,
  })

}
