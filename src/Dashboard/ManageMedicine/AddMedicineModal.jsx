import { useState } from "react";
import { useForm } from "react-hook-form";
import { ScaleLoader } from "react-spinners";
import Swal from "sweetalert2";

const AddMedicineModal = ({ isOpen, onClose }) => {
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
    const { name, buy, sell } = data;
    const medicineInfo = { name, buy, sell };
    fetch(`${base_url}/medicine`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(medicineInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
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
                    Name *
                  </span>
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="Napa"
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
                  <span className="label-text font-semibold text-yellow-400">
                    Buy Price *
                  </span>
                </label>
                <input
                  {...register("buy", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  type="number"
                  placeholder="80"
                  className="input input-bordered w-full "
                />
                {errors?.buy && (
                  <span className="text-red-500">this field is required</span>
                )}
              </div>
              {/* sell price */}
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text font-semibold text-yellow-400">
                    Sell Price *
                  </span>
                </label>
                <input
                  {...register("sell", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  type="number"
                  placeholder="100"
                  className="input input-bordered w-full "
                />
                {errors?.sell && (
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

export default AddMedicineModal;
