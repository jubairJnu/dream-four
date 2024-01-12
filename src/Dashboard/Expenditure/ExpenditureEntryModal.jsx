import { useState } from "react";
import { useForm } from "react-hook-form";
import { ScaleLoader } from "react-spinners";
import Swal from "sweetalert2";

const ExpenditureEntryModal = ({ isOpen, onClose }) => {
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
    const { purpose, amount, date } = data;
    const expenditureInfo = { purpose, amount, date, type: "expenditure" };
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
        onClose();
      });
  };
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-container  bg-[#2f6bcc] w-1/2 mx-auto rounded-md shadow-lg z-50">
        <div className="modal-header">
          <span className="modal-close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="modal-body p-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-5 ">
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text font-semibold text-yellow-400">
                    Purpose *
                  </span>
                </label>
                <input
                  {...register("purpose", { required: true })}
                  type="text"
                  placeholder="Name"
                  className="input input-bordered w-full "
                />
                {errors?.purpose && (
                  <span className="text-red-500">this field is required</span>
                )}
              </div>
            </div>

            <div className="flex gap-5 ">
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text font-semibold text-yellow-400">
                    Amount *
                  </span>
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
                  <span className="label-text text-yellow-400">Date</span>
                </label>
                <input
                  {...register("date", { required: false })}
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

          {/* action */}

          <div className="modal-action ">
            <form method="dialog">
              <button
                className="btn btn-sm  bg-red-500 text-white hover:text-red-500"
                onClick={onClose}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenditureEntryModal;
