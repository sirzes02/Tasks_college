import React, { useContext } from "react";
import { app } from "../database/firebase";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

function NavBar() {
  const { currentUser } = useContext(AuthContext);

  const logOut = async () => {
    await app
      .auth()
      .signOut()
      .then((result) => console.log(result))
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
        <a className="navbar-brand">My Tasks</a>
        {currentUser && (
          <div className="row">
            <div className="col mt-2">
              <p class="text-light fs-6">{app.auth().currentUser.email}</p>
            </div>
            <div className="col">
              <button
                type="button"
                class="btn btn-outline-danger"
                onClick={logOut}
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
