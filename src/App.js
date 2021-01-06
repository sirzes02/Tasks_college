import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./context/PrivateRoutes";
import Init from "./views/Init";
import Home from "./components/Home";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import Error404 from "./views/Error404";
import Profile from "./views/Profile";

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Switch>
          <PrivateRoute path="/home" component={Home} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route exact path="/" component={Init} />
          <Route component={Error404} />
        </Switch>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
