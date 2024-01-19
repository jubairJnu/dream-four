import { useState } from "react";
import { useForm } from "react-hook-form";
import { ScaleLoader } from "react-spinners";
import Swal from "sweetalert2";
const img_hosting_token = import.meta.env.VITE_IMG_KEY;

const AddDoctModal = ({ isOpen, onClose }) => {
  const base_url = import.meta.env.VITE_BASE_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [isOtherOpen, setIsOtherOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  // handle other change
  const handleOtherChange = () => {
    setIsOtherOpen(!isOtherOpen);
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", data.image[0]);
    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((responseImage) => {
        const imageUrl = responseImage.data.display_url;
        const {
          name,
          mobile,
          schedule,
          education,
          time,
          fees,
          description,
          specialist,
        } = data;
        const doctInfo = {
          name,
          mobile,
          schedule,
          education,
          specialist,
          time,
          fees,
          description,
          image: imageUrl,
          status: "active",
        };
        fetch(`${base_url}/doctor`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(doctInfo),
        })
          .then((res) => res.json())
          .then((data) => {
            
            if (data.message == "already exisit") {
              alert("Already Exists");
              onClose();
              setIsLoading(false);
            } else if (data.insertedId) {
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
      });
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? "" : "hidden overflow-y-auto"
      }`}
    >
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal- max-h-screen  bg-[#2f6bcc]  mx-auto rounded-md shadow-lg z-50 overflow-y-auto">
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
                    name*
                  </span>
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="Name"
                  className="input input-bordered w-full "
                />
                {errors?.name && (
                  <span className="text-red-500">this field is required</span>
                )}
              </div>

              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text font-semibold text-yellow-400">
                    Mobile* <span className="text-[11px]">(Must be Unique)</span>
                  </span>
                </label>
                <input
                  {...register("mobile", { required: true })}
                  type="text"
                  placeholder="01***"
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
                  <span className="label-text font-semibold text-yellow-400">
                    Schedule*
                  </span>
                </label>
                <select
                  multiple
                  defaultValue="pick One"
                  {...register("schedule", { required: true })}
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
                <label className="label bg-white mt-2 ">
                  Other
                  <input
                    {...register("ff", { required: false })}
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-primary "
                    onChange={handleOtherChange}
                  />
                </label>
                {/* if other is true then open it */}
                {isOtherOpen && (
                  <label className="text-white text-[15px]">
                    Write Doctor Schedule
                    <input
                      {...register("schedule", { required: true })}
                      type="text"
                      placeholder="schedule"
                      className="input input-bordered input-primary ms-2 text-black "
                    />
                  </label>
                )}
                {errors?.schedule && (
                  <span className="text-red-500">this field is required</span>
                )}
              </div>

              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text font-semibold text-yellow-400">
                    Fees*
                  </span>
                </label>
                <input
                  {...register("fees", { required: true, valueAsNumber: true })}
                  type="number"
                  placeholder="Price"
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
                  <span className="label-text font-semibold text-yellow-400">
                    Time*
                  </span>
                </label>
                <input
                  {...register("time", { required: true })}
                  type="text"
                  placeholder="4.00 PM - 8.00 PM"
                  className="input input-bordered w-full "
                />
                {errors?.time && (
                  <span className="text-red-500">this field is required</span>
                )}
              </div>

              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text font-semibold text-yellow-400">
                    Education*
                  </span>
                </label>
                <input
                  {...register("education", { required: true })}
                  type="text"
                  placeholder="MBBS"
                  className="input input-bordered w-full "
                />
                {errors?.education && (
                  <span className="text-red-500">this field is required</span>
                )}
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-yellow-400">Description</span>
              </label>
              <textarea
                {...register("description", { required: false })}
                className="textarea textarea-bordered h-24"
                placeholder="ঢাকা মেডিকেল কলেজ"
              ></textarea>
            </div>
            <div className="flex gap-5  items-center">
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text font-semibold text-yellow-400">
                    Specialist
                  </span>
                </label>
                <input
                  {...register("specialist", { required: false })}
                  type="text"
                  placeholder="In child"
                  className="input input-bordered w-full "
                />
              </div>
              <input
                {...register("image", { required: true })}
                type="file"
                className="file-input file-input-warning w-full mt-5 "
              />
              {errors?.image && (
                <span className="text-red-500">this field is required</span>
              )}
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
                <input
                  className="btn btn-warning btn-sm mt-9"
                  type="submit"
                  value="Submit"
                />
              )}
            </div>
          </form>

          {/* action */}

          <div className="modal-action">
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

export default AddDoctModal;
