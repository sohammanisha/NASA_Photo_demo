import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import ReactPaginate from "react-paginate";
import * as d3 from 'd3';

import { useNavigate } from "react-router-dom";
function PhotoGallery({ resetTimer }) { const [photos, setPhotos] = useState([]);
    const [search, setSearch] = useState("");
    const [date, setDate] = useState("");
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [statisticsForSearchedPhotoes, setStatisticsForSearchedPhotoes] = useState("");

    const [showExplanations, setShowExplanations] = useState({});
    const navigate = useNavigate();
    useEffect(() => { fetchPhotos(); }, [search, date, page]);
    useEffect(() => {
        if (statisticsForSearchedPhotoes) {
            renderChart(statisticsForSearchedPhotoes);
        }
    }, [statisticsForSearchedPhotoes]);

    const fetchPhotos = async () =>
    {
        setLoading(true);
        console.log(`Fetching photos with search: "${search}", date: "${date}", page: ${page}`);
        axios .get("https://nasa-photo-demo.onrender.com/api/photos",
            { params: { search, date, page } }).then((response) =>
        {
            console.log("API Response:", response.data);
            setPhotos(response.data.photos);
            setTotal(response.data.total);
            setStatisticsForSearchedPhotoes(response.data.stats) ;
            setLoading(false);
        }).catch((error) =>
        { console.error("Error fetching data:", error);
            setLoading(false);
        });
    };


    const renderChart = (stats) => {
        const data = Object.entries(stats.yearlyDistribution).map(([year, count]) => ({
            year,
            count,
        }));

        // Clear any existing chart before rendering a new one
        d3.select('#chart').selectAll("*").remove();

        const width = 400;
        const height = 300;
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };

        const svg = d3.select('#chart')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        const x = d3.scaleBand()
            .domain(data.map(d => d.year))
            .range([margin.left, width - margin.right])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.count)]).nice()
            .range([height - margin.bottom, margin.top]);

        svg.append('g')
            .selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', d => x(d.year))
            .attr('y', d => y(d.count))
            .attr('width', x.bandwidth())
            .attr('height', d => height - margin.bottom - y(d.count))
            .attr('fill', 'steelblue');

        // Add X-axis
        svg.append('g')
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x))
            .selectAll('text')
            .attr('transform', 'rotate(-45)')
            .attr('text-anchor', 'end');

        // Add Y-axis
        svg.append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(y));

        svg.append('text')
            .attr('x', width / 2)
            .attr('y', margin.top)
            .attr('text-anchor', 'middle')
            .attr('font-size', '16px')
            .text('Yearly Distribution of Photos');
    };





    const handleSearchChange = (e) =>
    {
        setSearch(e.target.value); setPage(1); resetTimer();
    };
    const handleDateChange = (e) => { setDate(e.target.value); setPage(1); resetTimer(); };
    const handlePageClick = ({ selected }) => { setPage(selected + 1); resetTimer(); };
    const toggleExplanation = (index) => { setShowExplanations((prev) => ({ ...prev, [index]: !prev[index], })); };
    const handleLogout = () => {
        localStorage.removeItem("user"); navigate("/logout");
    };
    return (
        <div id="parent" style={{ textAlign: "center", padding: "20px" }}>
            <div style={{ textAlign: "center", padding: "20px", align: "left"}} >
                <h1>Welcome {localStorage.getItem("user")} to  NASA Photo Gallery
                </h1>
                <button onClick={handleLogout} style={{ marginBottom: "20px" }}>Logout</button> {/* Search Filters */}
                <div style={{ marginBottom: "20px" }}>
                    <input
                        type="text"
                        placeholder="Search by title"
                        value={search}
                        onChange={handleSearchChange}
                        style={{ padding: "8px", marginRight: "10px" }}
                    />
                </div>

                {/* Loading Spinner */}

                {loading ? ( <p>Loading, Please Wait...</p> ) :
                    (
                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                            {
                                <table border="1" style={{ width: "80%", borderCollapse: "collapse" }}>
                                    <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Image</th>
                                        <th>Show/Hide Details</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        photos.map(
                                            (photo, index) => (
                                                <tr key={index}>

                                                    <td>{photo.title}</td>
                                                    <td><img src={photo.url} alt={photo.title} style={{ width: "70%", borderRadius: "10px" }} /></td>
                                                    <td>
                                                        <button onClick={() => toggleExplanation(index)} style={{ marginTop: "10px" }}> {showExplanations[index] ? "Hide Details" : "Show Details"}
                                                        </button> {showExplanations[index] &&
                                                        <p>{photo.title+ " is shown with explanation: " + photo.explanation + " Location is in: " + photo.url}
                                                        </p>}
                                                    </td>

                                                </tr>
                                            )
                                        )
                                    }
                                    </tbody>
                                </table>



                            }
                        </div>
                    )}
                {/* Pagination */}

                <div style={{ textAlign: "center", padding: "20px", align: "right"}} >
                    <h3>Yearly Distribution of Photoes</h3>
                    <div id="chart"></div>
                    <ReactPaginate previousLabel={"← Previous"} nextLabel={"Next →"} pageCount={Math.ceil(total / 10)}
                                   onPageChange={handlePageClick} containerClassName={"pagination"} activeClassName={"active"} />
                </div>


            </div>

        </div>
    );
}
export default PhotoGallery;
