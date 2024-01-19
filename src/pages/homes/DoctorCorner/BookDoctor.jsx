/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";

import Swal from "sweetalert2";

import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loading from "../../../component/Loading";

import { useLoaderData, useNavigate } from "react-router-dom";

const BookDoctor = () => {
  const DoctorInfo = useLoaderData();
  const { name, schedule } = DoctorInfo;

  const currentDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(currentDate.getDate() + 15);

  const base_url = import.meta.env.VITE_BASE_URL;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const onSubmit = (data) => {
    const {
      patient,
      phone,
      appointedDoctor,

      address,
      refference,
    } = data;
    const date = new Date();
 
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    // Format the date as "YYYY-MM-DDTHH:mm:ss.sssZ"
    const formattedDate = `${year}-${month}-${day}`;

    const UserName = "From Web";
    const userEmail = "dreamfourhospital@.com";
    //
    const years = selectedDate.getFullYear();
    const months = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
    const days = selectedDate.getDate().toString().padStart(2, "0");
    // Format the date as "YYYY-MM-DDTHH:mm:ss.sssZ"
    const formattedAppointDate = `${years}-${months}-${days}`;

    const newAppointment = {
      patient,
      user: UserName,
      email: userEmail,
      phone,
      appointedDoctor,
      appointmentDate: formattedAppointDate,
      address,
      service: "Doctor Appointment",
      refference,
      data: formattedDate,
    };
    setIsLoading(true);

    fetch(`${base_url}/doctor_appointment`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newAppointment),
    })
      .then((res) => res.json())
      .then((admission) => {
        if (admission.insertedId) {
          setIsLoading(false);
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
            title: " এপয়েন্টমেন্ট সাকসেস হয়েছে ",
          });
          reset();
          navigate("/");
        } else {
          setIsLoading(false);
        }
      });
  };

  return (
    <div className="mt-24 px-2 container mx-auto">
      <h1 className="text-center text-xl">
        {" "}
        আপনি <span className="font-bold">{name}</span> এর কাছে এপয়েন্টমেন্ট নিতে
        চাচ্ছেন।{" "}
      </h1>
      <p className="text-center my-5">
        অবশ্যই <span className="font-semibold text-red-500">"{schedule}"</span>{" "}
        এই সিডিউলের সাথে মিলিয়ে তারিখ নির্ধারন করুন।
      </p>
      <div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="md:flex justify-between ">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text md:text-[18px] font-semibold">
                    Name *
                  </span>
                </label>
                <input
                  {...register("patient", { required: true })}
                  type="text"
                  placeholder="Patient Name"
                  className="input input-bordered w-full input-primary"
                />
                {errors.patient && (
                  <span className="text-red-500 text-sm text-start">
                    this field is required
                  </span>
                )}
              </div>

              <div className="form-control md:ms-6 w-full">
                <label className="label">
                  <span className="label-text md:text-[18px] font-semibold">
                    Phone Number *
                  </span>
                </label>
                <input
                  {...register("phone", { required: true })}
                  type="text"
                  placeholder="phone number"
                  className="input input-bordered input-primary text-black"
                />
                {errors.phone && (
                  <span className="text-red-500 text-sm text-start">
                    this field is required
                  </span>
                )}
              </div>
            </div>

            <div className="md:flex justify-between">
              <div className="form-control  w-full">
                <label className="label">
                  <span className="label-text md:text-[18px]  font-semibold">
                    Doctors *
                  </span>
                </label>
                <select
                  {...register("appointedDoctor", {
                    required: true,
                    validate: (value) => value !== "",
                  })}
                  className="select select-bordered select-primary  text-black"
                >
                  <option selected value="" disabled>
                    Select Doctor
                  </option>

                  <option> {name} </option>
                </select>
                {errors.appointedDoctor && (
                  <span className="text-red-500 text-sm text-start">
                    this field is required
                  </span>
                )}
              </div>

              {/* date */}
              <div className="form-control md:ms-6 w-full">
                <label className="label">
                  <span className="label-text md:text-[18px] font-semibold">
                    Appointment Date *
                  </span>
                </label>

                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  minDate={currentDate} // Disable dates before today
                  maxDate={maxDate}
                  className="input input-bordered input-primary text-black w-full"
                  placeholderText="Select Date"
                />
                {errors.phone && (
                  <span className="text-red-500 text-sm text-start">
                    this field is required
                  </span>
                )}
              </div>
            </div>
            {/* ref and address */}
            <div className="md:flex justify-between ">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text md:text-[18px] font-semibold">
                    Address (<span className="text-sm"> Optional </span>)
                  </span>
                </label>
                <textarea
                  {...register("address", { required: false })}
                  type="text"
                  placeholder="Address"
                  className="textarea textarea-primary"
                />
                {errors.student_name && (
                  <span className="text-red-500 text-sm text-start">
                    this field is required
                  </span>
                )}
              </div>

              <div className="form-control md:ms-6 w-full">
                <label className="label">
                  <span className="label-text md:text-[18px] font-semibold">
                    Refference (<span className="text-sm"> Optional </span>)
                  </span>
                </label>
                <input
                  {...register("refference", { required: false })}
                  type="text"
                  placeholder="Refference"
                  className="input input-bordered input-primary text-black"
                />
              </div>
            </div>

            <div className="flex justify-center">
              {isLoading ? (
                <Loading />
              ) : (
                <input
                  className="btn btn-primary btn-sm mt-3 "
                  type="submit"
                  value="Submit"
                  disabled={isLoading}
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookDoctor;
