import React from "react";

const Error = () => {
  return (
    <div style={styles.main}>
      <p style={styles.text}>404 Not Found</p>
    </div>
  );
};

const styles = {
  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: "30px",
    color: "#3187ed",
  },
};

export default Error;
