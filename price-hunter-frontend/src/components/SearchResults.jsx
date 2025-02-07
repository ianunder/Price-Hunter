import React, {useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const SearchResults = () => {

  const { searchTerm } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!searchTerm) return;

      try {
        setLoading(true);

        const response = await axios.get(`http://localhost:3000/api/searchItem`, {
          headers: { "Content-Type": "application/json" },
          params: {productName: searchTerm},
        });
          
        setProducts(response.data.items || []);  
      } catch (error) {
        console.log("ERROR" , error)
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm]);


  return (
    
    <div className="container mt-5">
      <h2 className="text-primary mb-4">Search Results for: "{searchTerm}"</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.ean} className="col-md-4 col-sm-6 mb-4">
              <Link to={`/product/${product.ean}`} className="text-decoration-none">
                <div className="card shadow-sm text-center p-3">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="card-img-top img-fluid"
                    style={{ maxHeight: "200px", objectFit: "contain" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-dark">{product.title}</h5>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No products found for "{searchTerm}".</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;