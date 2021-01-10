import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./context/PrivateRoutes";
import Init from "./views/Init";
import Home from "./views/Home";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import Error404 from "./views/Error404";
import Profile from "./views/Profile";
import ChangePhoto from "./views/ChangePhoto";
import NewClass from "./views/NewClass";

function App() {
  return (
    <div className="body">
      <AuthProvider>
        <Router>
          <NavBar />
          <Switch>
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/profile/photo" component={ChangePhoto} />
            <PrivateRoute exact path="/new_class" component={NewClass} />
            <Route exact path="/" component={Init} />
            <Route component={Error404} />
          </Switch>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
