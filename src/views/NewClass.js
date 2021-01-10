import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { app } from "../database/firebase";
import { useHistory } from "react-router-dom";
import { Error } from "../resources/Error";
import Swal from "sweetalert2";
import Select from "react-select";
import Route from "../components/Route";

const NewClass = () => {
  const [name, setName] = useState("");
  const [professorName, setProfessorName] = useState("");
  const [location, setLocation] = useState("");
  const [link, setLink] = useState("");
  const [email, setEmail] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [isVirtual, setIsVirtual] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const days = [
    { value: "Sunday", label: "Sunday" },
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
  ];
  const history = useHistory();

  const createClasss = async (e) => {
    e.preventDefault();

    await app
      .firestore()
      .collection("class")
      .add({
        id_usuario: currentUser.uid,
        name,
        professorName,
        location,
        link,
        email,
        day,
        time,
        isVirtual,
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "New class have been created...",
          text: "Go to see it!",
        }).then(() => history.goBack());
      })
      .catch((err) => Error(err));
  };

  return (
    <div className="NewClass container">
      <Route />
      <div className="card mb-5">
        <div className="card-body">
          <form className="row g-3" onSubmit={(e) => createClasss(e)}>
            <div className="col-md-6">
              <label htmlFor="inputName" className="form-label">
                Class's name
              </label>
              <input
                type="text"
                className="form-control"
                id="inputName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputProfessor" className="form-label">
                Professor's name
              </label>
              <input
                type="text"
                className="form-control"
                id="inputProfessor"
                value={professorName}
                onChange={(e) => setProfessorName(e.target.value)}
              />
            </div>
            <div className="col-12">
              <label htmlFor="Input Location" className="form-label">
                Location
              </label>
              <input
                type="text"
                className="form-control"
                id="Input Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="col-12">
              <label htmlFor="link" className="form-label">
                Link
              </label>
              <input
                type="url"
                className="form-control"
                id="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="inputState" className="form-label">
                Day
              </label>
              <Select
                className="basic-single"
                classNamePrefix="select"
                isClearable={true}
                isSearchable={true}
                name="day"
                options={days}
                onChange={(e) => (e ? setDay(e.value) : setDay(""))}
                required
              />
            </div>
            <div className="col-md-2">
              <label htmlFor="time" className="form-label">
                Time
              </label>
              <input
                type="time"
                className="form-control"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
            <div className="col-12">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="gridCheck"
                  value={isVirtual}
                  onClick={() => setIsVirtual(!isVirtual)}
                />
                <label className="form-check-label" htmlFor="gridCheck">
                  Is virtual?
                </label>
              </div>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewClass;
