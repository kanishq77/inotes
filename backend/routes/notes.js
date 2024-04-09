const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");

//ROUTE 1: Getting all the user notes using GET req.  /api/auth/fetchallnotes. Login required

router.get("/fetchallnotes", fetchuser, async (req, res) => {
	try {
		const notes = await Notes.find({ user: req.user.id });
		res.json(notes);
	} catch (error) {
		console.error("Error creating user:", error.message);
		res.status(500).send("Some internal error");
	}
});

//ROUTE 2: add new notes using POST req.  /api/auth/addnote. Login required

router.post(
	"/addnote",
	fetchuser,
	[
		body("title", "Enter a valid title").isLength({ min: 3 }),
		body(
			"description",
			"Enter a description with more than 10 characters"
		).isLength({ min: 10 }),
	],
	async (req, res) => {
		//If there are errors then bad request is returned
		try {
			const { title, description, tag } = req.body;

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
			const notes = new Notes({
				title,
				description,
				tag,
				user: req.user.id,
			});
			const savedNotes = await notes.save();
			res.json(savedNotes);
		} catch (error) {
			console.error("Error creating user:", error.message);
			res.status(500).send("Some internal error");
		}
	}
);

//ROUTE 3: update notes using POST req.  /api/auth/updatenote. Login required
router.patch("/updatenotes/:id", fetchuser, async (req, res) => {
	const { title, description, tag } = req.body;

	try {
		//create a newNotes object
		const newNotes = {};
		if (title) {
			newNotes.title = title;
		}
		if (description) {
			newNotes.description = description;
		}
		if (tag) {
			newNotes.tag = tag;
		}

		//find the note to be updated and update it

		let note = await Notes.findById(req.params.id);
		if (!note) {
			return res.status(404).send("Not found");
		}

		//allow deletion only if user owns this notes

		if (note.user.toString() !== req.user.id) {
			return res.status(401).send("Not allowed");
		}

		note = await Notes.findByIdAndUpdate(
			req.params.id,
			{ $set: newNotes },
			{ new: true }
		);
		res.json({ note });
	} catch (error) {
		console.error("Error updating notes:", error.message);
		res.status(500).send("Some internal error");
	}
});

//ROUTE 4: delete notes using DELETE req.  /api/auth/deletenotes. Login required
router.delete("/deletenotes/:id", fetchuser, async (req, res) => {
	//find the note to be updated and update it

	try {
		// if (!req.params.id) {
		// 	return res.status(404).send("Not found");
		// }
		let note = await Notes.findById(req.params.id);
		if (!note) {
			return res.status(404).send("Not found");
		}

		//allow deletion only if user owns this notes

		if (note.user.toString() !== req.user.id) {
			return res.status(401).send("Not allowed");
		}

		note = await Notes.findByIdAndDelete(req.params.id);
		res.json({ Success: "Note has been deleted", note: note });
	} catch (error) {
		console.error("Error creating user:", error.message);
		res.status(500).send("Some internal error");
	}
});
module.exports = router;
