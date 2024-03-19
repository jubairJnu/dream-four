import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import Swal from "sweetalert2";

const EditUser = () => {
  const base_url = import.meta.env.VITE_BASE_URL;
  const singleUser = useLoaderData();
  const { name, role, status, _id } = singleUser;
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
    const { name, status, role } = data;
    const updateUserInfo = {
      name,

      status,
      role,
    };
    fetch(`${base_url}/update-user/${_id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateUserInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        if (data.data.modifiedCount > 0) {
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
      <h1 className="text-center text-xl">Update A User</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-5 ">
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text font-semibold  ">Name</span>
              </label>
              <input
                {...register("name", { required: false })}
                type="text"
                defaultValue={name}
                className="input input-bordered w-full "
              />
            </div>
          </div>

          <div className="flex gap-5 ">
            {/*  */}
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text font-semibold  ">Status</span>
              </label>
              <select
                defaultValue={status}
                {...register("status", { required: false })}
                className="select select-bordered"
              >
                <option disabled value="">
                  Pick One
                </option>
                <option> active </option>
                <option> inactive </option>
              </select>
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text  ">Role</span>
            </label>
            <select
              defaultValue={role}
              {...register("role", { required: false })}
              className="select select-bordered"
            >
              <option disabled value="">
                Pick One
              </option>
              {/* <option value="admin"> Admin </option> */}
              <option value="owner"> Owner </option>
              <option value="staff"> Staff </option>
              <option value="shopkeeper"> Shopkeeper </option>
            </select>
          </div>

          {isLoading ? (
            <div className="flex">
              <ScaleLoader color="#36d7b7" />
              <input
                className="btn btn-warning btn-sm mt-10"
                type="submit"
                value="Updating.."
                disabled={isLoading}
              />
            </div>
          ) : (
            <div className="flex justify-center">
              <input
                className="btn btn-warning btn-sm mt-10"
                type="submit"
                value="Update"
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditUser;
