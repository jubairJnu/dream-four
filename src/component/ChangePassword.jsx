import { useState } from "react";
import { useForm } from "react-hook-form";
import { ScaleLoader } from "react-spinners";
import Swal from "sweetalert2";

const ChangePassword = () => {
  const base_url = import.meta.env.VITE_BASE_URL;
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // handleer
  const onSubmit = (data) => {
    setIsLoading(true);
    const { email, oldpass, newpass } = data;
    const updatedPass = { email, oldpass, newpass: newpass.toString() };
    fetch(`${base_url}/change_password`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedPass),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        if (data.modifiedCount > 0) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            title: "Updated successfully",
          });
          reset();
          setIsLoading(false);
        }
      });
  };
  return (
    <div className="w-full md:px-10">
      <h1 className="text-center mt-2 text-xl">Change Your Password</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text font-semibold  ">email</span>
          </label>
          <input
            {...register("email", { required: true })}
            type="email"
            className="input input-bordered w-full "
          />
        </div>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text font-semibold  ">Old Password</span>
          </label>
          <input
            {...register("oldpass", { required: true })}
            type="password"
            className="input input-bordered w-full "
          />
        </div>

        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text font-semibold  ">New Password</span>
          </label>
          <input
            {...register("newpass", {
              required: true,
              valueAsNumber: true,
            })}
            type="password"
            className="input input-bordered w-full "
          />
        </div>
        {/*  */}

        {isLoading ? (
          <div className="flex">
            <ScaleLoader color="#36d7b7" />
            <input
              className="btn btn-warning btn-sm mt-10"
              type="submit"
              value="Submitting.."
              disabled={isLoading}
            />
          </div>
        ) : (
          <div className="flex justify-center">
            <input
              className="btn btn-warning btn-sm mt-10"
              type="submit"
              value="Submit"
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default ChangePassword;
