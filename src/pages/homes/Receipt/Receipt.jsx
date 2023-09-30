import { useContext, useEffect, useState } from "react";
import numberToWords from 'number-to-words';
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Modal from "../../../component/Modal";
import { AuthContext } from "../../../Provider/AuthProvider";
import ReceiptTable from "./ReceiptTable";

const Receipt = () => {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState([]);
  const [totalInprice, settotalInPrice] = useState([]);
  const [inamount, setinamount] = useState([]);
  const [priceField, setpriceField] = useState([]);
  const [coverted, setcoverted] = useState([]);
  const [Order, setOrder] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors }, watch, } = useForm();
  useEffect(() => {
    fetch('https://dream-four-server.vercel.app/services')
      .then(res => res.json())
      .then(data => setServices(data))
  }, [])

  // handle price in word

  const handlePriceWord = event => {
    const paidField = event.target.value;
    setpriceField(paidField);
    console.log(paidField)

    const convert = numberToWords.toWords(paidField)
    console.log(convert)
    setcoverted(convert);
    // setFormData((prevFormData) => ({
    //   ...prevFormData,
    //   inWord: convert,
    // }));
  }

  // change handle
  const handleDiscountChange = e => {
    const discountField = e.target.value;
    const grandTotal = inamount - (0 || discountField);
    console.log("total", grandTotal)
    settotalInPrice(grandTotal);
  }

  const handleTotalChange = e => {
    const amountField = e.target.value;
    setinamount(amountField)
    console.log(amountField);


  }


  // doctor fetch;

  useEffect(() => {
    fetch('https://dream-four-server.vercel.app/doctors')
      .then(res => res.json())
      .then(data => setDoctors(data))
  }, [])

  // modal-----

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = (data) => {
    const { patient, phone, amount, doctor, service, total, paid, discount } = data;

    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');


    // Format the date as "YYYY-MM-DDTHH:mm:ss.sssZ"
    const formattedDate = `${year}-${month}-${day}`;


    const UserName = user.displayName;
    const userEmail = user.email;
    const newReceipt = {
      patient,
      user: UserName,
      email: userEmail,
      date: formattedDate,
      phone,
      doctor,
      service,
      discount: parseFloat(discount),
      amount: parseFloat(amount),
      total: totalInprice,
      paid: parseFloat(paid),
      inWord: coverted
    };

    console.log(newReceipt);
    Swal.fire({
      title: 'Are you sure?',
      text: "You cannot edit it!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Submit'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch('https://dream-four-server.vercel.app/receipt-entry', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'

          },
          body: JSON.stringify(newReceipt)
        })
          .then(res => res.json())
          .then(data => {

            if (data.insertedId) {
              const orderId = data.OrderId; // Assuming your response contains the OrderId
              console.log('OrderId:', orderId);
              setOrder(orderId)
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Added Successfully',
                showConfirmButton: false,
                timer: 1500
              })


            }
          })
        reset();

        setFormData(newReceipt)
        openModal();
      }
    })
  }

  return (
    <div className="container mx-auto mt-24  ">
      <h1 className="text-center font-bold text-2xl">Receipt Entry</h1>
      <div className=" px-10 ">
        <div className=" bg-white  shadow-2xl p-4 ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="md:flex justify-between ">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text md:text-[18px] font-semibold">Patient Name * </span>
                </label>
                <input
                  {...register("patient", { required: true, })}
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered w-full input-primary"
                />
                {errors.patient && <span className="text-red-500">this field is required</span>}
              </div>

              <div className="form-control md:ms-6 w-full">
                <label className="label">
                  <span className="label-text md:text-[18px] font-semibold">Phone Number*</span>
                </label>
                <input
                  {...register("phone", { required: true, })}
                  type="number"
                  placeholder="phone number"
                  className="input input-bordered input-primary "
                />
                {errors.phone && <span className="text-red-500">this field is required</span>}
              </div>
            </div>

            <div className="md:flex justify-between">
              <div className="form-control  w-full">
                <label className="label">
                  <span className="label-text md:text-[18px]  font-semibold">Doctor *</span>
                </label>
                <select defaultValue="pick One" {...register("doctor", { required: false })} className="select select-bordered select-primary">
                  <option disabled >Pick One</option>
                  {
                    doctors?.map(doctor => <option key={doctor._id}> {doctor.name} </option>)
                  }

                </select>
              </div>
              <div className="form-control md:ms-6 w-full">
                <label className="label">
                  <span className="label-text md:text-[18px]  font-semibold">Service *</span>
                </label>
                <select defaultValue="pick One" {...register("service", { required: false })} className="select select-bordered select-primary">
                  <option disabled >Pick One</option>
                  {
                    services?.map(service => <option key={service._id}> {service.name} </option>)
                  }
                </select>
              </div>
            </div>

            <div className="md:flex justify-between">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text md:text-[18px] font-semibold">Amount * </span>
                </label>
                <input
                  {...register("amount", { required: true, valueAsNumber: true })}
                  type="number"
                  placeholder="Amount"
                  onChange={handleTotalChange}
                  // ref={control.register}
                  className="input input-bordered input-primary"
                />
              </div>
              <div className="form-control md:ms-6 w-full">
                <label className="label">
                  <span className="label-text md:text-[18px] font-semibold">Total Amount * </span>
                </label>
                <input
                  {...register("total", { required: false, valueAsNumber: true })}
                  type="number"
                  placeholder="Total Amount"
                  value={totalInprice}
                  readOnly
                  className="input input-bordered input-primary bg-slate-200"
                />
              </div>
            </div>

            <div className="md:flex justify-between">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text md:text-[18px] font-semibold">Discount </span>
                </label>
                <input
                  {...register("discount", {

                  })}
                  type="number"
                  placeholder="Enter Amount"
                  onChange={handleDiscountChange}

                  className="input input-bordered input-primary"
                />

              </div>
              <div className="form-control md:ms-6 w-full">
                <label className="label">
                  <span className="label-text md:text-[18px] font-semibold">Pay Now * </span>
                </label>
                <input
                  {...register("paid", {
                    required: true, maxLength: 5, valueAsNumber: true, validate: data => {
                      if (totalInprice < data) {
                        return "Paid amount is bigger than total"
                      }
                    }
                  })}
                  type="number"
                  placeholder="Enter Amount"
                  value={priceField}
                  onChange={handlePriceWord}
                  className="input input-bordered input-primary "
                />
                <p className="text-red-500"> {errors.paid?.message} </p>
                <p className="my-4 capitalize"> <span className="font-bold text-blue-700 ">In Word:</span > {coverted} Tk Only  </p>
              </div>
            </div>

            <div className="flex justify-center">

              <input className="btn btn-primary btn-sm mt-3 " type="submit" value="Submit" />
              <Modal isOpen={isModalOpen} onClose={closeModal} formData={formData} Order={Order} />
            </div>
          </form>
        </div>

      </div>
      <ReceiptTable formData={formData} />
    </div>
  );
};

export default Receipt;