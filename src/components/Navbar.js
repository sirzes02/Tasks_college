import React, { useContext, useState, useEffect } from "react";
import { app } from "../database/firebase";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import { photos, noImage } from "../resources/ProfilePhotos";
import Swal from "sweetalert2";

function NavBar() {
  const { currentUser } = useContext(AuthContext);
  const [photo, setPhoto] = useState(noImage);
  const [name, setName] = useState(null);

  const history = useHistory();

  useEffect(() => {
    if (currentUser) {
      const profilePhoto = currentUser.photoURL;

      if (profilePhoto) {
        setPhoto(profilePhoto);
      } else {
        findImage();
      }

      setName(currentUser.displayName ?? currentUser.email);
    }
  }, [currentUser]);

  const findImage = async () => {
    await app
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
  };

  const logOut = async () => {
    await app
      .auth()
      .signOut()
      .then(() => setPhoto(null))
      .catch((err) =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: err,
        })
      );
  };

  const showImage = () => {
    Swal.fire({
      title: "This is you!",
      text: name,
      imageUrl: photo,
      imageAlt: "profile image",
    });
  };

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="navbar-brand">My Tasks</div>
        {currentUser && (
          <div className="row">
            <div className="col mt-3">
              <p className="text-light fs-6">{currentUser.email}</p>
            </div>
            <div className="col">
              <div className="btn-group">
                <div className="btn-group dropstart" role="group">
                  <button
                    type="button"
                    className="btn btn-secondary dropdown-toggle dropdown-toggle-split"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <span className="visually-hidden">Toggle Dropstart</span>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <div
                        className="btn dropdown-item"
                        onClick={() => history.push("profile")}>
                        Preferences
                      </div>
                    </li>
                    <li>
                      <div className="btn dropdown-item">About</div>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <div
                        className="btn btn-outline-danger dropdown-item boton_cerrar"
                        onClick={logOut}>
                        Logout
                      </div>
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={showImage}>
                  <img
                    className="rounded-circle"
                    src={photo}
                    width="40"
                    height="40"
                    alt="profile"></img>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
