import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./context/PrivateRoutes";
import Init from "./components/Init";
import Home from "./components/Home";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Router>
        <Switch>
          <PrivateRoute path="/home" component={Home} />
          <Route exact path="/" component={Init} />
          <Route component={Init} />
        </Switch>
      </Router>
      <Footer />
    </AuthProvider>
  );
}

export default App;
