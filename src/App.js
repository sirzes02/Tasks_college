import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./components/Home";
import Dash from "./components/Dash";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Router>
        <Switch>
          <Route exact path="/home" component={Dash} />
          <Route exact path="/" component={Home} />
          <Route component={Home} />
        </Switch>
      </Router>
      <Footer />
    </AuthProvider>
  );
}

export default App;
