function messageCheck(
	message: string,
	words: Array<string>,
	exceptions: Array<string>
) {
	const msg = message.toLowerCase();

	let pass = !words.some((element) => {
		return msg.includes(element);
	});
	pass ||= exceptions.some((element) => {
		return msg.includes(element);
	});
	return pass;
}

export { messageCheck };
