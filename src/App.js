import "./App.css";
import Nav from "./components/Nav";
import Home from "./components/Home";
import About from "./components/About";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Contact from "./components/Contact";
import Notestate from "./context/notes/Notestate";
function App() {
	return (
		<>
			<Notestate>
				<Router>
					<Nav />
					<div className=" text-center">
						<Routes>
							<Route
								exact
								path="/about"
								element={<About />}
							></Route>
							<Route
								exact
								path="/Home"
								element={<Home />}
							></Route>
							<Route
								exact
								path="/Contact"
								element={<Contact />}
							></Route>
						</Routes>
					</div>
				</Router>
			</Notestate>
		</>
	);
}

export default App;
