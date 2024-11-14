// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import './CarList.css'; // Import your styles

// const CarListPage = () => {
//   const [cars, setCars] = useState([]);
//   const [filteredCars, setFilteredCars] = useState([]);
//   const [searchQuery, setSearchQuery] = useState(''); // State to store search query

//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         // Get the token from localStorage
//         const token = localStorage.getItem('token');

//         if (!token) {
//           // Handle case where the user is not authenticated
//           console.log('User is not authenticated');
//           return;
//         }

//         // Fetch cars with authentication (pass token in headers)
//         const response = await axios.get('http://localhost:5000/api/cars', {
//           headers: {
//             Authorization: `Bearer ${token}`, // Include token in the Authorization header
//           },
//         });

//         // Set cars data to state
//         setCars(response.data);
//         setFilteredCars(response.data); // Initially, display all cars
//       } catch (error) {
//         console.error('Error fetching cars:', error);
//       }
//     };

//     fetchCars();
//   }, []);

//   useEffect(() => {
//     // Filter cars whenever searchQuery changes
//     if (searchQuery) {
//       const lowercasedQuery = searchQuery.toLowerCase();
//       const filtered = cars.filter((car) =>
//         car.title.toLowerCase().includes(lowercasedQuery) ||
//         car.description.toLowerCase().includes(lowercasedQuery)
//       );
//       setFilteredCars(filtered);
//     } else {
//       // If no search query, show all cars
//       setFilteredCars(cars);
//     }
//   }, [searchQuery, cars]); // Re-filter cars when searchQuery or cars change

//   // Handle search input change
//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   return (
//     <div>
//       {/* Banner Section */}
//       <div className="home-container justify-content-center align-items-center">

//         <div className="input-g col-md-12 mb-3">
//           <h1>Welcome to Car Management</h1>
//           <div className="input-group w-100">
//             <input
//               type="text"
//               className="form-control form-control-lg"
//               placeholder="Search for a car..."
//               value={searchQuery} // Bind search query to the input
//               onChange={handleSearchChange} // Update query on input change
//             />
           
//           </div>
//         </div>

//         <div className="row container" style={{margin:"auto"}}>
//           {filteredCars.length > 0 ? (
//             filteredCars.map((car) => (
//               <div className="col-md-4" key={car._id}>
//                 <div className="card">
//                   <img
//                     src={`http://localhost:5000/${car.images[0]}`}
//                     alt={car.title}
//                     className="card-img-top"
//                   />
//                   <div className="card-body">
//                     <h5 className="card-title">{car.title}</h5>
//                     <p className="card-text">{car.description.substring(0, 50)}...</p>
//                     <Link to={`/car/${car._id}`} className="btn btn-primary">View Details</Link>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <h2>No cars found</h2>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CarListPage;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CarList.css'; // Import the styles

const API_BASE_URL = process.env.API_BACKEND;


const CarListPage = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State to store search query

  useEffect(() => {
    const fetchCars = async () => {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem('token');

        if (!token) {
          console.log('User is not authenticated');
          return;
        }

        // Fetch cars with authentication
        const response = await axios.get('${API_BASE_URL}/api/cars', {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the Authorization header
          },
        });

        // Set cars data to state
        setCars(response.data);
        setFilteredCars(response.data); // Initially, display all cars
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    // Filter cars whenever searchQuery changes
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = cars.filter((car) =>
        car.title.toLowerCase().includes(lowercasedQuery) ||
        car.description.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredCars(filtered);
    } else {
      // If no search query, show all cars
      setFilteredCars(cars);
    }
  }, [searchQuery, cars]); // Re-filter cars when searchQuery or cars change

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Reset search query
  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="car-list-container">
      <div className="home-banner">
        <h1>Welcome to Car Management</h1>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search for a car..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={handleClearSearch}>
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="car-cards-container">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <div className="car-card" key={car._id}>
              <img
                src={`${API_BASE_URL}/${car.images[0]}`}
                alt={car.title}
                className="car-card-img"
              />
              <div className="car-card-body">
                <h5 className="car-card-title">{car.title}</h5>
                <p className="car-card-text">
                  {car.description.substring(0, 50)}...
                </p>
                <Link to={`/car/${car._id}`} className="view-details-btn">
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <h2>No cars found</h2>
        )}
      </div>
    </div>
  );
};

export default CarListPage;
