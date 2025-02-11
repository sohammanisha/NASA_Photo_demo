import React, { useEffect } from "react"; 
import { useNavigate } from "react-router-dom"; 
function LogoutPage({ onLogout }) { 
const navigate = useNavigate(); useEffect(() => { onLogout(); navigate("/login"); }, [onLogout, navigate]); 
return <h2>Logging out...</h2>; } 
export default LogoutPage;