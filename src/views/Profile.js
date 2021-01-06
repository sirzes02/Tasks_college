import React, { useState, useContext, useEffect } from "react";
import { app } from "../database/firebase";
import { photos, noImage } from "../resources/ProfilePhotos";
import { AuthContext } from "../context/AuthContext";
import {
  instagram,
  facebook,
  twitter,
  github,
  web,
  pen,
} from "../resources/Logos";
import Swal from "sweetalert2";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [photo, setPhoto] = useState(noImage);
  const [name, setName] = useState(null);

  useEffect(() => {
    const profilePhoto = currentUser.photoURL;

    if (profilePhoto) {
      setPhoto(profilePhoto);
    } else {
      app
        .firestore()
        .collection("user")
        .doc(currentUser.uid)
        .get()
        .then((result) => setPhoto(photos[result.data().photo]))
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: err,
          });
        });
    }

    setName(
      currentUser.displayName ? currentUser.displayName : currentUser.email
    );
  }, [currentUser]);

  return (
    <div className="container my-5">
      <div className="main-body">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src={photo}
                    alt="user"
                    className="rounded-circle"
                    width={150}
                  />
                  <div className="mt-3">
                    <h4>{name}</h4>
                    <div className="row">
                      <div className="col-1">{pen}</div>
                      <div className="col">
                        <p className="text-secondary mb-1">
                          Universidad Santiago de Cali
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-1">{pen}</div>
                      <div className="col">
                        <p className="text-muted font-size-sm">
                          Cali, Colombia
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mt-3">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0 row">
                    <div className="col-1 mr-1">{web}</div>
                    <div className="col">Website</div>
                  </h6>
                  <span className="text-secondary">https://bootdey.com</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0 row">
                    <div className="col-1 mr-1">{github}</div>
                    <div className="col">Github</div>
                  </h6>
                  <span className="text-secondary">bootdey</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0 row">
                    <div className="col-1 mr-1">{twitter}</div>
                    <div className="col">Twitter</div>
                  </h6>
                  <span className="text-secondary">@bootdey</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0 row">
                    <div className="col-1 mr-1">{instagram}</div>
                    <div className="col">Instagram</div>
                  </h6>
                  <span className="text-secondary">bootdey</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0 row">
                    <div className="col-1 mr-1">{facebook}</div>
                    <div className="col">Facebook</div>
                  </h6>
                  <span className="text-secondary">bootdey</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Email</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {currentUser.email}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <div className="row">
                      <div className="col">
                        <h6 className="mb-0">Mobile</h6>
                      </div>
                      <div className="col-1">{pen}</div>
                    </div>
                  </div>
                  <div className="col-sm-9 text-secondary">(320) 380-4539</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <div className="row">
                      <div className="col">
                        <h6 className="mb-0">Adress</h6>
                      </div>
                      <div className="col-1">{pen}</div>
                    </div>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    Bay Area, San Francisco, CA
                  </div>
                </div>
              </div>
            </div>
            <div className="gutters-sm">
              <div className="mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h6 className="d-flex align-items-center mb-3">
                      <i className="material-icons text-info mr-2">
                        assignment
                      </i>
                      Project Status
                    </h6>
                    <small>Web Design</small>
                    <div className="progress mb-3" style={{ height: "5px" }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "80%" }}
                        aria-valuenow={80}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <small>Website Markup</small>
                    <div className="progress mb-3" style={{ height: "5px" }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "72%" }}
                        aria-valuenow={72}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <small>One Page</small>
                    <div className="progress mb-3" style={{ height: "5px" }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "89%" }}
                        aria-valuenow={89}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <small>Mobile Template</small>
                    <div className="progress mb-3" style={{ height: "5px" }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "55%" }}
                        aria-valuenow={55}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <small>Backend API</small>
                    <div className="progress mb-3" style={{ height: "5px" }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "66%" }}
                        aria-valuenow={66}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
