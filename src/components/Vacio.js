import { useHistory } from "react-router-dom";

const Vacio = () => {
  const history = useHistory();

  return (
    <div className="Vacio">
      <div className="card text-center">
        <div className="card-header">Is empty</div>
        <div className="card-body">
          <h5 className="card-title">Create a new class</h5>
          <p className="card-text">and you can manage resources from here</p>
          <div
            className="btn btn-primary"
            onClick={() => history.push("new_class")}>
            Add a class
          </div>
        </div>
        <div className="card-footer text-muted">-- My tasks</div>
      </div>
    </div>
  );
};

export default Vacio;
