import {
	Discord,
	SimpleCommand,
	SimpleCommandMessage,
	SimpleCommandOption,
} from "discordx";

@Discord()
class command {
	@SimpleCommand("ping")
	hello(command: SimpleCommandMessage) {
		command.message.reply("pong! 🏓");
	}
}
