require("dotenv").config(); 
const express = require("express"); 
const axios = require("axios"); 
const cors = require("cors"); 
const bcrypt = require("bcryptjs"); 
const moment = require("moment"); 
const app = express(); 
const PORT = process.env.PORT || 5000; 
const NASA_API_KEY = process.env.NASA_API_KEY; 
const NASA_APOD_URL = "https://api.nasa.gov/planetary/apod"; app.use(cors()); app.use(express.json()); 
// Dummy Users List 
const users = [ { username: "admin", password: bcrypt.hashSync("admin123", 10) }, { username: "user1", password: bcrypt.hashSync("password", 10) }, ]; 
// Login Route 
app.post("/api/login", (req, res) => { const { username, password } = req.body; const user = users.find((u) => u.username === username); 
if (!user || !bcrypt.compareSync(password, user.password)) { return res.status(401).json({ message: "Invalid username or password" }); } 
res.json({ message: "Login successful", username }); }); 
// Fetch Photos Route 
app.get("/api/photos", async (req, res) => { try { const { search, date, page = 1 } = req.query; 
const count = 50; 
const response = await axios.get(`${NASA_APOD_URL}?api_key=${NASA_API_KEY}&count=${count}`); 
let photos = response.data; if (search) { photos = photos.filter(photo => photo.title.toLowerCase().includes(search.toLowerCase())); } 
if (date) { photos = photos.filter(photo => moment(photo.date).isSame(date, "day")); } 
const pageSize = 10; const startIndex = (page - 1) * pageSize; 
const paginatedPhotos = photos.slice(startIndex, startIndex + pageSize); 
res.json({ photos: paginatedPhotos, total: photos.length }); } catch (error) { res.status(500).json({ message: "Error fetching data from NASA API" }); } }); 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
