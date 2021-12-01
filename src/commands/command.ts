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
	async say(
		@SimpleCommandOption("message", { type: "STRING" }) message: string,
		command: SimpleCommandMessage
	) {
		try {
			await command.message.channel.send(message);
		} catch (err) {
			command.message.channel.send("Please enter a message.");
		}
	}
}
