// index.js
const express = require("express");
const ConnectToMongo = require("./db");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
	res.send("Hello World!");
});

ConnectToMongo()
	.then(() => {
		app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	})
	.catch((error) => {
		console.error("Error starting server:", error);
	});
