import { useContext, useEffect, useState } from "react";
import Loading from "./Loading";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AppointmentForm = () => {
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

  
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    fetch(`${base_url}/users`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  const currentUserEmail = userInfo?.email;

  const currentUser = users.find((user) => user.email === currentUserEmail);

  const [doctors, setDoctors] = useState([]);

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

    const UserName = currentUser.name;
    const userEmail = currentUser.email;
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
            title: "Data Added successfully",
          });
          reset();
        } else {
          setIsLoading(false);
        }
      });
  };
  //
  useEffect(() => {
    fetch(`${base_url}/doctors`)
      .then((res) => res.json())
      .then((data) => setDoctors(data));
  }, []);
  return (
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
              {doctors?.map((doctor) => (
                <option value={doctor.name} key={doctor._id}>
                  {doctor.name}
                </option>
              ))}
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
  );
};

export default AppointmentForm;
