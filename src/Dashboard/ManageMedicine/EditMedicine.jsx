import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLoaderData } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import Swal from "sweetalert2";

const EditMedicine = () => {
  const base_url = import.meta.env.VITE_BASE_URL;
  const [isLoading, setIsLoading] = useState(false);
  const singleMedicine = useLoaderData();
  const { name, buy, sell, _id } = singleMedicine;

  // handler

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setIsLoading(true);
    const { name, buy, sell } = data;
    const updatedMedicine = { name, buy, sell };
    fetch(`${base_url}/medicine/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedMedicine),
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
        }
      });
  };

  return (
    <div className="w-full md:px-10">
      <div className="flex justify-between items-center">
        <h1 className="text-center py-5 text-xl">Update A Medicine</h1>
        <button className="btn btn-primary">
        <Link to="/dashboard/medicinelist">Medicine List</Link>
        </button>
      </div>
      <div className="modal-body p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-5 ">
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text font-semibold  ">Name </span>
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                defaultValue={name}
                className="input input-bordered w-full "
              />
              {errors?.name && (
                <span className="text-red-500">this field is required</span>
              )}
            </div>
          </div>

          <div className="flex gap-5 ">
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text font-semibold  ">Buy Price </span>
              </label>
              <input
                {...register("buy", {
                  required: true,
                  valueAsNumber: true,
                })}
                type="number"
                defaultValue={buy}
                className="input input-bordered w-full "
              />
              {errors?.buy && (
                <span className="text-red-500">this field is required</span>
              )}
            </div>
            {/* sell price */}
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text font-semibold  ">Sell Price </span>
              </label>
              <input
                {...register("sell", {
                  required: true,
                  valueAsNumber: true,
                })}
                type="number"
                defaultValue={sell}
                className="input input-bordered w-full "
              />
              {errors?.sell && (
                <span className="text-red-500">this field is required</span>
              )}
            </div>
          </div>

          <div className="flex justify-center">
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
              <input
                className="btn btn-warning btn-sm mt-10"
                type="submit"
                value="Update"
              />
            )}
          </div>
        </form>

        {/* action */}
      </div>
    </div>
  );
};

export default EditMedicine;
