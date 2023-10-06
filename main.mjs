import { REST } from '@discordjs/rest';
import { WebSocketManager } from '@discordjs/ws';
import { GatewayDispatchEvents, GatewayIntentBits, InteractionType, Client, PermissionFlagsBits } from '@discordjs/core';

import {commands as dataCommand} from './slashes/configCreate.mjs';
import { config } from 'dotenv';

import LTDCommands from './commands.mjs';

config();

const rest = new REST({version: '10'}).setToken(process.env.TOKEN);

const gateway = new WebSocketManager({
  token: process.env.TOKEN,
  intents: GatewayIntentBits.GuildMessages | GatewayIntentBits.MessageContent, rest,
});

const client = new Client({rest, gateway});

const command = new LTDCommands(rest);

client.on(GatewayDispatchEvents.InteractionCreate, async ({data: interaction, api}) => {
  if(interaction.type == InteractionType.ApplicationCommand) {
    command.LaunchCommand(interaction, api);
  }
});

client.once(GatewayDispatchEvents.Ready, () => {
  command.initCommands(dataCommand);
 
  console.log("ONLINE");
});

gateway.connect();
