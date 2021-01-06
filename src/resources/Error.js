import Swal from "sweetalert2";

const Error = (err) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Something went wrong!",
    footer: err,
  });
};

export { Error };
