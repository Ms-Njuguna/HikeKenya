import React from "react";
import Navbar from "../components/NavBar";
import TrailsContainer from '../components/Trails/TrailsContainer';


function Home({ trails, reviews }) {
    return(
        <div>
           <Navbar />
           <h1>This is the Home Page or Landing Page</h1> 
           <TrailsContainer trails={trails} reviews={reviews} />
        </div>
    );
};

export default Home;