import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function LoginPage({ setUser }) { const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response =
                await axios.post("https://nasa-photo-demo.onrender.com/api/login", { username, password });
            localStorage.setItem("user", response.data.username);
            setUser(response.data.username);
            navigate("/gallery");
        }
        catch (err) {
            setError("Invalid username or password");
        }
    };
    return ( <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Login to view NASA Photo Gallery</h2>
        <img src='./staticImages/M78wideHiggins1024.jpg' alt="" width="450" height="400" />
        <form onSubmit={handleLogin}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} style={{ padding: "8px", margin: "5px" }} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: "8px", margin: "5px" }} />
            <button type="submit" style={{ padding: "8px 20px", marginTop: "10px" }}> Login </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>} </div> ); }
export default LoginPage;

