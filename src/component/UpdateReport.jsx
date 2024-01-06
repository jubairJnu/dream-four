import { useEffect, useState } from "react";
import Loading from "./Loading";
import { ScaleLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import UnavailableModal from "./UnavailableModal";

const UpdateReport = () => {
  const base_url = import.meta.env.VITE_BASE_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [searchDatas, setSearchDatas] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch(`${base_url}/doctors`)
      .then((res) => res.json())
      .then((data) => setDoctors(data));
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    openModal();
  };

  //

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //

  const handleOrderSearch = (e) => {
    const orderId = e.target.value;
    if (orderId && orderId.length === 6) {
      setIsLoading(true);
      fetch(`${base_url}/search-orderid`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ OrderId: orderId }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
          setSearchDatas(data);
          setIsLoading(false);
        });
    }
  };
  return (
    <div className="w-full md:px-10">
      <div className="md:flex justify-between items-center">
        <div>
          <form>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-black">Order Id </span>
              </label>
              <input
                name="orderId"
                onChange={handleOrderSearch}
                className="input input-bordered input-info w-full "
                required
                disabled={isLoading}
              />
            </div>
          </form>
        </div>

        {/* search data */}

        {isLoading ? (
          <Loading />
        ) : (
          <div>
            {searchDatas &&
            searchDatas.data &&
            searchDatas.data.orderDetails &&
            searchDatas.data.orderDetails.length > 0 ? (
              <div>
                <p>
                  Patient Name: {searchDatas?.data?.orderDetails[0]?.patient}
                </p>
              </div>
            ) : (
              <p>No order details found</p>
            )}
          </div>
        )}
      </div>

      {/* report entry */}
      {searchDatas &&
      searchDatas.data &&
      searchDatas.data.orderDetails &&
      searchDatas.data.orderDetails.length > 0 ? (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-5 ">
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text font-semibold  ">Order Id</span>
                </label>
                <input
                  {...register("OrderId", { required: false })}
                  type="text"
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
                  <span className="label-text font-semibold  ">Ref Doctor</span>
                </label>
                <select
                  {...register("schedule", { required: false })}
                  className="select select-bordered"
                >
                  <option disabled selected value=" ">
                    Pick One
                  </option>
                  {doctors?.map((doctor) => (
                    <option key={doctor._id}> {doctor?.name} </option>
                  ))}
                </select>
              </div>

              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text font-semibold  ">
                    Report Name
                  </span>
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  className="input input-bordered w-full "
                  placeholder="ECG, Blood"
                />
                {errors?.fees && (
                  <span className="text-red-500">this field is required</span>
                )}
              </div>
            </div>

            <div className="md:flex gap-5 items-center justify-between">
              {/*  */}

              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text font-semibold  ">
                    Report Type
                  </span>
                </label>
                <input
                  {...register("type", { required: true })}
                  type="text"
                  className="input input-bordered w-full "
                  placeholder="ECG, Blood"
                />
                {errors?.fees && (
                  <span className="text-red-500">this field is required</span>
                )}
              </div>

              {/*  */}

              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text font-semibold  ">
                    Report File
                  </span>
                </label>
                <input
                  {...register("report", { required: false })}
                  type="file"
                  className="file-input file-input-warning w-full mt-5 "
                />
              </div>
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
          <UnavailableModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default UpdateReport;
