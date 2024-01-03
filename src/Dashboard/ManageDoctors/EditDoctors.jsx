import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import Swal from "sweetalert2";

const EditDoctors = () => {
  const base_url = import.meta.env.VITE_BASE_URL;
  const [isLoading, setIsLoading] = useState(false);
  const doctor = useLoaderData();

  const {
    _id,
    name,
    mobile,
    schedule,
    fees,
    time,
    education,
    description,
    specialist,
  } = doctor;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const {
      name,
      mobile,
      schedule,
      fees,
      time,
      education,
      description,
      specialist,
    } = data;

    const UpdatedDoctor = {
      name,
      mobile,
      schedule,
      fees,
      time,
      education,
      description,
      specialist,
    };
    fetch(`${base_url}/doctor/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(UpdatedDoctor),
    });
  };

  return (
    <div className="w-full md:px-10">
      <h1 className="text-center text-xl font-bold py-5">Update Doctors</h1>
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
              className="input input-bordered w-full text-black "
            />
          </div>

          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text font-semibold  ">Mobile</span>
            </label>
            <input
              {...register("mobile", { required: true })}
              type="text"
              defaultValue={mobile}
              className="input input-bordered w-full "
            />
            {errors?.end && (
              <span className="text-red-500">this field is required</span>
            )}
          </div>
        </div>

        <div className="flex gap-5 ">
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text font-semibold  ">Schedule</span>
            </label>
            <select
              defaultValue={schedule}
              {...register("schedule", { required: false })}
              className="select select-bordered"
            >
              <option disabled>Pick One</option>
              <option> শনি </option>
              <option> রবি </option>
              <option> সোম </option>
              <option> মঙ্গল </option>
              <option> বুধ </option>
              <option> বৃহ: </option>
              <option> শুক্র </option>
              <option> প্রতিদিন </option>
            </select>
          </div>

          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text font-semibold  ">Fees</span>
            </label>
            <input
              {...register("fees", { required: false, valueAsNumber: true })}
              type="number"
              defaultValue={fees}
              className="input input-bordered w-full "
            />
            {errors?.fees && (
              <span className="text-red-500">this field is required</span>
            )}
          </div>
        </div>
        <div className="flex gap-5 ">
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text font-semibold  ">Time</span>
            </label>
            <input
              {...register("time", { required: false })}
              type="text"
              defaultValue={time}
              className="input input-bordered w-full "
            />
          </div>

          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text font-semibold  ">Education</span>
            </label>
            <input
              {...register("education", { required: false })}
              type="text"
              defaultValue={education}
              className="input input-bordered w-full "
            />
          </div>
        </div>

        <div className="flex gap-5">
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text font-semibold  ">Specialist</span>
            </label>
            <input
              {...register("specialist", { required: false })}
              type="text"
              defaultValue={specialist}
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

        <div>
          {isLoading ? (
            <div className="flext">
              <ScaleLoader color="#36d7b7" />
              <input
                className="btn btn-warning btn-sm mt-9"
                type="submit"
                value="Submitting"
              />
            </div>
          ) : (
            <div className="flex justify-center">
              <input
                className="btn btn-warning btn-sm mt-9 "
                type="submit"
                value="Submit"
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditDoctors;
