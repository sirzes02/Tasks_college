import React, { useContext, useEffect, useState } from "react";
import { photos, noImage } from "../resources/ProfilePhotos";
import { AuthContext } from "../context/AuthContext";
import { app } from "../database/firebase";
import { Error } from "../resources/Error";
import Swal from "sweetalert2";
import ProfileImage from "../components/ProfileImage";
import Route from "../components/Route";

const ChangePhoto = () => {
  const { currentUser } = useContext(AuthContext);
  const [photo, setPhoto] = useState(noImage);
  const [currentPhoto, setCurrentPhoto] = useState();
  const [newPhoto, setNewPhoto] = useState();
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    findData();
    return;
  }, []);

  const findData = async () => {
    await app
      .firestore()
      .collection("user")
      .doc(currentUser.uid)
      .get()
      .then((result) => {
        setPhoto(photos[result.data().photo]);
        setCurrentPhoto(result.data().photo);
      })
      .catch((err) => Error(err));
  };

  const reset = () => {
    setPhoto(photos[currentPhoto]);
    setDisabled(true);
  };

  const next = () => {
    const number = Math.floor(Math.random() * 16);

    setNewPhoto(number);
    setPhoto(photos[number]);
    setDisabled(number === currentPhoto);
  };

  const save = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You might never find this picture again!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, choose it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await app
          .firestore()
          .collection("user")
          .doc(currentUser.uid)
          .set({ photo: newPhoto })
          .then(() => {
            Swal.fire("Choose it!", "You have a new photo.", "success");
            setCurrentPhoto(newPhoto);
            setDisabled(true);
          })
          .catch((err) => Error(err));
      }
    });
  };

  return (
    <div className="ChangePhoto container">
      <Route />
      <div className="card p-2 mb-3 mx-auto" style={{ width: "20rem" }}>
        <h5 className="card-title mx-auto">Select your new picture</h5>
        <ProfileImage photo={photo} service={true} classname="card-img-top" />
        <div className="card-body">
          <p className="card-text">
            <div className="col">
              <div className="row">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={next}>
                  Next photo
                </button>
              </div>
              <div className="row mt-2">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={reset}
                  disabled={disabled}>
                  Reset
                </button>
              </div>
              <div className="row mt-2">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={save}
                  disabled={disabled}>
                  Save
                </button>
              </div>
            </div>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChangePhoto;
