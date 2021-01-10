import React, { useEffect, useContext, useState } from "react";
import { app } from "../database/firebase";
import { AuthContext } from "../context/AuthContext";
import { Error } from "../resources/Error";
import Vacio from "../components/Vacio";
import Class from "../components/Class";

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
        if (!result.empty) {
          setClasses(result.docs);
          setEmpty(false);
        }
      })
      .catch((err) => Error(err));
  };

  return (
    <div className="Home container my-3">
      {empty ? (
        <div className="my-5">
          <Vacio />
        </div>
      ) : (
        <div className="row">
          {classes.map((data) => (
            <div className="col-sm mt-1" key={data.id}>
              <Class data={data.data()} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
