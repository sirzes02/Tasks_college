import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import logo from "../images/logo.svg";
import Register from "./Register";

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="Home">
      <div className="row my-5">
        <div className="col-md-8">
          <div className="text-center">
            <img src={logo} className="img-fluid" alt="logo" />
          </div>
        </div>
        <div className="col-md-3 align-self-center">
          <ul className="nav nav-tabs mr-5" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                id="home-tab"
                data-bs-toggle="tab"
                href="#home"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                Sing in
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link active"
                id="profile-tab"
                data-bs-toggle="tab"
                href="#profile"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >
                Sing up
              </a>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              ...
            </div>
            <div
              className="tab-pane fade show active"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <Register />
            </div>
          </div>
        </div>
        <div className="col-md-1" />
      </div>
    </div>
  );
};

export default Home;
