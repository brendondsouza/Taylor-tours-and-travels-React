import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";
import Header from './Header'
import Footer from './Footer'

const url = "https://course-api.com/react-tours-project";
function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(false);
      setTours(tours);
      console.log(tours);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <main>
          <Loading />
        </main>
        <Footer />
      </>
      
    );
  }
  if (tours.length === 0) {
    return (
      <>
        <Header />
        <main>
          <div className="title">
            <h2>No tours left. 
              Please visit us again to find more travel deals! </h2>
            <button className="btn" onClick={fetchTours}>
              Refresh
            </button>
          </div>
        </main>
        <Footer />
        </>
    );
  }
  return (
    <>
      <Header />
      <main>
        <Tours tours={tours} removeTour={removeTour} />
      </main>
      <Footer />
    </>
   
  );
}

export default App;
