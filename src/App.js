import React from "react";
import Header from "./screens/Header";
import HomePage from "./screens/Home";
import SignIn from "./screens/Auth/signin";
import SignUp from "./screens/Auth/signup";
import Cart from "./screens/Cart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <HomePage />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Header />
              <SignIn />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Header />
              <SignUp />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Header />
              <Cart />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
