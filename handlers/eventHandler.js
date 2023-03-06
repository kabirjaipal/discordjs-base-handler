import { Bot } from "./Client.js";
import { readdir } from "node:fs/promises";
import { logStatus } from "./functions.js";

/**
 *
 * @param {Bot} client
 */
export default async (client) => {
  // code

  try {
    const eventfiles = await readdir("./events");
    const eventfilesFiltered = eventfiles.filter((f) => f.endsWith(".js"));
    const items = await Promise.all(
      eventfilesFiltered.map(async (file) => {
        /**
         * @type {import("../index.js").EventHandler}
         */
        let event = await import(`../events/${file}`).then((r) => r.default);
        if (event?.name) {
          client.events.set(event.name, event);
          logStatus(event.name, true, "Event");
          client.on(event.name, (...args) => event.run(client, ...args));
        } else {
          logStatus(event.name, false, "Event");
        }
      })
    );
    await Promise.all(items);
  } catch (error) {
    console.log(error);
  }
};
