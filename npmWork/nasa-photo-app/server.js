require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const app = express();
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
//const { defineSearchByTitleFilter, defineSearchByDateFilter } = require("./search/searchHelper.js");
const { defineSearchByTitleFilter } = require("./search/searchHelper.js");
const UserModel = require("./models/Users.js");
console.log("UserModel in server.js:", UserModel);
const PORT = process.env.PORT || 5000;
const NASA_API_KEY = process.env.NASA_API_KEY;
const NASA_APOD_URL = "https://api.nasa.gov/planetary/apod";
app.use(cors()); app.use(express.json());
//console.log(`Manisha Server.`) ;
console.log(`${process.env.MONGODB_URI}`);
// Database connection 
mongoose.connect(`${process.env.MONGODB_URI}`, { useNewUrlParser: true, useUnifiedTopology: true }).then(
	() =>
	{
		console.log("Connection to DB Successfull") }).catch((err) => {
		console.log(`Received an Error for not connection to MongoDB Database`)
	}
	);
//Get users from MongoDB database and User Schema after importing from ./models/Users.js

const matchedUser = app.post("/api/login",
	async (req, res) =>
	{
		const reqData = req.body;
		console.log(`User Inputed Username: ${reqData.username}`);
		console.log(`User Inputed password: ${reqData.password}`);
		const matchedUser = await UserModel.findOne
		(
			{
				username: reqData.username, password: reqData.password
			}
		);
		console.log(matchedUser);
		if(matchedUser != null) {
			console.log("Insdie if");
			res.append("matchedUserName", matchedUser.username);
			res.append("matchedUserPasword", matchedUser.password);
			return res.status(200).json({msg: `Login Succssful `, username: matchedUser.username, password: matchedUser.password});
		}
		else {
			console.log("Insdie else becuase user is null");
			return res.status(401).json({ message: "Invalid username or password" });
		}
	}
);
// Fetch Photos Route
app.get("/api/photos", async (req, res) => {
	try { const { search, date, page = 1 } = req.query;
		const count = 50;
		const response = await axios.get(`${NASA_APOD_URL}?api_key=${NASA_API_KEY}&count=${count}`);
		let photos = response.data;
		photos = defineSearchByTitleFilter(photos, search);
		const pageSize = 10; const startIndex = (page - 1) * pageSize;
		const paginatedPhotos = photos.slice(startIndex, startIndex + pageSize);
		res.json({ photos: paginatedPhotos, total: photos.length }); }
	catch (error) { res.status(500).json({ message: "Error fetching data from NASA API" }); } });
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
