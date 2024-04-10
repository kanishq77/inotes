import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
require("dotenv").config();
const Signup = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [credentials, setCredentials] = useState({
		name: "",
		email: "",
		password: "",
	});
	let navigate = useNavigate();
	const host = process.env.HOST;
	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch(`${host}/api/auth/createuser`, {
			method: "POST", // *GET, POST, PUT, DELETE, etc.
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
		// console.log(json);
		if (json.success) {
			//redirect
			localStorage.setItem("token", json.authtoken);
			navigate.push("/Home");
		}
	};
	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.id]: e.target.value });
	};
	return (
		<>
			<div>
				<form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
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
