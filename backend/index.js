// index.js
const express = require("express");
const ConnectToMongo = require("./db");
const app = express();
const port = 3000;

app.use(express.json());
// available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

ConnectToMongo()
	.then(() => {
		app.listen(port, () => {
			console.log(`Server is running on port http://localhost:${port}`);
		});
	})
	.catch((error) => {
		console.error("Error starting server:", error);
	});
