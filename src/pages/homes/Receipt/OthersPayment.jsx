import { useContext, useEffect, useState } from "react";
// import numberToWords from "number-to-words";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";
// import Loading from "../../../component/Loading";
import { useForm } from "react-hook-form";
import { PropagateLoader } from "react-spinners";

const OthersPayment = () => {
  const base_url = import.meta.env.VITE_BASE_URL;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { userInfo } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch(`${base_url}/users`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  const currentUserEmail = userInfo?.email;

  const currentUser = users.find((user) => user.email === currentUserEmail);

  const onSubmit = (data) => {
    const { service, paid, date, refference } = data;
    // const date = new Date();

    // const year = date.getFullYear();
    // const month = (date.getMonth() + 1).toString().padStart(2, "0");
    // const day = date.getDate().toString().padStart(2, "0");
    // // Format the date as "YYYY-MM-DDTHH:mm:ss.sssZ"
    // const formattedDate = `${year}-${month}-${day}`;

    const UserName = currentUser.name;
    const userEmail = currentUser.email;
    //

    const newAppointment = {
      service: [
        {
          name: service,
        },
      ],
      refference,
      paymentInfo: [
        {
          user: UserName,
          email: userEmail,
          paid: parseFloat(paid),
          date,
        },
      ],
    };

    // console.log(newAppointment, "data");

    setIsLoading(true);

    fetch(`${base_url}/others_entry`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newAppointment),
    })
      .then((res) => res.json())
      .then((admission) => {
        setIsLoading(false);
        if (admission.data.insertedId) {
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

  return (
    <div className="px-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" grid grid-cols-1 md:grid-cols-2 justify-between gap-5">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text md:text-[18px] font-semibold">
                Purpose *
              </span>
            </label>
            <input
              {...register("service", { required: true })}
              type="text"
              placeholder="Purpose"
              className="input input-bordered w-full input-primary"
            />
            {errors.service && (
              <span className="text-red-500 text-sm text-start">
                this field is required
              </span>
            )}
          </div>

          <div className="form-control md:ms-6 w-full">
            <label className="label">
              <span className="label-text md:text-[18px] font-semibold">
                Amount *
              </span>
            </label>
            <input
              {...register("paid", { required: true })}
              type="number"
              placeholder="Amount"
              className="input input-bordered input-primary text-black"
            />
            {errors.paid && (
              <span className="text-red-500 text-sm text-start">
                this field is required
              </span>
            )}
          </div>
          {/* date */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text md:text-[18px] font-semibold">
                Income Date *
              </span>
            </label>
            <input
              {...register("date", { required: true })}
              type="date"
              className="input input-bordered w-full input-primary"
            />
            {errors.date && (
              <span className="text-red-500 text-sm text-start">
                this field is required
              </span>
            )}
          </div>

          {/* remarks */}
          <div className="form-control md:ms-6 w-full">
            <label className="label">
              <span className="label-text md:text-[18px] font-semibold">
                Remarks
              </span>
            </label>
            <input
              {...register("refference", { required: false })}
              type="text"
              placeholder="Details"
              className="input input-bordered input-primary text-black"
            />
            {errors.refference && (
              <span className="text-red-500 text-sm text-start">
                this field is required
              </span>
            )}
          </div>
        </div>

        {/* ref and address */}

        <div className="flex justify-center">
          {isLoading ? (
            <div className="flex items-center mt-5 ">
              <PropagateLoader color="#1653B2" /> <div>Submitting</div>
            </div>
          ) : (
            <input
              className="btn btn-primary btn-block btn-sm mt-10 "
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

export default OthersPayment;
