import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Receipt = () => {
  const [services, setServices] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const { register, handleSubmit,reset,formState:{errors}, watch } = useForm();

  const onSubmit = (data) =>{
    const {patient, phone,doctor,service,total,paid } = data;
    const newReceipt = {patient, phone,doctor,service,total:parseFloat(total),paid:parseFloat(paid) }
    console.log(newReceipt);
    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: "You cannot edit it!",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Yes, delete it!'
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     Swal.fire(
    //       'Deleted!',
    //       'Your file has been deleted.',
    //       'success'
    //     )
    //   }
    // })
  }

  return (
    <div className="container mx-auto mt-24">
      <h1 className="text-center font-bold text-2xl">Receipt Entry</h1>
      <div className=" px-10 ">
        <div className="   w-full max-w-md shadow-2xl p-4 ">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text md:text-[18px] font-semibold">Patient Name * </span>
              </label>
              <input
                {...register("patient", { required: true, })}
                type="text"
                placeholder="Your Name"
                className="input input-bordered input-primary"
              />
              {errors.patient && <span className="text-red-500">this field is required</span>}
            </div>

            <div className="form-control">
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

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Doctor *</span>
              </label>
              <select defaultValue="pick One" {...register("doctor",{required: false } )} className="select select-bordered select-primary">
              <option disabled >Pick One</option>
              {
                doctors?.map(doctor => <option key={doctor._id}> { doctor.name } </option>)
              }
            
            </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Service *</span>
              </label>
              <select defaultValue="pick One" {...register("service",{required: false } )} className="select select-bordered select-primary">
              <option disabled >Pick One</option>
              {
                services?.map(service => <option key={service._id}> { service.name } </option>)
              }
            </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text md:text-[18px] font-semibold">Total Amount * </span>
              </label>
              <input
                {...register("total", { required: true,valueAsNumber:true })}
                type="number"
                placeholder="Your Name"
                className="input input-bordered input-primary"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text md:text-[18px] font-semibold">Pay Now * </span>
              </label>
              <input
                {...register("paid", { required: true, maxLength : 5 ,valueAsNumber:true, validate: data =>{
                  if(watch('total') < data ){
                    return "Paid amount is bigger than total"
                  }
                } })}
                type="number"
                placeholder="Enter Amount"
                className="input input-bordered input-primary"
              />
              <p className="text-red-500"> {errors.paid?.message} </p>
            </div>
           
            <div className="flex justify-center">

              <input className="btn btn-primary btn-sm mt-3 " type="submit" value="Submit" />
            </div>
          </form>
        </div>
      
      </div>
    </div>
  );
};

export default Receipt;