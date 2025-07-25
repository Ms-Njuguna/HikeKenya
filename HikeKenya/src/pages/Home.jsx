import React, {useState, useRef, useEffect} from "react";
import Navbar from "../components/NavBar";
import TrailsContainer from '../components/Trails/TrailsContainer';
import TrailSearchBar from "../components/Trails/TrailSearchBar";
import { motion, useAnimation, useInView } from "framer-motion";


function Home({ trails, reviews }) {
    const [searchTerm, setSearchTerm] = useState("");
    const trailSectionRef = useRef(null);

    const filteredResults = trails.filter((trail) =>
      trail.title.toLowerCase().includes(searchTerm.toLowerCase()) 
    );

    function handleSearch(e) {
        setSearchTerm(e.target.value)
    }

    const scrollToTrails = () => {
    trailSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

    const textControls = useAnimation();
    const heroRef = useRef(null);
    const inView = useInView(heroRef, { once: true, margin: "-100px" });

    useEffect(() => {
      if (inView) {
          textControls.start("visible");
      }
    }, [inView, textControls]);

    return(
        <div>
            <Navbar />

            

      {/* Hero Section */}
      <section
        className="relative h-[70vh] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('https://i.pinimg.com/736x/f7/f0/32/f7f03239cdf53d42c9872f79da77bf39.jpg')` }}
        ref={heroRef}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-4xl mx-auto h-full flex flex-col justify-center items-start px-6 text-white">
          <motion.h1
            className="text-4xl md:text-5xl font-serif font-bold leading-tight text-[#FAF7F2] drop-shadow-lg"
            initial={{ x: -100, opacity: 0 }}
            animate={textControls}
            transition={{ duration: 1, delay: 0.2 }}
            variants={{
              visible: { x: 0, opacity: 1 },
            }}
          >
            Explore Kenya’s Most Breathtaking Luxury Trails
          </motion.h1>

          <motion.p
            className="mt-4 text-lg md:text-xl text-white/90 max-w-xl"
            initial={{ x: -100, opacity: 0 }}
            animate={textControls}
            transition={{ duration: 1, delay: 0.5 }}
            variants={{
              visible: { x: 0, opacity: 1 },
            }}
          >
            Guided, exclusive, and unforgettable. From Mt. Kenya peaks to coastal
            rainforest walks, your adventure begins here.
          </motion.p>

          <motion.button
            onClick={scrollToTrails}
            className="mt-6 px-6 py-3 bg-[#D4AF37] text-[#1F3B29] rounded-xl font-semibold shadow-md hover:bg-yellow-400 transition"
            initial={{ y: 30, opacity: 0 }}
            animate={textControls}
            transition={{ duration: 1, delay: 0.9 }}
            variants={{
              visible: { y: 0, opacity: 1 },
            }}
          >
            Discover Trails
          </motion.button>
        </div>
      </section>
            <div className="bg-[#FAF7F2]"><TrailSearchBar searchTerm={searchTerm} onSearch={handleSearch} /></div>
            <div className="bg-[#FAF7F2]"><TrailsContainer trails={filteredResults} reviews={reviews} /></div>
        </div>
    );
};

export default Home;