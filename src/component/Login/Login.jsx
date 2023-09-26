import Lottie from "lottie-react";
import typing from "../../../public/typing.json"
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, loading, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogin = event => {
    setLoading(true);
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    login(email, password)
      .then(result => {
        const loggedUser = result.user;
        setLoading(false)
        navigate('/')
      })
      .catch(error => {
        setLoading(false)
        console.log(error.message);
      })

  }

  return (
    <div className="mt-20 container mx-auto">

      {/* ---- */}

      <div className="hero min-h-screen ">
        <div className="hero-content flex-col lg:flex-row ">
          <div className="text-center lg:text-left">

            <div className="w-1/2 mx-auto">
              <Lottie animationData={typing} ></Lottie>
            </div>


          </div>
          <div className="card md:shrink-0 md:w-96 max-w-sm shadow-2xl bg-base-100">
            <h1 className="md:text-5xl text-center md:p-4 font-bold">Login now!</h1>
            <div className="card-body">
              {/* form */}
              <form onSubmit={handleLogin}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text md:text-[20px]">Email</span>
                  </label>
                  <input type="text" placeholder="email" name="email" className="input input-bordered" />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text md:text-[20px]">Password</span>
                  </label>
                  <input type="password" name="password" placeholder="password" className="input input-bordered" />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover ">Forgot password?</a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Login</button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;