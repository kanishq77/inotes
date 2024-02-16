// db.js
const mongoose = require("mongoose");

const ConnectToMongo = async () => {
	try {
		await mongoose.connect("mongodb://localhost:27017/inotes", {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("Connected to MongoDB");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
		// Optionally, you can rethrow the error to let the calling code handle it
		throw error;
	}
};

module.exports = ConnectToMongo;
