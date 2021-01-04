import Footer from "./Footer";

const Loading = () => {
  return (
    <div className="Loading">
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="navbar-brand">My Tasks</div>
        </div>
      </nav>
      <div className="mt-5">
        <div className="container d-flex justify-content-evenly">
          <div className="spinner-grow text-primary" role="status">
            <span className="sr-only"></span>
          </div>
          <div className="spinner-grow text-secondary" role="status">
            <span className="sr-only"></span>
          </div>
          <div className="spinner-grow text-success" role="status">
            <span className="sr-only"></span>
          </div>
          <div className="spinner-grow text-danger" role="status">
            <span className="sr-only"></span>
          </div>
          <div className="spinner-grow text-warning" role="status">
            <span className="sr-only"></span>
          </div>
          <div className="spinner-grow text-info" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      </div>
      <div className="fixed-bottom">
        <Footer />
      </div>
    </div>
  );
};

export default Loading;
