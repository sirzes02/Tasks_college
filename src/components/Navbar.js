import React, { useContext, useState, useEffect } from "react";
import { app } from "../database/firebase";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

import img1 from "../images/photos/64_1.png";
import img2 from "../images/photos/64_2.png";
import img3 from "../images/photos/64_3.png";
import img4 from "../images/photos/64_4.png";
import img5 from "../images/photos/64_5.png";
import img6 from "../images/photos/64_6.png";
import img7 from "../images/photos/64_7.png";
import img8 from "../images/photos/64_8.png";
import img9 from "../images/photos/64_9.png";
import img10 from "../images/photos/64_10.png";
import img11 from "../images/photos/64_11.png";
import img12 from "../images/photos/64_12.png";
import img13 from "../images/photos/64_13.png";
import img14 from "../images/photos/64_14.png";
import img15 from "../images/photos/64_15.png";
import img16 from "../images/photos/64_16.png";

function NavBar() {
  const { currentUser } = useContext(AuthContext);
  const [photo, setPhoto] = useState(null);
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

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="navbar-brand">My Tasks</div>
        {currentUser && (
          <div className="row">
            <div className="col">
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={logOut}>
                Sign out
              </button>
            </div>
            <div className="col mt-2">
              <p className="text-light fs-6">{currentUser.email}</p>
            </div>
            <div className="col">
              <img
                className="rounded-circle"
                src={photo}
                width="40"
                height="40"
                alt="profile"></img>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
