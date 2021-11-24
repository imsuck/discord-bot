import "reflect-metadata";
import { Intents, Interaction, Message } from "discord.js";
import { Client } from "discordx";
import dotenv from "dotenv";

dotenv.config();

let badWords = ["amogus", "forgor"];

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
client.on("messageCreate", (msg) => {
	let listLength = badWords.length;
	for (var i = 0; i < listLength; i++) {
		if (msg.content.includes(badWords[i])) {
			msg.reply("Bad word :(");
			msg.delete();
			break;
		}
	}
});

client.login(process.env.TOKEN ?? "");
