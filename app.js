const chalk = require("chalk");
const yargs = require("yargs");
const { listNotes } = require("./notes.js");
const notes = require("./notes.js");

// Customize yarg version
yargs.version("1.1.0");

// ADD, REMOVE, READ, LIST
// Create add command
yargs.command({
	command: "add",
	describe: "Add a new note",
	builder: {
		title: {
			describe: "Note title",
			demandOption: true,
			type: "string",
		},
		body: {
			describe: "Note body",
			demandOption: true,
			type: "string",
		},
	},
	handler(argv) {
		notes.addNote(argv.title, argv.body);
	},
});

// Create remove command
yargs.command({
	command: "remove",
	describe: "Remove a note",
	builder: {
		title: {
			describe: "Note title",
			demandOption: true,
			type: "string",
		},
	},
	handler(argv) {
		notes.removeNote(argv.title);
	},
});

// Create list command
yargs.command({
	command: "list",
	describe: "List all notes",
	handler() {
		notes.listNotes();
	},
});

// Create read command
yargs.command({
	command: "read",
	describe: "Read a note",
	builder: {
		title: {
			demandOption: true,
			describe: "Note title",
			type: "string",
		},
	},
	handler(argv) {
		notes.readNotes(argv.title);
	},
});

yargs.parse();
