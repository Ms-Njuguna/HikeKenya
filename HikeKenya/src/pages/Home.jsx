import React, {useState} from "react";
import Navbar from "../components/NavBar";
import TrailsContainer from '../components/Trails/TrailsContainer';
import TrailSearchBar from "../components/Trails/TrailSearchBar";


function Home({ trails, reviews }) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredResults = trails.filter((trail) =>
      trail.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function handleSearch(e) {
        setSearchTerm(e.target.value)
    }

    return(
        <div>
           <Navbar />
           <TrailSearchBar searchTerm={searchTerm} onSearch={handleSearch} />
           <h1>This is the Home Page or Landing Page</h1> 
           <TrailsContainer trails={filteredResults} reviews={reviews} />
        </div>
    );
};

export default Home;