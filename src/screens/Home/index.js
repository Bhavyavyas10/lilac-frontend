import React, { useState, useEffect } from "react";
import Loaders from "../../Helper/Loader";
import Grid from "@material-ui/core/Grid";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [disable, setDisable] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await fetch("https://lilacecom.herokuapp.com/api/v1/products");
    const data_json = await data.json();
    setProducts(data_json.data);
    console.log(data_json.data);
  };

  const add = async (product_id) => {
    const tok = localStorage.getItem("token");
    const u = localStorage.getItem("uid");
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", "x-access-token": tok },
    };
    if (tok) {
      const submit = await fetch(
        `https://lilacecom.herokuapp.com/api/v1/add/?user_id=${u}&product_id=${product_id}`,
        requestOptions
      );
      const sub_json = await submit.json();
      if (sub_json.status === 201) {
        setDisable(false);
      } else {
        setDisable(false);

        navigate("/error");
      }
    } else {
      setDisable(false);
      navigate("/login");
    }
  };

  return (
    <div>
      {products.length === 0 && (
        <div style={styles.loaderPos}>
          <Loaders />
        </div>
      )}
      <Grid
        container
        spacing={{ xs: 12, md: 3 }}
        columns={{ xs: 12, sm: 8, md: 12 }}
      >
        {products.map((o, index) => (
          <Grid item xs={12} sm={4} md={4} style={styles.productSection}>
            {console.log("From Grid", o)}
            <div style={styles.productContainer}>
              <div styl={styles.imageContainer}>
                <img
                  src={o.productphoto}
                  alt="product"
                  style={styles.imageSize}
                />
              </div>
              <center>
                <p style={{ color: "#3187ed" }}>{o.productname} </p>
              </center>
              <center>
                <p style={{ color: "#3187ed" }}>${o.originalproductprice} </p>
              </center>
              {disable ? (
                <div style={styles.cartButtonDisabled}>Add to cart</div>
              ) : (
                <div
                  style={styles.cartButton}
                  onClick={() => {
                    setDisable(true);
                    add(o._id);
                  }}
                >
                  Add to cart
                </div>
              )}
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const styles = {
  loaderPos: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "300px",
  },
  productSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  productContainer: {
    display: "flex",
    flexDirection: "column",
    height: "350px",
    width: "180px",
    borderRadius: "5px",
    marginTop: "20px",
  },
  imageContainer: {
    display: "flex",
    height: "150px",
    width: "180px",
    borderBottomLeftRadius: "5px",
    borderBottomRightRadius: "5px",
  },
  imageSize: {
    height: "150px",
    width: "180px",
  },
  price: {
    color: "#3187ed",
    fontSize: "18px",
  },
  cartButton: {
    margin: "10px",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #3187ed",
    color: "#3187ed",
    cursor: "pointer",
  },
  cartButtonDisabled: {
    margin: "10px",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #3187ed",
    color: "#3187ed",
    cursor: "progress",
  },
};

export default HomePage;
