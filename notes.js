const chalk = require("chalk");
const fs = require("fs");

const addNote = (title, body) => {
	const notes = loadNotes();
	const duplicateNote = notes.find((note) => note.title === title);

	if (!duplicateNote) {
		notes.push({
			title: title,
			body: body,
		});
		saveNotes(notes);
		console.log(chalk.inverse.green.bold("New note added!"));
	} else {
		console.log(chalk.inverse.red.bold("Note title taken!"));
	}
};

const getNotes = () => "Your notes...";

const loadNotes = () => {
	try {
		const dataBuffer = fs.readFileSync("notes.json");
		const dataJSON = dataBuffer.toString();
		return JSON.parse(dataJSON);
	} catch (error) {
		return [];
	}
};

const saveNotes = (notes) => {
	const dataJSON = JSON.stringify(notes);
	fs.writeFileSync("notes.json", dataJSON);
};

const removeNote = (title) => {
	const notes = loadNotes();

	const newNotes = notes.filter((note) => note.title !== title);

	if (notes.length > newNotes.length) {
		console.log(chalk.green.inverse.bold("Note deleted!"));
		saveNotes(newNotes);
	} else {
		console.log(chalk.red.inverse.bold("Note not found!"));
	}
};

const listNotes = () => {
	const notes = loadNotes();
	console.log(chalk.blue.inverse.bold("Your notes"));

	notes.forEach((note) => {
		console.log(note.title);
	});
};

const readNotes = (title) => {
	const notes = loadNotes();
	const targetNote = notes.find((note) => note.title === title);

	if (targetNote) {
		console.log(chalk.green.bold.inverse(targetNote.title));
		console.log(targetNote.body);
	} else {
		console.log(chalk.red.bold.inverse("No note found!"));
	}
};

module.exports = {
	getNotes: getNotes,
	addNote: addNote,
	removeNote: removeNote,
	listNotes: listNotes,
	readNotes: readNotes,
};
