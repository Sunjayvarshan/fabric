import React, { useEffect, useState } from "react";
import styles from "./../styles/Dashboard.module.css";
import DashNav from "./../components/DashNav";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("http://localhost:8000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/api/products/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
      toast.success(`product removed`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <DashNav />
      <div className={styles.dashboard_title}>
        Customize what you want to sell
      </div>
      <div className={styles.main}>
        {products.map((product) => (
          <li key={product._id} className={styles.product_card}>
            <img
              className={styles.product_image}
              src="./cover.jpg"
              alt={product.name}
            />
            <div className={styles.product_details}>
              <h2 className={styles.product_name}>{product.name}</h2>
              <p className={styles.product_description}>
                {product.description}
              </p>
              <p className={styles.product_price}>Price: ${product.price}</p>
              {/* <p>quantity: ${product.quantity}</p> */}
              <button
                className={styles.delete_button}
                onClick={() => handleDelete(product._id)}
              >
                X
              </button>
            </div>
          </li>
        ))}
      </div>
      <Toaster />
    </>
  );
}

export default Dashboard;
