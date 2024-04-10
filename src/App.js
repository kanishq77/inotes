import "./App.css";
import Nav from "./components/Nav";
import Home from "./components/Home";
import About from "./components/About";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Contact from "./components/Contact";
import Notestate from "./context/notes/Notestate";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Noteitem from "./components/Noteitem";

function App() {
	return (
		<>
			<Notestate>
				<Router>
					<Nav />
					<div className=" text-center">
						<Routes>
							<Route index element={<Login />} />
							<Route path="/Home" element={<Home />} />
							<Route path="/About" element={<About />} />
							<Route path="/Contact" element={<Contact />} />
							<Route path="/Login" element={<Login />} />
							<Route path="/Signup" element={<Signup />} />
						</Routes>
					</div>
				</Router>
			</Notestate>
		</>
	);
}

export default App;
