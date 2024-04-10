import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Nav = () => {
	let location = useLocation();
	let navigate = useNavigate();
	useEffect(() => {
		// console.log(location.pathname);
		// eslint-disable-next-line
	}, [location]);
	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};
	const [isNavbarOpen, setIsNavbarOpen] = useState(false);

	const toggleNavbar = () => {
		setIsNavbarOpen(!isNavbarOpen);
	};
	return (
		<>
			<nav className="bg-grey-800 border-black dark:bg-gray-900 fixed top-0 w-full z-50">
				<div className="max-w-screen flex flex-wrap items-center justify-between mx-auto p-4 bg-lime-400 border rounded-lg">
					<Link
						to="/Home"
						className="flex items-center space-x-3 rtl:space-x-reverse"
					>
						<i className="fa-solid fa-book "></i>

						<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white ">
							iNotes
						</span>
					</Link>
					<button
						data-collapse-toggle="navbar-default"
						type="button"
						className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
						aria-controls="navbar-default"
						onClick={toggleNavbar}
						aria-expanded={isNavbarOpen ? "true" : "false"}
					>
						<span className="sr-only">Open main menu</span>
						<svg
							className="w-5 h-5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 17 14"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M1 1h15M1 7h15M1 13h15"
							/>
						</svg>
					</button>
					<div
						className={`${
							isNavbarOpen ? "block" : "hidden"
						} w-full md:block md:w-auto`}
						id="navbar-default"
					>
						<ul className="font-medium flex flex-col p-4 md:p-0 mt-4 bg-lime-400 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-lime-400 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
							<li>
								<Link
									to="/Home"
									className={`${
										location.pathname === "/Home"
											? "text-white font-bold"
											: ""
									}block py-2 px-3 text-gray-900 rounded md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
									aria-current="page"
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									to="/About"
									className={` ${
										location.pathname === "/About"
											? "text-white"
											: ""
									} block py-2 px-3 text-gray-900 rounded md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
								>
									About
								</Link>
							</li>
							<li>
								<Link
									to="/Contact"
									className={`${
										location.pathname === "/Contact"
											? "text-white font-bold"
											: ""
									}block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
								>
									Contact
								</Link>
							</li>
							<li>
								{localStorage.getItem("token") ? (
									<button onClick={handleLogout}>
										Logout
									</button>
								) : (
									<Link
										to="/Login"
										className={`${
											location.pathname === "/Login"
												? "text-white font-bold"
												: ""
										}block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
									>
										Login
									</Link>
								)}
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Nav;
