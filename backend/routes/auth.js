const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");

const JWT_SEC = "I'm kanishq";

//ROUTE 1: Create a user using: POST "/api/auth/createuser". Doesn't require auth, NO LOGIN REQUIRED
router.post(
	"/createuser",
	[
		body("name", "Enter a valid name").isLength({ min: 3 }),
		body("email", "Enter a valid email").isEmail(),
		body(
			"password",
			"Password must be at least 5 characters long"
		).isLength({ min: 5 }),
	],
	async (req, res) => {
		//If there are errors then bad request is returned
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email } = req.body;
		const salt = await bcrypt.genSalt(10);
		const secPass = await bcrypt.hash(req.body.password, salt);
		// const password = secPass;
		try {
			// Assuming you have a User model with a create method
			const user = await User.create({
				name,
				email,
				password: secPass,
			});
			const data = {
				id: user.id,
			};

			const authtoken = jwt.sign(data, JWT_SEC);

			res.status(201).json({
				message: "User created successfully",
				authtoken,
			});
		} catch (err) {
			console.error("Error creating user:", err);
			res.status(500).json({
				message: "User with this email already exists",
			});
		}
	}
);

//ROUTE 2: Authenticating user using: POST "/api/auth/login", require auth, LOGIN REQUIRED
router.post(
	"/login",
	[
		body("email", "Enter a valid email").isEmail(),
		body("password", "Password cannot be blank").exists(),
	],
	async (req, res) => {
		let success = false;
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;
		try {
			let user = await User.findOne({ email });
			if (!user) {
				success = false;
				return res.status(400).json({
					error: "Please try to login with correct credentials",
				});
			}
			const passwordCompare = await bcrypt.compare(
				password,
				user.password
			);
			if (!passwordCompare) {
				success = false;
				return res.status(400).json({
					error: "Please try to login with correct credentials",
				});
			}

			const data = {
				user: {
					id: user.id,
				},
			};
			const authtoken = jwt.sign(data, JWT_SEC);
			success = true;
			res.json({ success, authtoken });
		} catch (error) {
			console.error("Error creating user:", error.message);
			res.status(500).send("Some internal error");
		}
	}
);

//ROUTE 3: Get userdetails after login using POST req.  /api/auth/getuser. Login required

router.post("/getuser", fetchuser, async (req, res) => {
	try {
		userId = req.user.id;
		const user = await User.findById(userId).select("-password");
		res.send(user);
	} catch (error) {
		console.error("Error creating user:", error.message);
		res.status(500).send("Some internal error");
	}
});
module.exports = router;
