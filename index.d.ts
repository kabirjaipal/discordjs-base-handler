import { Bot } from "./handlers/Client.js";
import {
  ApplicationCommandNonOptions,
  ApplicationCommandType,
  CommandInteraction,
  ContextMenuCommandInteraction,
  InteractionReplyOptions,
  Message,
  UserContextMenuCommandInteraction,
  InteractionResponse,
} from "discord.js/typings";

export interface Mcommand {
  name: string;
  description: string;
  userPermissions: bigint;
  botPermissions: bigint;
  category: string;
  type: number;
  owneronly: boolean;
  run: (client: Bot, message: Message, args: string[], prefix: string) => {};
}

export interface Scommand {
  name: string;
  description: string;
  userPermissions: bigint;
  botPermissions: bigint;
  category: string;
  type: ApplicationCommandType.ChatInput;
  options?: ApplicationCommandNonOptions[];
  run: (client: Bot, interaction: CommandInteraction) => {};
}

export interface CMcommand {
  name: string;
  category: string;
  type: ApplicationCommandType.Message;
  run: (client: Bot, interaction: ContextMenuCommandInteraction) => {};
}

export interface CUcommand {
  name: string;
  category: string;
  type: ApplicationCommandType.User;
  run: (client: Bot, interaction: UserContextMenuCommandInteraction) => {};
}

export type send = (
  interactionOrMessage: CommandInteraction | Message,
  options: InteractionReplyOptions
) => Promise<Message | InteractionResponse>;

export type SendEmbedFunction = (
  interaction: CommandInteraction,
  data: string,
  ephemeral?: boolean
) => Promise<Message | InteractionResponse>;
