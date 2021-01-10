import Virtual from "../images/virtual.svg";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Class = ({ data }) => {
  const MySwal = withReactContent(Swal);

  const alert = () => {
    MySwal.fire({
      title: <strong className="text-capitalize">{data.name}</strong>,
      html: dataAlert(),
      showCloseButton: true,
    });
  };

  const dataAlert = () => (
    <div className="container">
      <div class="card">
        <div class="card-header text-capitalize">{data.professorName}</div>
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <p>
              Location: <cite className="text-capitalize">{data.location}</cite>
            </p>
            <footer class="blockquote-footer mt-2">
              Email: <cite>{data.email}</cite>
            </footer>
            <footer class="blockquote-footer mt-1">
              Link:{" "}
              <cite>
                <a href={data.link} target="_blank" rel="noopener noreferrer">
                  Click here to go
                </a>
              </cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );

  return (
    <div className="card text-center h-100">
      <div className="card-header">
        {data.isVirtual && (
          <img
            className="float-start img-fluid"
            src={Virtual}
            width="25"
            height="25"
            alt="virtual"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Is virtual!!!"
          />
        )}
        <div className="text-capitalize">{data.name}</div>
      </div>
      <div className="card-body">
        <div class="d-grid gap-2">
          <div className="btn btn-outline-primary btn-sm" onClick={alert}>
            Show
          </div>
          <div className="btn btn-outline-secondary btn-sm">Homeworks</div>
        </div>
      </div>
      <div className="card-footer text-muted">
        {data.day} - {data.time}
      </div>
    </div>
  );
};

export default Class;
