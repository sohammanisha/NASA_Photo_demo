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
const PORT = process.env.PORT || 5000; 
const NASA_API_KEY = process.env.NASA_API_KEY; 
const NASA_APOD_URL = "https://api.nasa.gov/planetary/apod"; 
app.use(cors()); app.use(express.json()); 
console.log(`Manisha Server.`) ;
//console.log(`${process.env.MONGODB_URI}`);
// Database connection 
mongoose.connect(`${process.env.MONGODB_URI}`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => { 
console.log("Connection to DB Successfull") }).catch((err) => { 
console.log(`Received an Error for not connection to MongoDB Database`) });
//Get users from MongoDB database but could not use export to use UserModel in Server.js 
//const { UserModel } = require('./models/Users.js'); 
const UserShema = new mongoose.Schema({
	password: String,
	username: String
}
) 
const UserModel = mongoose.model("User", UserShema, "users"); 
//Users from MongoDB database.
//const users=UserModel.find().then((res) => {
  //if succeded do this block of code
//}).catch((err) => {
  //catch error
//});
//console.log(`users ${users}`);
//const userModels = require("") ;
//app.get("/getUsers", (req, res) => {
//console.log("Inside app get method")
//const users = await UserModel.find();
//.then(users => {res.json(users); console.log("Users found") ;}) 
//.catch(err => {res.json(err); console.log("Error in fetching users");}) 
//}) ;
// Dummy Users List 
//users = [ { username: "admin", password: bcrypt.hashSync("admin123", 10) }, { username: "user1", password: bcrypt.hashSync("password", 10) }, ]; 
// Login Route

// Now Login Succeful and also going into catch block.
//app.post("/api/login",
//(req, res) =>
//	{
//		const reqData = req.body;
//		console.log(`User Inputed Username: ${reqData.username}`);
//		console.log(`User Inputed password: ${reqData.password}`);
//		UserModel.find( {
//			username: reqData.username, password: reqData.password
//	}).then((res) => {
//			console.log("Login Successfull");
//			return res.json({ message: "Login successful", username });
//		}).catch((err) => {
//			console.log("Eroro occured while matching with database username");
//			return res.status(401).json({ message: "Invalid username or password" });
//		});
//	}
//);

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



//if (!user || !bcrypt.compareSync(password, user.password)) { 
//return res.status(401).json({ message: "Invalid username or password" }); } 
//res.json({ message: "Login successful", username }); }); 
// Fetch Photos Route 
app.get("/api/photos", async (req, res) => { 
try { const { search, date, page = 1 } = req.query; 
const count = 50; const response = await axios.get(`${NASA_APOD_URL}?api_key=${NASA_API_KEY}&count=${count}`); 
let photos = response.data; 
if (search) { photos = photos.filter(photo => photo.explanation.toLowerCase().includes(search.toLowerCase())); }
if (date) { photos = photos.filter(photo => moment(photo.date).isSame(date, "day")); } 
const pageSize = 10; const startIndex = (page - 1) * pageSize; 
const paginatedPhotos = photos.slice(startIndex, startIndex + pageSize); res.json({ photos: paginatedPhotos, total: photos.length }); } 
catch (error) { res.status(500).json({ message: "Error fetching data from NASA API" }); } }); 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
