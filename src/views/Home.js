import React, { useEffect, useContext, useState } from "react";
import { app } from "../database/firebase";
import { AuthContext } from "../context/AuthContext";
import { Error } from "../resources/Error";
import Vacio from "../components/Vacio";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [classes, setClasses] = useState([]);
  const [empty, setEmpty] = useState(true);

  useEffect(() => {
    findData();
    return;
  }, []);

  const findData = async () => {
    await app
      .firestore()
      .collection("class")
      .where("id_usuario", "==", currentUser.uid)
      .get()
      .then((result) => {
        if (result.empty) {
          console.log("No matching documents.");
        } else {
          setClasses(result.docs);
          setEmpty(false);
        }
      })
      .catch((err) => Error(err));
  };

  return (
    <div className="Home">
      {empty ? (
        <Vacio />
      ) : (
        classes.map((data) => (
          <p>
            {data.data().name}, {data.data().time}
          </p>
        ))
      )}
    </div>
  );
};

export default Home;
