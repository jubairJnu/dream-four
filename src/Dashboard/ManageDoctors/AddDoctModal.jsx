import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
const img_hosting_token = import.meta.env.VITE_IMG_KEY;

const AddDoctModal = ({ isOpen, onClose }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`


  const onSubmit = data => {
    const formData = new FormData();
    formData.append('image', (data.image[0]));
    fetch(img_hosting_url, {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(responseImage => {
      const imageUrl = responseImage.data.display_url;
    const { name,mobile, schedule, education ,time, fees, description } = data;
    const doctInfo = { name,mobile, schedule,education ,time, fees, description, image:imageUrl };
    fetch('https://dream-four-server.vercel.app/doctor',{
      method:"POST",
      headers:{
        'content-type': 'application/json',
      },
      body:JSON.stringify(doctInfo)
    })
    .then(res => res.json())
    .then(data =>{
      console.log('doctor', data);
      if (data.insertedId) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Added Successfully',
          showConfirmButton: false,
          timer: 1500
        })
      }
      reset();
      onClose();
    })
    })
   
  }




  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? '' : 'hidden'}`}>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-container  bg-[#2f6bcc] w-1/2 mx-auto rounded-md shadow-lg z-50">
        <div className="modal-header">

          <span className="modal-close" onClick={onClose}>&times;</span>
        </div>
        <div className="modal-body p-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-5 ">

              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text font-semibold text-yellow-400">name*</span>

                </label>
                <input  {...register("name", { required: true, })} type="text" placeholder="Name" className="input input-bordered w-full " />
                {errors?.name && <span className="text-red-500">this field is required</span>}
              </div>

              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text font-semibold text-yellow-400">Mobile*</span>
                </label>
                <input  {...register("mobile", { required: true, })} type="text" placeholder="01***" className="input input-bordered w-full " />
                {errors?.end && <span className="text-red-500">this field is required</span>}
              </div>
            </div>

            <div className="flex gap-5 ">

              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text font-semibold text-yellow-400">Schedule*</span>

                </label>
                <select defaultValue="pick One" {...register("schedule", { required: true, })} className="select select-bordered">
                  <option disabled >Pick One</option>
                  <option> শনি </option>
                  <option> রবি </option>
                  <option> সোম </option>
                  <option> মঙ্গল </option>
                  <option> বুধ </option>
                  <option> বৃহ: </option>
                  <option> শুক্র </option>
                </select>
                {errors?.schedule && <span className="text-red-500">this field is required</span>}
              </div>

              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text font-semibold text-yellow-400">Fees*</span>
                </label>
                <input {...register("fees", { required: true, valueAsNumber: true })} type="number" placeholder="Price" className="input input-bordered w-full " />
                {errors?.fees && <span className="text-red-500">this field is required</span>}
              </div>
            </div>
            <div className="flex gap-5 ">

              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text font-semibold text-yellow-400">Time*</span>

                </label>
                <input  {...register("time", { required: true, })} type="text" placeholder="4.00 PM - 8.00 PM" className="input input-bordered w-full " />
                {errors?.start && <span className="text-red-500">this field is required</span>}
              </div>

              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text font-semibold text-yellow-400">Specialist / Education*</span>
                </label>
                <input  {...register("education", { required: true, })} type="text" placeholder="MBBS" className="input input-bordered w-full " />
                {errors?.end && <span className="text-red-500">this field is required</span>}
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-yellow-400">Description</span>
              </label>
              <textarea {...register("description", { required: false })} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>

            </div>
            <input {...register("image", { required: true })} type="file" className="file-input file-input-warning w-full mt-5 " />
            {errors?.image && <span className="text-red-500">this field is required</span>}
            <div>
              <input className="btn btn-warning btn-sm mt-9" type="submit" value="Submit" />
            </div>
          </form>

          {/* action */}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm  bg-red-500 text-white hover:text-red-500" onClick={onClose}>
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