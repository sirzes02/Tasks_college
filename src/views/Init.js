import React, { useContext } from "react";
import {
  app,
  githubAuthProvider,
  googleAuthProvider,
} from "../database/firebase";
import { AuthContext } from "../context/AuthContext";
import { Redirect } from "react-router-dom";
import { Error } from "../resources/Error";
import logo from "../images/logo.svg";
import google from "../images/google.svg";
import github from "../images/github.svg";
import Register from "../components/Register";
import Login from "../components/Login";

const Init = () => {
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/home" />;
  }

  const socialRegister = async (provider) => {
    await app
      .auth()
      .signInWithPopup(provider)
      .then((result) => console.log(result))
      .catch((err) => Error(err));
  };

  return (
    <div className="Init container">
      <div className="row my-5">
        <div className="col-8">
          <div className="text-center">
            <img src={logo} className="img-fluid" alt="logo" />
          </div>
        </div>
        <div className="col-4 align-self-center">
          <ul className="nav nav-tabs mr-5" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                id="home-tab"
                data-bs-toggle="tab"
                href="#home"
                role="tab"
                aria-controls="home"
                aria-selected="true">
                Sign in
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
                aria-selected="false">
                Sign up
              </a>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab">
              <Login />
            </div>
            <div
              className="tab-pane fade show active"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab">
              <Register />
            </div>
          </div>
          <hr className="mt-4"></hr>
          <div className="row">
            <div className="col-6">
              <button
                type="button"
                className="btn btn btn-outline-primary w-100"
                onClick={() => socialRegister(googleAuthProvider)}>
                <img
                  src={google}
                  width="20"
                  height="20"
                  alt="google-logo"></img>
              </button>
            </div>
            <div className="col-6">
              <button
                type="button"
                className="btn btn btn-outline-primary w-100"
                onClick={() => socialRegister(githubAuthProvider)}>
                <img
                  src={github}
                  width="20"
                  height="20"
                  alt="github-logo"></img>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Init;
