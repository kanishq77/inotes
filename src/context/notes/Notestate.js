import React, { useState } from "react";
import noteContext from "./Notecontext";
// require("dotenv").config();
// import Addnote from "../../components/Addnote";
const Notestate = (props) => {
	const host = "https://backend-ruzy.onrender.com";
	const notesinitial = [];
	const [notes, setNotes] = useState(notesinitial);

	//get all note
	const getNotes = async (title, description, tag) => {
		try {
			//API Fetch
			const response = await fetch(`${host}/api/notes/fetchallnotes`, {
				method: "GET", // *GET, POST, PUT, DELETE, etc.
				headers: {
					"Content-Type": "application/json",
					"auth-token": localStorage.getItem("token"),
				},
			});
			const json = await response.json();
			// eslint-disable-next-line
			// console.log(json);
			setNotes(json);
		} catch (error) {
			console.error("Error fetching note:", error);
		}
	};
	//Add a note

	const addNote = async (title, description, tag) => {
		try {
			//API Fetch
			const response = await fetch(`${host}/api/notes/addnote`, {
				method: "POST", // *GET, POST, PUT, DELETE, etc.
				headers: {
					"Content-Type": "application/json",
					"auth-token": localStorage.getItem("token"),
				},
				body: JSON.stringify({ title, description, tag }),
			});
			const note = await response.json();
			// eslint-disable-next-line
			// console.log(note);
			setNotes(notes.concat(note));
		} catch (error) {
			console.error("Error deleting note:", error);
		}
	};
	//Delete a note
	const deleteNote = async (_id) => {
		try {
			// console.log("deleting the note with id " + _id);
			const newNotes = notes.filter((note) => {
				return note._id !== _id;
			});
			setNotes(newNotes);
			await fetch(`${host}/api/notes/deletenotes/${_id}`, {
				method: "DELETE", // *GET, POST, PUT, DELETE, etc.
				headers: {
					"Content-Type": "application/json",
					"auth-token": localStorage.getItem("token"),
				},
			});
		} catch (error) {
			console.error("Error deleting note:", error);
		}
	};

	//Edit a note
	const editNote = async (_id, title, description, tag) => {
		let response;
		try {
			//API Fetch
			// console.log("id is " + _id);
			response = await fetch(`${host}/api/notes/updatenotes/${_id}`, {
				method: "PATCH", // *GET, POST, PUT, DELETE, etc.
				headers: {
					"Content-Type": "application/json",
					"auth-token": localStorage.getItem("token"),
				},
				body: JSON.stringify({ title, description, tag }),
			});
			// console.log(_id);
			const json = await response.json();
			// eslint-disable-next-line
			// console.log(json);
			//logic to edit the notes
			let newNotes = JSON.parse(JSON.stringify(notes));
			for (let index = 0; index < newNotes.length; index++) {
				const element = newNotes[index];
				if (element._id === _id) {
					newNotes[index].title = title;
					newNotes[index].description = description;
					newNotes[index].tag = tag;
					break;
				}
			}
			setNotes(newNotes);
		} catch (error) {
			console.error("Error updating note:", error);
			console.error("Response status:", error.response?.status);
		}
	};
	return (
		<noteContext.Provider
			value={{ notes, addNote, deleteNote, editNote, getNotes }}
		>
			{props.children}
		</noteContext.Provider>
	);
};

export default Notestate;
