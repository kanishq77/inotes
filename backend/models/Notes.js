const mongoose = require("mongoose");

const NoteSchema = new Schema({
	title: {
		type: string,
		required: true,
	},
	description: {
		type: string,
		required: true,
	},
	tag: {
		type: string,
		default: "General",
	},
	date: {
		type: date,
		default: date.now,
	},
});

module.exports = mongoose.model("notes", NoteSchema);
