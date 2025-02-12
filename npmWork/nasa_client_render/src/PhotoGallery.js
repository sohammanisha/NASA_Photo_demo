import React, { useEffect, useState } from "react"; 
import axios from "axios"; 
import moment from "moment"; 
import ReactPaginate from "react-paginate"; 
import { useNavigate } from "react-router-dom"; 
function PhotoGallery({ resetTimer }) { const [photos, setPhotos] = useState([]); 
const [search, setSearch] = useState(""); const [date, setDate] = useState(""); 
const [page, setPage] = useState(1); const [total, setTotal] = useState(0); 
const [loading, setLoading] = useState(false); const [showExplanations, setShowExplanations] = useState({}); 
const navigate = useNavigate(); useEffect(() => { fetchPhotos(); }, [search, date, page]); 
const fetchPhotos = () => { setLoading(true); axios .get("http://localhost:5000/api/photos", { params: { search, date, page } }).then((response) => { 
setPhotos(response.data.photos); setTotal(response.data.total); setLoading(false); }).catch((error) => { console.error("Error fetching data:", error); setLoading(false); }); }; 
const handleSearchChange = (e) => { setSearch(e.target.value); setPage(1); resetTimer(); }; 
const handleDateChange = (e) => { setDate(e.target.value); setPage(1); resetTimer(); }; 
const handlePageClick = ({ selected }) => { setPage(selected + 1); resetTimer(); }; 
const toggleExplanation = (index) => { setShowExplanations((prev) => ({ ...prev, [index]: !prev[index], })); }; 
const handleLogout = () => { localStorage.removeItem("user"); navigate("/logout"); }; 
return ( <div style={{ textAlign: "center", padding: "20px" }}> 
<h1>NASA Photo Gallery</h1> <button onClick={handleLogout} 
style={{ marginBottom: "20px" }}>Logout</button> {/* Search Filters */} 
<div style={{ marginBottom: "20px" }}> 
<input type="text" placeholder="Search by title" value={search} onChange={handleSearchChange} style={{ padding: "8px", marginRight: "10px" }} /> 
<input type="date" value={date} onChange={handleDateChange} style={{ padding: "8px" }} /> </div> {/* Loading Spinner */} 
{loading ? ( <p>Loading, Please Wait...</p> ) : ( <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}> {photos.map((photo, index) => ( 
<div key={index} style={{ margin: "20px", maxWidth: "400px" }}> 
<h3>{photo.title}</h3> <img src={photo.url} alt={photo.title} style={{ width: "100%", borderRadius: "10px" }} /> 
<button onClick={() => toggleExplanation(index)} style={{ marginTop: "10px" }}> {showExplanations[index] ? "Hide Explanation" : "Show Explanation"} 
</button> {showExplanations[index] && <p>{photo.explanation}</p>} </div> ))} </div> )} {/* Pagination */} 
<ReactPaginate previousLabel={"← Previous"} nextLabel={"Next →"} pageCount={Math.ceil(total / 10)} 
onPageChange={handlePageClick} containerClassName={"pagination"} activeClassName={"active"} /> </div> ); } 
export default PhotoGallery;
