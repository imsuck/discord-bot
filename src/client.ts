import "reflect-metadata";
import { Intents, Interaction, Message } from "discord.js";
import { Client } from "discordx";
import dotenv from "dotenv";

dotenv.config();

let badWords = ["amogus", "forgor", "wysi"];

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.GUILD_VOICE_STATES,
		Intents.FLAGS.DIRECT_MESSAGES,
	],
	silent: true,
});

client.once("ready", async () => {
	// init all application commands
	await client.initApplicationCommands({
		guild: { log: true },
		global: { log: true },
	});

	// init permissions; enabled log to see changes
	await client.initApplicationPermissions(true);

	console.log("Bot started");
});

client.on("messageCreate", (msg) => {
	if (msg.content === "ping") {
		msg.reply("pong! 🏓");
	}
});
// delete bad words
client.on("messageCreate", (msg) => {
	for (let i = 0; i < badWords.length; i++) {
		if (msg.content.toLowerCase().includes(badWords[i])) {
			msg.reply("Bad word!");
			setTimeout(() => {
				msg.delete();
			}, 250);
			break;
		}
	}
});

client.login(process.env.TOKEN ?? "");
