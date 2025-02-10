import React from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const location = useLocation();
  const product = location.state?.product;
  const [error, setError] = useState("");
  const [amazonData, setAmazonData] = useState();

  if (!product) {
    return <p className="text-danger">Product details not available.</p>;
  }

  useEffect(() => {
    const fetchPrices = async () => {
      if (!product) return;

      try {
        const response = await axios.get(
          `http://localhost:3000/api/productPrice`,
          {
            headers: { "Content-Type": "application/json" },
            params: { query: product.ean },
          }
        );
        setAmazonData(response.data.amazonData);
      } catch (error) {
        console.log("ERROR", error);
        setError("Failed to fetch prices.");
      }
    };

    fetchPrices();
  }, [product]);

  return (
    <div className="container mt-5 text-center">
      <h2 className="text-primary">{product.title}</h2>
      <img
        src={product.images?.[0] || "https://via.placeholder.com/200"}
        alt={product.title}
        className="img-fluid"
        style={{ maxHeight: "300px", objectFit: "contain" }}
      />
      <p>UPC / EAN: {product.ean}</p>

      <Link to="/" className="btn btn-secondary mt-3">
        Back to Search
      </Link>
      <div>
        <h1>Amazon Price = {amazonData?.price}</h1>
        <Link to={amazonData?.productLink} className="btn btn-secondary mt-3">
        Go to product
        </Link>
       </div>
    </div>
  );
};

export default ProductPage;
