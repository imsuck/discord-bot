import "reflect-metadata";
import { Intents, Interaction, Message } from "discord.js";
import { Client } from "discordx";
import { dirname, importx } from "@discordx/importer";
import dotenv from "dotenv";
import { messageCheck } from "./utils/messaging";

dotenv.config();

const badWords = ["dlscord", "cliscord"];
const exceptions = ["nigeria"];

async function start() {
	const client = new Client({
		simpleCommand: {
			prefix: "^",
		},
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
		client.executeCommand(msg);

		// delete bad words
		if (messageCheck(msg.content, badWords, exceptions) === false) {
			msg.reply("Bad word!");
			setTimeout(() => {
				msg.delete();
			}, 250);
		}
	});

	await importx(dirname(import.meta.url) + "/{events,commands}/**/*.{ts,js}");
	await client.login(process.env.TOKEN ?? "");
}

start();
