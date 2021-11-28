import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import Grid from "@material-ui/core/Grid";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [products, setProducts] = useState([]);

  const [disable, setDisable] = useState(false);

  const [click, setClick] = useState(0);

  useEffect(() => {
    fetchCarts();
  }, []);

  const navigate = useNavigate();

  const fetchCarts = async () => {
    const tok = localStorage.getItem("token");
    const u = localStorage.getItem("uid");
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", "x-access-token": tok },
    };
    if (tok) {
      const submit = await fetch(
        `https://lilacecom.herokuapp.com/api/v1/get/?user_id=${u}`,
        requestOptions
      );
      const sub_json = await submit.json();
      if (sub_json.status === 200) {
        setProducts(sub_json.data);
      } else {
        navigate("/error");
      }
    } else {
      navigate("/login");
    }
  };

  const removeCart = async (cart_id) => {
    const tok = localStorage.getItem("token");
    const u = localStorage.getItem("uid");
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", "x-access-token": tok },
    };
    if (tok) {
      const submit = await fetch(
        `https://lilacecom.herokuapp.com/api/v1/release/?user_id=${u}&cart_id=${cart_id}`,
        requestOptions
      );
      const sub_json = await submit.json();
      if (sub_json.status === 201) {
        alert("item removed successfully");
        setDisable(false);
        fetchCarts();
      } else {
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
          <Loader
            type="BallTriangle"
            color="#3187ed"
            height={100}
            width={100}
            visible={true}
            timeout={1500}
          />
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
                  src={o.productuid.productphoto}
                  alt="product"
                  style={styles.imageSize}
                />
              </div>
              <center>
                <p style={{ color: "#3187ed" }}>{o.productuid.productname} </p>
              </center>
              <center>
                <p style={{ color: "#3187ed" }}>{o.count} </p>
              </center>
              <center>
                <p style={{ color: "#3187ed" }}>
                  ${o.productuid.originalproductprice * o.count}
                </p>
              </center>
              {disable ? (
                <div style={styles.cartButtonDisabled}>Remove Item</div>
              ) : (
                <div
                  style={styles.cartButton}
                  onClick={() => {
                    setClick(click + 1);
                    setDisable(true);
                    removeCart(o._id);
                  }}
                >
                  Remove Item
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
export default Cart;
