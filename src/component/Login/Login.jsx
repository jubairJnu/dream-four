import Lottie from "lottie-react";
import typing from "../../../public/typing.json";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

import Swal from "sweetalert2";

const Login = () => {
  const { login, user, error, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogin = async (event) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      html: '<p class="text-red-500 text-xl font-bold">You Have No Access!!</p>',
      footer: '<p class="text-warning">বকেয়া পরিশোধ করুন </p>',
    });

    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    // await login(email, password);
  };
  if (user?.isAuthenticated) {
    navigate("/");

    Swal.fire({
      icon: "error",
      title: "Oops...",
      html: '<p class="text-red-500 text-xl font-bold">You Have No Access!</p>',
      footer: '<p class="text-warning">বকেয়া পরিশোধ করুন </p>',
    });
  }

  return (
    <div className="mt-20 container mx-auto">
      {/* ---- */}

      <div className="hero min-h-screen ">
        <div className="hero-content flex-col lg:flex-row-reverse ">
          <div className="card md:shrink-0 md:w-96 max-w-sm shadow-2xl bg-base-100">
            <h1 className="md:text-3xl text-center md:p-4 font-bold">
              {loading ? (
                <ScaleLoader color="#E81D62"></ScaleLoader>
              ) : (
                "Login now!"
              )}
            </h1>
            <p className="text-red-500 text-center"> {error} </p>
            <div className="card-body">
              {/* form */}
              <form onSubmit={handleLogin}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text md:text-[20px]">Email</span>
                  </label>
                  <input
                    type="text"
                    placeholder="email"
                    name="email"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text md:text-[20px]">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Login</button>
                </div>
              </form>
            </div>
          </div>

          <div className="text-center lg:text-left">
            {/* animation */}
            <div className="w-1/2 mx-auto invisible md:visible">
              <Lottie animationData={typing}></Lottie>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
