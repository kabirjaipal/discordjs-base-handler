import { readdir } from "node:fs/promises";

/**
 * @param {Bot} client
 */
export default async (client) => {
  try {
    const eventFiles = await readdir("./events");
    const eventFilesFiltered = eventFiles.filter((file) =>
      file.endsWith(".js")
    );

    let count = 0;

    await Promise.all(
      eventFilesFiltered.map(async (file) => {
        try {
          await import(`../events/${file}`).then((r) => r.default);
          count++;
        } catch (error) {
          console.error(`Error loading event from file ${file}:`, error);
          return 0;
        }
      })
    );

    console.log(`> ✅ Loaded ${count} Events !!`);
  } catch (error) {
    console.error("Error reading the events folder:", error);
  }
};
