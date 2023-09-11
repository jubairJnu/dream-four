

const SignUp = () => {
  return (
    <div className="mt-4">
      

      <div className="hero  ">
  <div className="hero-content">
    {/* <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div> */}
    <div className="w-full  shadow-2xl bg-base-100">
      <h1 className="text-blue-700 text-xl text-center font-semibold p-4">Create A New User</h1>
      <div className="card-body">
        <div >
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder="Name" className="input input-bordered input-primary w-full max-w-xs" />
        </div>
        <div >
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered input-primary w-full max-w-xs" />
        </div>
        <div >
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <input type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
        </div>
        <div >
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered input-primary w-full max-w-xs" />
        
        </div>
        <div className=" mt-6">
          <button className="btn btn-primary">Create</button>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  );
};

export default SignUp;