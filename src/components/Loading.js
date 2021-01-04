import Footer from "./Footer";

const Loading = () => {
  return (
    <div className="Loading">
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand">My Tasks</a>
        </div>
      </nav>
      <div className="mt-5">
        <div className="container d-flex justify-content-evenly">
          <div class="spinner-grow text-primary" role="status">
            <span class="sr-only"></span>
          </div>
          <div class="spinner-grow text-secondary" role="status">
            <span class="sr-only"></span>
          </div>
          <div class="spinner-grow text-success" role="status">
            <span class="sr-only"></span>
          </div>
          <div class="spinner-grow text-danger" role="status">
            <span class="sr-only"></span>
          </div>
          <div class="spinner-grow text-warning" role="status">
            <span class="sr-only"></span>
          </div>
          <div class="spinner-grow text-info" role="status">
            <span class="sr-only"></span>
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
