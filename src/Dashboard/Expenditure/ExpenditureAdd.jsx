import { useState } from "react";
import { useForm } from "react-hook-form";
import { ScaleLoader } from "react-spinners";
import Swal from "sweetalert2";

const ExpenditureAdd = () => {
  const base_url = import.meta.env.VITE_BASE_URL;
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setIsLoading(true);
    const { purpose, amount, date, biller } = data;
    const expenditureInfo = {
      purpose,
      biller,
      amount,
      date,
      type: "expenditure",
    };
    // fetch(`${base_url}/expenditure`,
    fetch(`${base_url}/expenditure`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(expenditureInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setIsLoading(false);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Added Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        setIsLoading(false);
        reset();
      });
  };

  return (
    <div className="w-full md:px-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-5 ">
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text font-semibold  ">Purpose *</span>
            </label>
            <input
              {...register("purpose", { required: true })}
              type="text"
              placeholder="Purpose"
              className="input input-bordered w-full "
            />
            {errors?.purpose && (
              <span className="text-red-500">this field is required</span>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text font-semibold  ">Biller Name </span>
            </label>
            <input
              {...register("biller", { required: false })}
              type="text"
              placeholder="Customer Name"
              className="input input-bordered w-full "
            />
          </div>
        </div>

        <div className="flex gap-5 ">
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text font-semibold  ">Amount *</span>
            </label>
            <input
              {...register("amount", {
                required: true,
                valueAsNumber: true,
              })}
              type="number"
              placeholder="Price"
              className="input input-bordered w-full "
            />
            {errors?.amount && (
              <span className="text-red-500">this field is required</span>
            )}
          </div>

          {/* 2 */}

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold ">
                Expenditure Date *
              </span>
            </label>
            <input
              {...register("date", { required: true })}
              className="input input-bordered w-full"
              type="date"
            ></input>
            {errors?.date && (
              <span className="text-red-500">this field is required</span>
            )}
          </div>
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
          <input
            className="btn btn-warning btn-sm mt-10"
            type="submit"
            value="Add"
          />
        )}
      </form>
    </div>
  );
};

export default ExpenditureAdd;
