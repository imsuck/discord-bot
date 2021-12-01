import { Client } from "discord.js";
import {
	Discord,
	SimpleCommand,
	SimpleCommandMessage,
	SimpleCommandOption,
} from "discordx";

@Discord()
class command {
	@SimpleCommand("ping")
	async ping(command: SimpleCommandMessage) {
		command.message.reply("pong! 🏓");
	}
	@SimpleCommand("say")
	async say(command: SimpleCommandMessage) {
		try {
			await command.message.channel.send(command.argString);
		} catch (err) {
			command.message.channel.send("Please enter a message.");
		}
	}
}
