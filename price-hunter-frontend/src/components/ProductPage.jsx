import React from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const location = useLocation();
  const product = location.state?.product;
  const [loading, setLoading] = useState(true);
  const [prices, setPrices] = useState();

  if (!product) {
    return <p className="text-danger">Product details not available.</p>;
  }

  useEffect(() => {
    const fetchPrices = async () => {
      if (!product) return;

      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/productPrice`,
          {
            headers: { "Content-Type": "application/json" },
            params: { ean: product.ean, title: product.title },
          }
        );
        console.log("response prices", response.data.prices);
        const validPrices =
          response.data.prices?.filter((item) => {
            return item.data?.price && item.data?.productLink;
          }) || [];
        setPrices(validPrices);
        console.log("valid prices", validPrices);
        setLoading(false);
      } catch (error) {
        console.log("ERROR", error);
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

      {loading ? (
        <p className="text-muted mt-4 fw-bold fs-5">
          Loading price data, please wait...
        </p>
      ) : prices?.length > 0 ? (
        prices.map((webstore, index) => (
          <div
            key={index}
            className="mt-4 d-flex justify-content-center align-items-center"
          >
            <h3 className="mb-0 me-3">
              {webstore.shop} Price: {webstore.data.price}
            </h3>
            <Link
              to={webstore.data.productLink}
              className="btn btn-primary mt-3"
            >
              View on {webstore.shop}
            </Link>
          </div>
        ))
      ) : (
        <p className="text-muted mt-4 fw-bold fs-5">No prices available.</p>
      )}
    </div>
  );
};

export default ProductPage;
