import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { back } from "../resources/Logos";

const Route = () => {
  const [route, setRoute] = useState(["Home"]);
  const [lastOne, setLastOne] = useState(null);

  const history = useHistory();

  useEffect(() => {
    const currentRoute = history.location.pathname;
    const arrRoute = currentRoute.substring(1, currentRoute.length).split("/");

    setLastOne(arrRoute.pop());
    setRoute([...route, ...arrRoute]);

    return;
  }, [history.location.pathname]);

  return (
    <div className="mt-3">
      <div className="d-inline-block pointer" onClick={() => history.goBack()}>
        {back}
      </div>
      <div className="d-inline-block px-3">
        <nav aria-label="breadcrumb" className="main-breadcrumb">
          <ol className="breadcrumb">
            {route.map((route) => (
              <li className="breadcrumb-item text-capitalize" key={route}>
                {route}
              </li>
            ))}
            <li
              className="breadcrumb-item active text-capitalize"
              aria-current="page">
              {lastOne}
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Route;
