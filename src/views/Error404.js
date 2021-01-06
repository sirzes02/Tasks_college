import error from "../images/404.jpg";

const Error404 = () => {
  return (
    <div className="Error404 container">
      <img
        class="rounded mx-auto d-block img-fluid w-50"
        src={error}
        alt="404 error"></img>
    </div>
  );
};

export default Error404;
