import { PermissionFlagsBits } from "@discordjs/core"

export const commands = {
  ping: {
    name: 'ping',
    description: 'O BOT te responderá',
  },
  clean: {
    name: 'clean', 
    type: 1, 
    description: 'Limpa uma Sala',
    default_member_permissions: `${PermissionFlagsBits.ManageMessages}`,
    options: [
      {
      name: 'canal',
      description: 'Canal a ser limpo',
      type: 7,
      required: true,
      channel_types: [0],
      }
    ]
  },
}
