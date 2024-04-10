import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// require("dotenv").config();
const Signup = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [credentials, setCredentials] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const refClose = useRef(null);
	let navigate = useNavigate();
	const host = "https://backend-ruzy.onrender.com";
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${host}/api/auth/createuser`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: credentials.name,
					email: credentials.email,
					password: credentials.password,
				}),
			});
			const json = await response.json();
			if (json.success) {
				localStorage.setItem("token", json.authtoken);
				navigate.push("/Home");
			} else {
				// Handle unsuccessful response
				console.error("Error creating user:", json.error);
			}
		} catch (error) {
			console.error("Error creating user:", error);
			setTimeout(() => {
				setError("");
			}, 3000);
		}
	};

	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.id]: e.target.value });
	};

	const handleClose = () => {
		// console.log("Clicked");
		setError("");
		refClose.current.click();
	};
	return (
		<>
			<div>
				<form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
					{error && (
						<div
							className="alert alert-danger transition-opacity duration-500"
							role="alert"
						>
							<div
								id="toast-danger"
								className=" absolute  flex items-center w-full max-w-xs p-4 ml-6 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
								role="alert"
							>
								<div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
									<svg
										className="w-5 h-5"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"
											fillebclipRule="evenodd"
										/>
									</svg>
									<span className="sr-only">Error icon</span>
								</div>
								<div className="ms-3 text-sm font-normal">
									Cannot create user
								</div>
								<button
									type="button"
									className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
									data-dismiss-target="#toast-default"
									aria-label="Close"
									ref={refClose}
									onClick={handleClose}
								>
									<span className="sr-only">Close</span>
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
								</button>
							</div>
						</div>
					)}
					<div className="mb-5">
						<label
							htmlFor="name"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Enter yourname
						</label>
						<input
							type="name"
							onChange={onChange}
							id="name"
							className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
							placeholder="name"
							required
						/>
					</div>
					<div className="mb-5">
						<label
							htmlFor="email"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Enter your email
						</label>
						<input
							type="email"
							onChange={onChange}
							id="email"
							className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
							placeholder="name@flowbite.com"
							required
						/>
					</div>
					<div className="mb-5">
						<label
							htmlFor="password"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Enter your password
						</label>
						<input
							type={showPassword ? "text" : "password"}
							id="password"
							onChange={onChange}
							className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
							required
						/>
						<label htmlFor="check" className=" text-sm">
							Show password&nbsp;
						</label>
						<input
							id="check"
							type="checkbox"
							minLength={5}
							value={showPassword}
							onChange={() => setShowPassword((prev) => !prev)}
						/>
					</div>

					{/* <div className="flex items-start mb-5">
						<div className="flex items-center h-5">
							<input
								id="terms"
								type="checkbox"
								value=""
								className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
								required
							/>
						</div>
						<label
							htmlFor="terms"
							className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							I agree with the{" "}
							<a
								href="#"
								className="text-blue-600 hover:underline dark:text-blue-500"
							>
								terms and conditions
							</a>
						</label>
					</div> */}
					<div className="flex justify-center mb-5">
						<label
							htmlFor="remember"
							className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							Already a user?&nbsp;
							<Link to="/Login" className=" active:underline">
								Login
							</Link>
						</label>
					</div>
					<button
						type="submit"
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Register new account
					</button>
				</form>
			</div>
		</>
	);
};

export default Signup;
