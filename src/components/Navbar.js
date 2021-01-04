import React, { useContext, useState, useEffect } from "react";
import { app } from "../database/firebase";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

import img1 from "../images/photos/256_1.png";
import img2 from "../images/photos/256_2.png";
import img3 from "../images/photos/256_3.png";
import img4 from "../images/photos/256_4.png";
import img5 from "../images/photos/256_5.png";
import img6 from "../images/photos/256_6.png";
import img7 from "../images/photos/256_7.png";
import img8 from "../images/photos/256_8.png";
import img9 from "../images/photos/256_9.png";
import img10 from "../images/photos/256_10.png";
import img11 from "../images/photos/256_11.png";
import img12 from "../images/photos/256_12.png";
import img13 from "../images/photos/256_13.png";
import img14 from "../images/photos/256_14.png";
import img15 from "../images/photos/256_15.png";
import img16 from "../images/photos/256_16.png";
import noImage from "../images/photos/no.png";

function NavBar() {
  const { currentUser } = useContext(AuthContext);
  const [photo, setPhoto] = useState(noImage);
  const [name, setName] = useState(null);

  const photos = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
    img13,
    img14,
    img15,
    img16,
  ];

  useEffect(() => {
    if (currentUser) {
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
    }
  }, [currentUser]);

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
              <div class="btn-group">
                <div class="btn-group dropstart" role="group">
                  <button
                    type="button"
                    class="btn btn-secondary dropdown-toggle dropdown-toggle-split"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <span class="visually-hidden">Toggle Dropstart</span>
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <div class="btn dropdown-item">Preferences</div>
                    </li>
                    <li>
                      <div class="btn dropdown-item">About</div>
                    </li>
                    <li>
                      <hr class="dropdown-divider" />
                    </li>
                    <li>
                      <div
                        class="btn btn-outline-danger dropdown-item boton_cerrar"
                        onClick={logOut}>
                        Logout
                      </div>
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  class="btn btn-secondary"
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
