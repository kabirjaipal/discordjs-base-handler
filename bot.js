import "dotenv/config";
import { Bot } from "./handlers/Client.js";

/**
 * The client instance representing the bot.
 * @type {Bot}
 */
export const client = new Bot();

// Login the bot using the provided token
client.build(client.config.TOKEN);

/**
 * Initializes and logs in the bot.
 * @module BotInitialization
 */
