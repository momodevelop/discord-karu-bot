﻿
const messages: string[] = [
	"Hey yo!! XD",
	"Wazzzzzzup! XD",
	"Hey!!!!! ^^/",
	"Yo yo yoz!",
]

export function randMsg(): string {
	let rand: number = Math.floor(Math.random() * messages.length);
	return messages[rand];
}