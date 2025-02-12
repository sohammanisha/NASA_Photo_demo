import React, { useState, useEffect } from "react"; 
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; 
import LoginPage from "./LoginPage"; import PhotoGallery from "./PhotoGallery"; 
import LogoutPage from "./LogoutPage"; 
function App() { const [user, setUser] = useState(localStorage.getItem("user") || null); 
const [logoutTimer, setLogoutTimer] = useState(null); useEffect(() => { if (user) { startLogoutTimer(); } }, [user]); 
const startLogoutTimer = () => { if (logoutTimer) clearTimeout(logoutTimer); 
const timer = setTimeout(() => { alert("You have been logged out due to inactivity."); handleLogout(); }, 10 * 60 * 1000); // 10 minutes 
setLogoutTimer(timer); }; 
const handleLogout = () => { localStorage.removeItem("user"); setUser(null); if (logoutTimer) clearTimeout(logoutTimer); }; return ( <Router> <Routes> 
<Route path="/login" element={<LoginPage setUser={setUser} />} /> <Route path="/gallery" element={user ? <PhotoGallery resetTimer={startLogoutTimer} /> : <Navigate to="/login" />} /> 
<Route path="/logout" element={<LogoutPage onLogout={handleLogout} />} /> 
<Route path="*" element={<Navigate to={user ? "/gallery" : "/login"} />} /> 
</Routes> </Router> ); } export default App;