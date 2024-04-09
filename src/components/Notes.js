import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/Notecontext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";
// import Notestate from "../context/notes/Notestate";

const Notes = () => {
	const context = useContext(noteContext);
	const { notes, getNotes, editNote } = context;
	const [modalActive, setModalActive] = useState(false);
	let navigate = useNavigate();
	useEffect(() => {
		if (localStorage.getItem("token")) {
			// console.log(localStorage.getItem("token"));
			getNotes();
		} else {
			navigate("/Login");
		}

		// eslint-disable-next-line
	}, []);
	const ref = useRef(null);
	const refClose = useRef(null);
	const [note, setNote] = useState({
		_id: "",
		etitle: "",
		edescription: "",
		etag: "",
	});

	const updateNote = (currentNote) => {
		ref.current.click();
		setModalActive(true);
		setNote({
			_id: currentNote._id,
			etitle: currentNote.title,
			edescription: currentNote.description,
			etag: currentNote.tag,
		});
		// console.log("Modal is clicked");
	};

	useEffect(() => {
		const modalToggleBtn = document.querySelector(
			'[data-modal-toggle="authentication-modal"]'
		);
		const modalCloseBtn = document.querySelector(
			'[data-modal-hide="authentication-modal"]'
		);
		const modal = document.getElementById("authentication-modal");

		const toggleModal = () => {
			if (modal.classList.contains("hidden")) {
				modal.classList.remove("hidden");
				modal.setAttribute("aria-hidden", "false");
			} else {
				modal.classList.add("hidden");
				modal.setAttribute("aria-hidden", "true");
			}
		};

		const hideModal = () => {
			modal.classList.add("hidden");
			modal.setAttribute("aria-hidden", "true");
		};

		modalToggleBtn.addEventListener("click", toggleModal);
		modalCloseBtn.addEventListener("click", hideModal);

		return () => {
			modalToggleBtn.removeEventListener("click", toggleModal);
			modalCloseBtn.removeEventListener("click", hideModal);
		};
	}, []);

	const handleClick = (e) => {
		e.preventDefault();
		if (notes.etitle !== "") {
			editNote(note._id, note.etitle, note.edescription, note.etag);
			refClose.current.click();
			// console.log("Updating the note", note);
		}
	};

	const onChange = (e) => {
		setNote({ ...note, [e.target.id]: e.target.value });
	};
	return (
		<>
			<Addnote />
			{/* <!-- Modal toggle --> */}
			<button
				ref={ref}
				data-modal-target="authentication-modal"
				data-modal-toggle="authentication-modal"
				className=" hidden  justify-items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				type="button"
			>
				Toggle modal
			</button>

			<>
				{/* <!-- Main modal --> */}
				<div
					id="authentication-modal"
					tabIndex="-1"
					aria-hidden="true"
					className={`hidden fixed top-0 left-0 right-0 bottom-0 flex items-start justify-center z-50 ${
						modalActive ? "backdrop-blur-sm" : ""
					}`}
				>
					<div className="relative p-4 w-full max-w-md max-h-full">
						{/* <!-- Modal content --> */}
						<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
							{/* <!-- Modal header --> */}
							<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
								<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
									Edit note
								</h3>
								<button
									type="button"
									className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
									data-modal-hide="authentication-modal"
								>
									<svg
										className="w-3 h-3"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 14 14"
									>
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
										/>
									</svg>
									<span ref={refClose} className="sr-only">
										Close modal
									</span>
								</button>
							</div>
							{/* <!-- Modal body --> */}
							<div className="p-4 md:p-5">
								<form className="max-w-sm mx-auto">
									<div className="mb-5">
										<label
											htmlFor="etitle"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Title
										</label>
										<input
											type="text"
											id="etitle"
											onChange={onChange}
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="Your title here"
											value={note.etitle}
											minLength={3}
											required
										/>
									</div>
									<div className="mb-5">
										<label
											htmlFor="edescription"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Description
										</label>
										<input
											type="text"
											id="edescription"
											onChange={onChange}
											value={note.edescription}
											placeholder="Description"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											minLength={10}
											required
										/>
									</div>
									<div className="mb-5">
										<label
											htmlFor="etag"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Tag
										</label>
										<input
											type="text"
											id="etag"
											placeholder="Tag"
											value={note.etag}
											onChange={onChange}
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											required
										/>
									</div>
								</form>
								<button
									type="submit"
									onClick={handleClick}
									className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
								>
									Update Note
								</button>
							</div>
						</div>
					</div>
				</div>
			</>

			<h1 className="font-bold ">Your Notes</h1>
			{notes.length === 0 && (
				<p className=" font-extrabold text-md p-4">
					No notes to display
				</p>
			)}
			<div className="grid grid-cols-2 sm:grid-cols-3 gap-4 align-items-center align-self-center  p-2">
				{notes.map((note) => {
					return (
						<Noteitem
							key={note._id}
							updateNote={updateNote}
							note={note}
						/>
					);
				})}
			</div>
		</>
	);
};

export default Notes;
