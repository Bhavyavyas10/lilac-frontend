import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.headerBody}>
      <div
        onClick={() => {
          navigate("/");
        }}
        style={{ cursor: "pointer" }}
      >
        <h3 style={styles.text}>Lilac Ecom</h3>
      </div>
      <div style={styles.buttonPannel}>
        <Link to="/login">
          <div style={styles.button}>
            <h3 style={styles.buttonText}>Log In</h3>
          </div>
        </Link>
        <Link to="/register">
          <div style={styles.button}>
            <h3 style={styles.buttonText}>Register</h3>
          </div>
        </Link>
        <Link to="/cart">
          <div style={styles.button}>
            <h3 style={styles.buttonText}>Cart</h3>
          </div>
        </Link>
        <div
          style={styles.button}
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("uid");
            alert("User Logged Out");
          }}
        >
          <h3 style={styles.buttonText}>Log Out</h3>
        </div>
      </div>
    </div>
  );
};

const styles = {
  headerBody: {
    backgroundColor: "#3187ED",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  buttonPannel: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "10px",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: "10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  content_one: {
    display: "flex",
    alignItems: "center",
    margin: "0px 250px",
  },
  content_two: {
    display: "flex",
    alignItems: "center",
  },
  text: {
    padding: "0px 10px",
    color: "white",
    fontSize: "30px",
    textDecoration: "none",
  },
  buttonText: {
    padding: "5px",
    color: "#3187ed",
    textDecoration: "none",
  },
  displays: {
    display: "flex",
    alignItems: "center",
    padding: "0px 10px",
  },
};

export default Header;
