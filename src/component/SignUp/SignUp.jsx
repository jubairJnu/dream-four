import { useForm } from "react-hook-form";
import { useState } from "react";

import Swal from "sweetalert2";
const img_hosting_token = import.meta.env.VITE_IMG_KEY;

const SignUp = () => {
  const base_url = import.meta.env.VITE_BASE_URL;
  const [erro, setErro] = useState("");

  const { register, handleSubmit, reset } = useForm();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((responseImage) => {
        const imageUrl = responseImage.data.display_url;
        const { name, email, password } = data;
        const UserInfo = {
          name,
          email,
          password,
          image: imageUrl,
          role: "staff",
          status: "active",
        };

        fetch(`${base_url}/create_user`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(UserInfo),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message == "already exisit") {
              setErro("User Already Exist");
            } else if (data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Registered Successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              reset();
            }
          });
      });
  };

  return (
    <div className="w-full mt-4  md:p-8 flex justify-center  ">
      {/* ^ Add "flex justify-center items-center" to center the form */}
      <div className="p-3 shadow-2xl bg-blue-50 w-full">
        <h1 className="text-blue-700 text-xl text-center font-semibold p-4">
          Create A New User
        </h1>
        <div className="md:p-10">
          {erro && <p className="text-center text-red-500">{erro}</p>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Name * </span>
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Your Name"
                className="input input-bordered "
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email*</span>
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="example@email.com "
                className="input input-bordered "
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Password*</span>
              </label>
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder="password"
                className="input input-bordered "
              />
            </div>
            <div className="mt-4">
              <label className="label">
                <span className="label-text font-semibold">Photo * </span>
              </label>
              <input
                {...register("image")}
                type="file"
                className="file-input w-full"
              />
            </div>
            <div className="flex justify-center">
              <input
                className="btn btn-primary mt-9 "
                type="submit"
                value="Add User"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
