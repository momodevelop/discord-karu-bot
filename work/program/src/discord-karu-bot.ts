﻿// Globals ////////////////////////////////
require('dotenv').config();
require('app-module-path').addPath(__dirname);

// Load libs ////////////////////////////////
import { Client, Message } from 'discord.js';
import { cCommander } from 'libs/Commander/cCommander';
import { cResponder } from 'libs/Responder/cResponder';
import { globals } from 'globals/Globals';
import { CallbackParams as commandCallbackParams } from 'commands/CallbackParams';
import { CallbackParams as responseCallbackParams } from 'responses/CallbackParams';

//Set up global variables /////////////////////
globals.Root = __dirname + "/";

let commander: cCommander = new cCommander();
let responder: cResponder = new cResponder();

// Discord bot ////////////////////////////
const prefix: string = process.env.PREFIX || "";
if (prefix == "") {
	console.error("Prefix not defined!")
	process.exit(0);
}
const bot: Client = new Client();

async function onMessage(msg: Message): Promise<void> {
	try {
		// reject self
		if (msg.author.id === bot.user.id) {
			return;
		}

		if (msg.content.startsWith(prefix)) {
			console.info('I\'m called! -> ' + msg.content);

			let args: string[] = msg.content.substring(prefix.length).match(/(?:[^\s"]+\b|(")[^"]*("))+|[=!&|~]/g) || [];
			if (!args.length) {
				return;
			}

			let command: string = args[0];
			args.shift();

			if (! await commander.Exec(command, new commandCallbackParams(bot, msg, args))) {
				await responder.Exec(new responseCallbackParams(bot, msg));
			}
		}

		else if (msg.content.match(/\b(karu)\b/gi)) {
			await responder.Exec(new responseCallbackParams(bot, msg));
		}
	}
	catch (e) {
		console.error(e)
	}
}

async function onLoad(): Promise<void> {
	try {
		await commander.ParseDir(__dirname + '/commands/cmd/');
		await responder.ParseDir(__dirname + '/responses/res/');
		await bot.login(process.env.TOKEN);
		console.info("KaruBot up and ready to work! ^^b");
		bot.user.setActivity("type '" + prefix + " help'");
		bot.on('message', onMessage);
	}
	catch (e) {
		console.info(e);
		process.exit(0);
	}
}

onLoad();


