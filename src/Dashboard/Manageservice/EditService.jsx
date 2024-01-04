import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import Swal from "sweetalert2";

const EditService = () => {
  const base_url = import.meta.env.VITE_BASE_URL;
  const service = useLoaderData();
  const { name, price, description, status, _id } = service;

  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setIsLoading(true)
    const { name, price, description, status } = data;
    const updatedService = { name, price, description, status };
    console.log(updatedService);
    fetch(`${base_url}/service/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedService),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false)
        console.log(data);
        if (data.data.matchedCount > 0) {
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
          setIsLoading(false)
        }
      });
  };

  return (
    <div className="w-full md:px-10">
      <h1 className="text-center text-xl font-bold py-5">Update A Service</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-5 ">
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text font-semibold  ">name</span>
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
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text font-semibold  ">Price</span>
            </label>
            <input
              {...register("price", {
                required: true,
                valueAsNumber: true,
              })}
              type="number"
              defaultValue={price}
              className="input input-bordered w-full "
            />
          </div>
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
            <span className="label-text  ">Description</span>
          </label>
          <textarea
            {...register("description", { required: false })}
            className="textarea textarea-bordered h-24"
            defaultValue={description}
          ></textarea>
        </div>

        {isLoading ? (
          <div className="flex">
            <ScaleLoader color="#36d7b7" />
            <input
              className="btn btn-warning btn-sm mt-10"
              type="submit"
              value="Adding.."
              disabled={isLoading}
            />
          </div>
        ) : (
          <div className="flex justify-center">
            <input
              className="btn btn-warning btn-sm mt-10"
              type="submit"
              value="Add"
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default EditService;
