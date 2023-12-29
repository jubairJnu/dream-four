/* eslint-disable no-unused-vars */
import {  useEffect, useState } from "react";
import numberToWords from "number-to-words";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const DoctorAppointment = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();

  const [error, setError] = useState(" ");
  const [batchs, setBatch] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState([]);
  const [totalInprice, settotalInPrice] = useState(null); //total
  const [inamount, setinamount] = useState(null);
  const [priceField, setpriceField] = useState([]);
  const [coverted, setcoverted] = useState([]);

  //hnadler
  const handlePriceWord = (event) => {
    const paidField = event.target.value;
    setpriceField(paidField);
    console.log(paidField);

    const convert = numberToWords.toWords(paidField);
    console.log(convert);
    setcoverted(convert);
    setFormData((prevFormData) => ({
      ...prevFormData,
      inWord: convert,
    }));
  };

  // change handle

  const handleTotalChange = (e) => {
    //total the pashe to totaamount from fees
    const amountField = parseFloat(e.target.value);
    settotalInPrice(amountField);
    setinamount(amountField);
    // eslint-disable-next-line no-undef
    recalculateTotal(amountField, newAmount);
  };

  const handleDiscountChange = (e) => {
    const discountField = parseFloat(e.target.value) || 0; // Convert to number or default to 0
    // const grandTotal = totalInprice - discountField;
    settotalInPrice(discountField);
    recalculateTotal(inamount, discountField);
  };

  const recalculateTotal = (amountField, discountField) => {
    const finalTotal = amountField - discountField;
    settotalInPrice(finalTotal);
  };

  const onSubmit = (data) => {
    const { student_name, phone, course, batch, fee, total, discount, paid } =
      data;
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    // Format the date as "YYYY-MM-DDTHH:mm:ss.sssZ"
    const formattedDate = `${year}-${month}-${day}`;

    // const UserName = user.displayName;
    // const userEmail = user.email;

    const newAdmisson = {
      student_name,
      // user: UserName,
      // email: userEmail,
      date: formattedDate,
      phone,
      course,
      batch,
      discount: parseFloat(discount),
      fee: parseFloat(fee),
      total: totalInprice,
      paid: parseFloat(paid),
      due: totalInprice - paid,
      inWord: coverted,
      access: "allow",
      status: "accepted",
    };
    fetch("http://localhost:3000/create_admission", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newAdmisson),
    })
      .then((res) => res.json())
      .then((admission) => {
        if (admission.insertedId) {
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
        } else if (admission.message == "already exisit") {
          setError("This student already exists");
          reset();
        }
      });
  };

  //
  useEffect(() => {
    fetch("https://dream-four-server.vercel.app/doctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data));
  }, []);

  const discountValue = watch("discount");

  return (
    <div>
      <h1 className="text-center py-8 text-2xl text-green-500">
        Doctor Appointment
      </h1>
      <hr />
      <div className=" shadow-2xl p-4 ">
        {/* {error && <span className="text-red-500 text-sm text-start text-center"> {error} </span>} */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="md:flex justify-between ">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text md:text-[18px] font-semibold">
                  Name *
                </span>
              </label>
              <input
                {...register("student_name", { required: true })}
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full input-primary"
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
                  Phone Number *
                </span>
              </label>
              <input
                {...register("phone", { required: true })}
                type="number"
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
                {...register("batch", { required: true })}
                className="select select-bordered select-primary  text-black"
              >
                {doctors?.map((doctor) => (
                  <option key={doctor._id}>{doctor.name}</option>
                ))}
              </select>
              {errors.batch && (
                <span className="text-red-500 text-sm text-start">
                  this field is required
                </span>
              )}
            </div>

            {/* date */}
            <div className="form-control md:ms-6 w-full">
              <label className="label">
                <span className="label-text md:text-[18px] font-semibold">
                  Date *
                </span>
              </label>
              <input
                {...register("phone", { required: true })}
                type="date"
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
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text md:text-[18px] font-semibold">
                  Fee *{" "}
                </span>
              </label>
              <input
                {...register("fee", { required: true, valueAsNumber: true })}
                type="number"
                placeholder="Amount"
                onChange={handleTotalChange}
                // ref={control.register}
                className="input input-bordered input-primary"
              />
            </div>
            <div className="form-control md:ms-6 w-full">
              <label className="label">
                <span className="label-text md:text-[18px] font-semibold">
                  Total Amount *{" "}
                </span>
              </label>
              <input
                {...register("total", { required: false, valueAsNumber: true })}
                type="number"
                placeholder="Total Amount"
                value={totalInprice}
                readOnly
                className="input input-bordered input-primary  text-blackbg-slate-200"
              />
            </div>
          </div>

          <div className="md:flex justify-between">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text md:text-[18px] font-semibold">
                  Discount
                </span>
              </label>
              <input
                {...register("discount", {})}
                type="number"
                placeholder="Enter Amount"
                onChange={handleDiscountChange}
                className="input input-bordered input-primary"
              />

              {/* Conditional extra field based on the value of discount */}
              {discountValue && (
                <div className="form-control mt-2 w-full">
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
                  {errors.extraField && (
                    <span className="text-red-500 text-sm">
                      Enter Refference For discount.
                    </span>
                  )}
                </div>
              )}
            </div>

            {/*  */}
            <div className="form-control md:ms-6 w-full">
              <label className="label">
                <span className="label-text md:text-[18px] font-semibold">
                  Pay Now *
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
                className="input input-bordered input-primary  text-black"
              />
              <p className="text-red-500 text-sm text-start">
                {" "}
                {errors.paid?.message}{" "}
              </p>
              <p className="my-4 capitalize text-sm text-start">
                {" "}
                <span className="font-bold text-blue-700 text-sm text-start ">
                  In Word:
                </span>{" "}
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
            {/* <Modal isOpen={isModalOpen} onClose={closeModal} formData={formData} Order={Order} /> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorAppointment;
