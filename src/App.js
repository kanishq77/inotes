import "./App.css";
import Nav from "./components/Nav";
import Home from "./components/Home";
import About from "./components/About";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Contact from "./components/Contact";
import Notestate from "./context/notes/Notestate";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
	return (
		<>
			<Notestate>
				<Router>
					<Nav />
					<div className=" text-center">
						<Routes>
							<Route path="/home" element={<Home />} />
							<Route path="/about" element={<About />} />
							<Route path="/contact" element={<Contact />} />
							<Route path="/login" element={<Login />} />
							<Route path="/signup" element={<Signup />} />
						</Routes>
					</div>
				</Router>
			</Notestate>
		</>
	);
}

export default App;
