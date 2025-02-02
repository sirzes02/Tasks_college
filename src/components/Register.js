import React, { useState } from "react";
import { app } from "../database/firebase";
import { Error } from "../resources/Error";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validatePassword, setValidatePassword] = useState("");
  const [sendEmails, setSendEmails] = useState(false);

  const validate = () => password.length >= 4 && password === validatePassword;
  const random = () => Math.floor(Math.random() * 16);

  const handlerEvent = async (e) => {
    e.preventDefault();

    if (validate()) {
      await app
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async (result) => {
          await app
            .firestore()
            .collection("user")
            .doc(result.user.uid)
            .set({
              photo: random(),
            })
            .catch((err) => Error(err));
        })
        .catch((err) => Error(err));
    }
  };

  return (
    <form className="mt-4 mx-1" onSubmit={handlerEvent}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          aria-describedby="emailHelp"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Validate Password
        </label>
        <input
          type="password"
          className="form-control"
          value={validatePassword}
          onChange={(e) => setValidatePassword(e.target.value)}
          required
        />
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          value={sendEmails}
          onChange={() => setSendEmails(!sendEmails)}
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Send me emails
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        Sign up
      </button>
    </form>
  );
};

export default Register;
