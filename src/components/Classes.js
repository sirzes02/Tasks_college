const Classes = ({ data }) => {
  return (
    <div>
      <small>{data.name}</small>
      <div className="progress mb-3" style={{ height: "5px" }}>
        <div
          className="progress-bar progress-bar-striped bg-primary"
          role="progressbar"
          style={{ width: "80%" }}
          aria-valuenow={80}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
    </div>
  );
};

export default Classes;
