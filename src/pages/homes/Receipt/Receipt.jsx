/* eslint-disable no-undef */

import { useContext, useEffect, useState } from "react";
import numberToWords from "number-to-words";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Modal from "../../../component/Modal";
import { AuthContext } from "../../../Provider/AuthProvider";
import ReceiptTable from "./ReceiptTable";
import Select from "react-select";

const Receipt = () => {
  const base_url = import.meta.env.VITE_BASE_URL;
  const { userInfo } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]); //add new start

  const [discountType, setDiscountType] = useState("flat"); // add new end
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState([]);
  const [totalInprice, settotalInPrice] = useState([]);
  const [inamount, setinamount] = useState([]);
  const [priceField, setpriceField] = useState([]);
  const [coverted, setcoverted] = useState([]);
  const [Order, setOrder] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();

  useEffect(() => {
    fetch(`${base_url}/services`)
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  // handle price in word

  const handlePriceWord = (event) => {
    const paidField = event.target.value;
    setpriceField(paidField);
    console.log(paidField);

    const convert = numberToWords.toWords(paidField);
    console.log(convert);
    setcoverted(convert);
    // setFormData((prevFormData) => ({
    //   ...prevFormData,
    //   inWord: convert,
    // }));
  };
  //
  const options = services?.map((serviceOption) => ({
    value: serviceOption.name,
    label: serviceOption.name,
  }));

  const handleServiceChange = (selectedOptions) => {
    setSelectedServices(selectedOptions);

    // Calculate total fee based on the selected services
    const total = selectedOptions.reduce((acc, selectedService) => {
      const selectedServiceObj = services.find(
        (service) => service.name === selectedService.value
      );

      if (selectedServiceObj) {
        acc += parseFloat(selectedServiceObj.price);
      }
      return acc;
    }, 0);
    settotalInPrice(total);
    setinamount(total);
    recalculateTotal(total, newAmount);
  };

  const handleDiscountValueChange = (event) => {
    const discountField = parseFloat(event.target.value) || 0;

    recalculateTotal(inamount, discountField);
  };

  const handleDiscountTypeChange = (event) => {
    const type = event.target.value;
    setDiscountType(type);
  };

  const recalculateTotal = (acc, discountField) => {
    if (discountType === "flat") {
      const discount = acc - parseFloat(discountField);
      settotalInPrice(discount);
    } else if (discountType === "percentage") {
      const discountPercentage = parseFloat(discountField);
      const discountAmount = (acc * discountPercentage) / 100;
      const finalTotal = acc - discountAmount;
      settotalInPrice(finalTotal);
    }
  };
  useEffect(() => {
    fetch(`${base_url}/users`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  const currentUserEmail = userInfo?.email;

  const currentUser = users.find((user) => user.email === currentUserEmail);

  // doctor fetch;

  useEffect(() => {
    fetch(`${base_url}/doctors`)
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
      });
  }, []);

  // modal-----

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = (data) => {
    const { patient, phone, age, doctor, gender, paid, discount, refference } =
      data;

    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    // Format the date as "YYYY-MM-DDTHH:mm:ss.sssZ"
    const formattedDate = `${year}-${month}-${day}`;

    const UserName = currentUser.name;
    const userEmail = currentUser.email;

    const selectedServiceDetails = selectedServices.map((selectedService) => {
      const serviceObj = services.find(
        (service) => service.name === selectedService.value
      );
      return {
        name: selectedService.value,
        price: serviceObj ? parseFloat(serviceObj.price) : 0,
      };
    });

    const newReceipt = {
      patient,
      user: UserName,
      email: userEmail,
      phone,
      gender,
      age,
      doctor,
      service: selectedServiceDetails,

      total: totalInprice,
      paymentInfo: [
        {
          date: formattedDate,
          discount: parseFloat(discount),

          paid: parseFloat(paid),
          inWord: coverted,
        },
      ],
      refference,
    };

    console.log(newReceipt);
    Swal.fire({
      title: "Are you sure?",
      text: "You cannot edit it!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Submit",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${base_url}/receipt-entry`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newReceipt),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              const orderId = data.OrderId; // Assuming your response contains the OrderId
              console.log("OrderId:", orderId);
              setOrder(orderId);
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Added Successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        reset();
        setFormData(newReceipt);
        openModal();
      }
    });
  };

  // discount
  const discountFieldValue = watch("discount");
  console.log("disfield", discountFieldValue);

  return (
    <div className="container mx-auto mt-16  ">
      <h1 className="text-center font-bold text-2xl">Receipt Entry</h1>
      <div className=" px-10 ">
        <div className=" bg-white  shadow-2xl p-4 ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="md:flex justify-between ">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text md:text-[18px] font-semibold">
                    Patient Name *{" "}
                  </span>
                </label>
                <input
                  {...register("patient", { required: true })}
                  type="text"
                  placeholder="Patient Name"
                  className="input input-bordered w-full input-primary"
                />
                {errors.patient && (
                  <span className="text-red-500">Name is required</span>
                )}
              </div>
              {/* phone */}
              <div className="form-control md:ms-6 w-full">
                <label className="label">
                  <span className="label-text md:text-[18px] font-semibold">
                    Phone Number*
                  </span>
                </label>
                <input
                  {...register("phone", { required: true })}
                  type="text"
                  placeholder="phone number"
                  className="input input-bordered input-primary "
                />
                {errors.phone && (
                  <span className="text-red-500">Phone Number is required</span>
                )}
              </div>
              {/* age */}

              <div className="form-control md:ms-6 w-full">
                <label className="label">
                  <span className="label-text md:text-[18px] font-semibold">
                    Age *
                  </span>
                </label>
                <input
                  {...register("age", { required: true })}
                  type="number"
                  placeholder="age"
                  className="input input-bordered input-primary "
                />
                {errors.age && (
                  <span className="text-red-500">Age is required</span>
                )}
              </div>
              {/* Gender */}
              <div className="form-control md:ms-6 w-full">
                <label className="label">
                  <span className="label-text md:text-[18px] font-semibold">
                    Gender *
                  </span>
                </label>
                <select
                  defaultValue="pick One"
                  {...register("gender", { required: true })}
                  className="select select-bordered select-primary"
                >
                  <option selected disabled value="">
                    Pick One
                  </option>
                  <option>Male</option>
                  <option>Femaale</option>
                </select>
                {errors.gender && (
                  <span className="text-red-500">Gender is required</span>
                )}
              </div>
            </div>

            <div className="md:flex justify-between">
              <div className="form-control  w-full">
                <label className="label">
                  <span className="label-text md:text-[18px]  font-semibold">
                    Doctor
                  </span>
                </label>
                <select
                  defaultValue="pick One"
                  {...register("doctor", { required: false })}
                  className="select select-bordered select-primary"
                >
                  <option disabled>Pick One</option>
                  {doctors?.map((doctor) => (
                    <option key={doctor._id}>
                      {" "}
                      {doctor.name} ({doctor?.specialist}){" "}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control md:ms-6 w-full">
                <label className="label">
                  <span className="label-text md:text-[18px]  font-semibold">
                    Service *
                  </span>
                </label>
                <Select
                  value={selectedServices}
                  onChange={handleServiceChange} // Move the onChange here
                  options={options}
                  isMulti
                  required
                  className="w-full "
                />
              </div>
            </div>

            <div className="md:flex justify-between">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text md:text-[18px] font-semibold">
                    Discount Type:
                  </span>
                </label>
                <select
                  className="select select-bordered select-primary"
                  value={discountType}
                  onChange={handleDiscountTypeChange}
                >
                  <option disabled selected value=" ">
                    Select
                  </option>
                  <option value="flat">Flat</option>
                  <option value="percentage">Percentage</option>
                </select>
              </div>
              <div className="form-control w-full md:ms-6">
                <label className="label">
                  <span className="label-text md:text-[18px] font-semibold">
                    Discount
                  </span>
                </label>

                <input
                  {...register("discount", {})}
                  type="number"
                  placeholder="Enter Amount"
                  onChange={handleDiscountValueChange}
                  className="input input-bordered input-primary"
                />
              </div>
            </div>

            <div className="md:flex justify-between">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text md:text-[18px] font-semibold">
                    Total Amount *
                  </span>
                </label>
                <input
                  {...register("total", {
                    required: false,
                    valueAsNumber: true,
                  })}
                  type="number"
                  placeholder="Total Amount"
                  value={totalInprice}
                  readOnly
                  className="input input-bordered input-primary bg-slate-200"
                />
              </div>
              {/*  */}

              <div className="form-control md:ms-6 w-full">
                <label className="label">
                  <span className="label-text md:text-[18px] font-semibold">
                    Pay Now *{" "}
                  </span>
                </label>
                <input
                  {...register("paid", {
                    required: true,
                    maxLength: 5,
                    valueAsNumber: true,
                    validate: (data) => {
                      if (totalInprice < data) {
                        return "Paid amount is bigger than total";
                      }
                    },
                  })}
                  type="number"
                  placeholder="Enter Amount"
                  value={priceField}
                  onChange={handlePriceWord}
                  className="input input-bordered input-primary "
                />
                <p className="text-red-500"> {errors.paid?.message} </p>
              </div>
            </div>
            <div className="flex justify-between">
              {/* conditionally required value */}
              {discountFieldValue && (
                <div className="form-control mt-2 w-1/2">
                  <label className="label">
                    <span className="label-text md:text-[18px] font-semibold">
                      Refference
                    </span>
                  </label>
                  <input
                    {...register("refference", { required: true })}
                    type="text"
                    placeholder="Refference"
                    className="input input-bordered input-primary"
                  />
                  {errors.refference && (
                    <span className="text-red-500 text-sm">
                      Enter Refference For discount.
                    </span>
                  )}
                </div>
              )}

              <div className="w-1/2 md:ms-6">
                <p className="my-4 capitalize">
                  {" "}
                  <span className="font-bold text-blue-700 ">In Word:</span>
                  {coverted} Tk Only{" "}
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <input
                className="btn btn-primary btn-sm mt-3 "
                type="submit"
                value="Submit"
              />
              <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                formData={formData}
                Order={Order}
              />
            </div>
          </form>
        </div>
      </div>
      <ReceiptTable />
    </div>
  );
};

export default Receipt;
