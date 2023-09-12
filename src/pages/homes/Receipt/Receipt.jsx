import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Receipt = () => {
  const { register, handleSubmit,reset } = useForm();

  const onSubmit = (data) =>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You cannot edit it!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  return (
    <div className="container mx-auto mt-24">
      <h1 className="text-center font-bold text-2xl">Receipt Entry</h1>
      <div className="hero min-h-screen px-10 ">
        <div className="card flex-shrink-0 md:w-1/2 w-full max-w-sm shadow-2xl p-4 ">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text md:text-[18px] font-semibold">Patient Name * </span>
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Your Name"
                className="input input-bordered input-primary"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text md:text-[18px] font-semibold">Phone Number*</span>
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="example@email.com "
                className="input input-bordered input-primary "
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Doctor *</span>
              </label>
              <select defaultValue="pick One" {...register("doctor", { required: true })} className="select select-bordered select-primary">
              <option disabled >Pick One</option>
              <option>Samad</option>
              <option>Imran</option>
              <option>Imu</option>
              <option>Zakir</option>
              <option>Hossain</option>
            </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Service *</span>
              </label>
              <select defaultValue="pick One" {...register("service", { required: true })} className="select select-bordered select-primary">
              <option disabled >Pick One</option>
              <option>Operation</option>
              <option>Sizzore</option>
              <option>Consultant</option>
              <option>Medicine</option>
              <option>Report show</option>
            </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text md:text-[18px] font-semibold">Total Amount * </span>
              </label>
              <input
                {...register("total", { required: true })}
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
                {...register("paid", { required: true })}
                type="number"
                placeholder="Enter Amount"
                className="input input-bordered input-primary"
              />
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