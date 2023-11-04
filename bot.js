import { config } from "dotenv";
config();
import { Bot } from "./handlers/Client.js";

export const client = new Bot();

// login bot
client.build(client.config.TOKEN);
