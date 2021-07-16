const client = require("../index");

client.on("ready", () => {
    console.log(`${client.user.tag} is Online!`.bgRed)
    client.user.setActivity(`With You`)
});
