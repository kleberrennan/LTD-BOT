import { ApplicationCommandsAPI, MessageFlags, WebhooksAPI } from "@discordjs/core";

import { execute as ping } from './slashes/ping.mjs';
import { execute as clean } from './slashes/limpar.mjs';

class LTDCommands extends ApplicationCommandsAPI {
  constructor(rest) {
    super(rest);
  }

  initCommands(commandData) {
    this.createGlobalCommand(process.env.ID, commandData.ping);
    this.createGlobalCommand(process.env.ID, commandData.clean);

  }
  
  async LaunchCommand(interaction, api) {
    switch(interaction.data.name) {
      case 'ping':
        ping(interaction, api); 
        break;
      case 'clean':
        clean(interaction, api);
        break;
      default:
        await api.interactions.reply(interaction.id, interaction.token, {
          content: "Este comando não existe mais!", flags: MessageFlags.Ephemeral
        });
        this.deleteGlobalCommand(interaction.application_id, interaction.data.id);
    }
  }
}

export default LTDCommands;
