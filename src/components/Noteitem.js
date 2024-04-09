import React, { useContext } from "react";
import noteContext from "../context/notes/Notecontext";

const Noteitem = (props) => {
	const context = useContext(noteContext);
	const { deleteNote } = context;
	const { note, updateNote } = props;
	return (
		<div className="flex  justify-center mb-4">
			{/* Added mb-4 for margin bottom */}
			<div className="sm:max-h-auto max-h-80 max-w-80 h-auto w-72 hover:max-w-96  sm:w-full sm:h-64  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 whitespace-normal  truncate">
				<div className="hover:cursor-pointer">
					<h5 className="  mb-2 px-4 pt-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white truncate">
						{note.title}
					</h5>
				</div>
				<p className="px-4 pb-4 h-1/2 font-normal text-gray-700 dark:text-gray-400 whitespace-normal truncate">
					{note.description}
				</p>
				<div className="flex justify-evenly px-7 pb-4 pt-4 ">
					<span
						className="hover:cursor-pointer border h-7 w-10 hover:w-14  border-green-500 bg-green-300 rounded-lg"
						onClick={() => {
							updateNote(note);
						}}
					>
						<i className="fa-solid fa-user-pen "></i>
					</span>
					<span
						className="hover:cursor-pointer border h-7 w-10 hover:w-14  border-red-500 bg-red-300 rounded-lg"
						onClick={() => {
							deleteNote(note._id);
						}}
					>
						<i className="fa-solid fa-trash hover:cursor-pointer"></i>
					</span>
				</div>
			</div>
		</div>
	);
};

export default Noteitem;
