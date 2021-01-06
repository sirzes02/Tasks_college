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
import { Error } from "../resources/Error";
import Swal from "sweetalert2";
import Route from "../components/Route";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [photo, setPhoto] = useState(noImage);
  const [name, setName] = useState(null);
  const [college, setCollege] = useState("-");
  const [location, setLocation] = useState("-");
  const [mobile, setMobile] = useState("-");
  const [address, setAddress] = useState("-");
  const [url_website, setUrl_website] = useState("-");
  const [url_github, setUrl_Github] = useState("-");
  const [url_twitter, setUrl_Twitter] = useState("-");
  const [url_instagram, setUrl_instagram] = useState("-");
  const [url_facebook, setUrl_facebook] = useState("-");

  useEffect(() => {
    const profilePhoto = currentUser.photoURL;

    findData(profilePhoto);

    setName(currentUser.displayName ?? currentUser.email);

    return;
  }, []);

  const findData = async (profilePhoto) => {
    await app
      .firestore()
      .collection("user")
      .doc(currentUser.uid)
      .get()
      .then((result) => {
        setPhoto(photos[result.data().photo] ?? profilePhoto);
        setAddress(result.data().address ?? "-");
        setCollege(result.data().college ?? "College");
        setMobile(result.data().mobile ?? "-");
        setLocation(result.data().location ?? "City, Country");
        setUrl_Github(result.data().github ?? "github");
        setUrl_Twitter(result.data().twitter ?? "twitter");
        setUrl_instagram(result.data().instagram ?? "instagram");
        setUrl_facebook(result.data().facebook ?? "facebook");
        setUrl_website(result.data().website ?? "website");
      })
      .catch((err) => Error(err));
  };

  const editData = (data, text) => {
    Swal.fire({
      title: `Submit your ${data}`,
      input: data === "mobile" ? "tel" : data === "website" ? "url" : "text",
      showCancelButton: true,
      confirmButtonText: "Change",
      showLoaderOnConfirm: true,
      inputValue: text,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
      preConfirm: (value) => value,
    }).then(async (result) => {
      if (result.isConfirmed) {
        switch (data) {
          case "college":
            setCollege(result.value);
            break;
          case "mobile":
            setMobile(result.value);
            break;
          case "address":
            setAddress(result.value);
            break;
          case "location":
            setLocation(result.value);
            break;
          case "website":
            setUrl_website(result.value);
            break;
          case "github":
            setUrl_Github(result.value);
            break;
          case "twitter":
            setUrl_Twitter(result.value);
            break;
          case "facebook":
            setUrl_facebook(result.value);
            break;
          case "instagram":
            setUrl_instagram(result.value);
            break;
          default:
            break;
        }

        await app
          .firestore()
          .collection("user")
          .doc(currentUser.uid)
          .update({
            [data]: result.value,
          })
          .catch((err) => Error(err));
      }
    });
  };

  return (
    <div className="container mb-3">
      <div className="main-body">
        <Route />
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
                      <div
                        className="col-1 pointer"
                        onClick={() => editData("college", college)}>
                        {pen}
                      </div>
                      <div className="col">
                        <p className="text-secondary mb-1">{college}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div
                        className="col-1 pointer"
                        onClick={() => editData("location", location)}>
                        {pen}
                      </div>
                      <div className="col">
                        <p className="text-muted font-size-sm">{location}</p>
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
                    <div
                      className="col-1 mr-1 pointer"
                      onClick={() => (window.location.href = url_website)}>
                      {web}
                    </div>
                    <div className="col">Website</div>
                  </h6>
                  <span
                    className="text-secondary"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Click to change"
                    onClick={() => editData("website", url_website)}>
                    {url_website}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0 row">
                    <div className="col-1 mr-1">{github}</div>
                    <div className="col">Github</div>
                  </h6>
                  <span
                    className="text-secondary"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Click to change"
                    onClick={() => editData("github", url_github)}>
                    {url_github}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0 row">
                    <div className="col-1 mr-1">{twitter}</div>
                    <div className="col">Twitter</div>
                  </h6>
                  <span
                    className="text-secondary"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Click to change"
                    onClick={() => editData("twitter", url_twitter)}>
                    @{url_twitter}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0 row">
                    <div className="col-1 mr-1">{instagram}</div>
                    <div className="col">Instagram</div>
                  </h6>
                  <span
                    className="text-secondary"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Click to change"
                    onClick={() => editData("instagram", url_instagram)}>
                    {url_instagram}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0 row">
                    <div className="col-1 mr-1">{facebook}</div>
                    <div className="col">Facebook</div>
                  </h6>
                  <span
                    className="text-secondary"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Click to change"
                    onClick={() => editData("facebook", url_facebook)}>
                    {url_facebook}
                  </span>
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
                      <div
                        className="col-1 pointer"
                        onClick={() => editData("mobile", mobile)}>
                        {pen}
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-9 text-secondary">{mobile}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <div className="row">
                      <div className="col">
                        <h6 className="mb-0">Address</h6>
                      </div>
                      <div
                        className="col-1 pointer"
                        onClick={() => editData("address", address)}>
                        {pen}
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-9 text-secondary">{address}</div>
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
