import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const ProfileImage = ({ photo, service, classname }) => {
  const [opacity, setOpacity] = useState(1);
  const history = useHistory();

  return (
    <div className="ProfileImage">
      {!service ? (
        <img
          src={photo}
          alt="user"
          className="rounded-circle pointer"
          width={150}
          style={{ opacity }}
          onMouseOver={() => setOpacity(0.5)}
          onMouseOut={() => setOpacity(1)}
          onClick={() => history.push("profile/photo")}
        />
      ) : (
        <img
          src={photo}
          alt="user"
          className={classname ?? "rounded-circle"}
          width={150}
        />
      )}
    </div>
  );
};

export default ProfileImage;
