import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  
    const handleSearch = (e) => {
      e.preventDefault();
      if (searchTerm.trim()) {
        setIsButtonDisabled(true); 
        navigate(`/search/${encodeURIComponent(searchTerm)}`);
        setTimeout(() => {
            setIsButtonDisabled(false);
          }, 6500);
      }
      
    };
  
    return (
        <div className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Price Hunter</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto w-100 d-flex justify-content-center">
              <li className="nav-item d-flex w-50">
                <form className="d-flex w-100" onSubmit={handleSearch}>
                  <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Search for products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ borderRadius: "20px", paddingLeft: "20px" }}
                  />
                  <button
                    className="btn btn-outline-primary px-4 py-2 ms-2"
                    type="submit"
                    style={{ borderRadius: "20px" }}
                    disabled={isButtonDisabled}
                  >
                    Search
                  </button>
                </form>
              </li>
            </ul>
          </div>
        </div>
      </div>
  
    );
  };
  

export default NavBar