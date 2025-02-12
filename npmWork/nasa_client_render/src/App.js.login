import React, { useState } from "react"; 
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; 
import LoginPage from "./LoginPage"; 
import PhotoGallery from "./PhotoGallery"; 
function App() { const [user, setUser] = useState(localStorage.getItem("user") || null); 
return ( <Router> <Routes> <Route path="/login" element={<LoginPage setUser={setUser} />} /> 
<Route path="/gallery" element={user ? <PhotoGallery /> : <Navigate to="/login" />} /> 
<Route path="*" element={<Navigate to={user ? "/gallery" : "/login"} />} /> </Routes> </Router> ); } 
export default App;