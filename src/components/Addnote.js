import React, { useContext, useState } from "react";
import noteContext from "../context/notes/Notecontext";

const Addnote = () => {
	const context = useContext(noteContext);
	const { addNote } = context;

	const [note, setNote] = useState({
		title: "",
		description: "",
		tag: "General",
	});
	const handleClick = (e) => {
		if (note.title !== "") {
			e.preventDefault();
			addNote(note.title, note.description, note.tag);
		}
		setNote({ title: "", description: "", tag: "" });
	};

	const onChange = (e) => {
		setNote({ ...note, [e.target.id]: e.target.value });
	};

	return (
		<>
			<div className=" p-10">
				<h1 className="font-bold p-4">Add Notes</h1>
				<form className="max-w-sm mx-auto">
					<div className="mb-5">
						<label
							htmlFor="title"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Title
						</label>
						<input
							type="text"
							id="title"
							onChange={onChange}
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Your title here"
							minLength={3}
							value={note.title}
							required
						/>
					</div>
					<div className="mb-5">
						<label
							htmlFor="description"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Description
						</label>
						<input
							type="text"
							id="description"
							onChange={onChange}
							placeholder="Description"
							value={note.description}
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							minLength={10}
							required
						/>
					</div>
					<div className="mb-5">
						<label
							htmlFor="tag"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Tag
						</label>
						<input
							type="text"
							id="tag"
							placeholder="Tag"
							onChange={onChange}
							value={note.tag}
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							required
						/>
					</div>

					<button
						type="submit"
						disabled={
							note.title.length >= 3 &&
							note.description.length >= 10
								? false
								: true
						}
						onClick={handleClick}
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Add Note
					</button>
				</form>
			</div>
		</>
	);
};

export default Addnote;
