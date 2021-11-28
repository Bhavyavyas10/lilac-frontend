import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirst] = useState("");
  const [last_name, setLast] = useState("");

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
    }),
  };

  const navigate = useNavigate();

  const signup = async () => {
    console.log(email, password);
    const submit = await fetch(
      "https://lilacecom.herokuapp.com/api/v1/register",
      requestOptions
    );
    const data_json = await submit.json();
    console.log(data_json);
    if (data_json.status === 201) {
      setEmail("");
      setPassword("");
      navigate("/login");
    } else {
      if (data_json.status === 404) {
        alert("All field is required");
        setFirst("");
        setLast("");
        setEmail("");
        setPassword("");
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div style={styles.main}>
      <center>
        <h1 style={{ color: "#3187ed" }}>Sign Up</h1>
      </center>
      <div style={styles.inputField}>
        <input
          placeholder="first name"
          onChange={(e) => setFirst(e.target.value)}
          style={styles.inputArea}
        />
      </div>
      <div style={styles.inputField}>
        <input
          placeholder="last name"
          onChange={(e) => setLast(e.target.value)}
          style={styles.inputArea}
        />
      </div>
      <div style={styles.inputField}>
        <input
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          style={styles.inputArea}
        />
      </div>
      <div style={styles.inputField}>
        <input
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          style={styles.inputArea}
        />
      </div>
      <div
        style={styles.button}
        onClick={() => {
          signup();
        }}
      >
        SUBMIT
      </div>
    </div>
  );
};

const styles = {
  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  inputField: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "50px 0",
    borderRadius: "5px",
    width: "300px",
    border: "1px solid #3187ed",
  },
  inputArea: {
    outline: "none",
    border: "none",
    padding: "10px 0",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "50px 0",
    width: "250px",
    background: "linear-gradient(45deg, #2EBAE4 30%, #8EE0CB 90%)",
    padding: "10px 0",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer",
  },
};

export default SignUp;
