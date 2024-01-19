import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ScaleLoader } from "react-spinners";
import Swal from "sweetalert2";
import Loading from "../../component/Loading";
import { usePDF } from "react-to-pdf";
import { AuthContext } from "../../Provider/AuthProvider";

const ExpenditureAdd = () => {
  const base_url = import.meta.env.VITE_BASE_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [expenditures, setExpenditures] = useState([]);
  const [users, setUsers] = useState([]);
  const { userInfo } = useContext(AuthContext);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetch(`${base_url}/users`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const currentUserEmail = userInfo?.email;

  const currentUser = users.find((user) => user.email === currentUserEmail);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const calculateTotalPrice = () => {
    const total = expenditures.reduce((accumulator, expenditure) => {
      return accumulator + parseFloat(expenditure.amount);
    }, 0);
    setTotalPrice(total);
  };

  useEffect(() => {
    // Step 2: Call the calculateTotalPrice function when Incomes data changes
    calculateTotalPrice();
  }, [expenditures]);

  // handle search

  const handleSearch = (event) => {
    setIsLoading(true);
    event.preventDefault();
    const form = event.target;
    const startedDate = form.startDate.value;
    const endedDate = form.endDate.value;
    

    //
    const params = new URLSearchParams();
    params.append("startDate", startedDate);
    params.append("endDate", endedDate);

    //fetch

    // fetch(`${base_url}/all-incomeledger?${params.toString()}`)
    fetch(`${base_url}/expenditure_list/?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setExpenditures(data);

        setIsLoading(false);
      });
  };

  const { toPDF, targetRef } = usePDF({ filename: "Approve_Expenditure.pdf" });

  // submit

  const onSubmit = (data) => {
    setIsLoading(true);
    const UserName = currentUser?.name;
    const userEmail = currentUser?.email;
    const { purpose, amount, date, biller } = data;
    const expenditureInfo = {
      user: UserName,
      email: userEmail,
      purpose,
      biller,
      amount,
      date,
      type: "expenditure",
    };
    // fetch(`${base_url}/expenditure`,
    fetch(`${base_url}/expenditure`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(expenditureInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
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
      });
  };

  return (
    <div className="w-full md:px-10">
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-5 ">
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text font-semibold  ">Purpose *</span>
              </label>
              <input
                {...register("purpose", { required: true })}
                type="text"
                placeholder="Purpose"
                className="input input-bordered w-full "
              />
              {errors?.purpose && (
                <span className="text-red-500">this field is required</span>
              )}
            </div>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text font-semibold  ">Biller Name </span>
              </label>
              <input
                {...register("biller", { required: false })}
                type="text"
                placeholder="Customer Name"
                className="input input-bordered w-full "
              />
            </div>
          </div>

          <div className="flex gap-5 ">
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text font-semibold  ">Amount *</span>
              </label>
              <input
                {...register("amount", {
                  required: true,
                  valueAsNumber: true,
                })}
                type="number"
                placeholder="Price"
                className="input input-bordered w-full "
              />
              {errors?.amount && (
                <span className="text-red-500">this field is required</span>
              )}
            </div>

            {/* 2 */}

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold ">
                  Expenditure Date *
                </span>
              </label>
              <input
                {...register("date", { required: true })}
                className="input input-bordered w-full"
                type="date"
              ></input>
              {errors?.date && (
                <span className="text-red-500">this field is required</span>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="flex">
              <ScaleLoader color="#36d7b7" />
              <input
                className="btn btn-warning btn-block mt-10"
                type="submit"
                value="Adding.."
                disabled={isLoading}
              />
            </div>
          ) : (
            <input
              className="btn btn-warning btn-block mt-10"
              type="submit"
              value="Add"
            />
          )}
        </form>
      </div>

      {/* search */}
      <h1 className="text-center text-xl font-bold my-6">Search Expenditure</h1>
      <hr />
      <div className="mt-5">
        <form
          onSubmit={handleSearch}
          className="md:flex justify-center items-center mb-10 gap-3 "
        >
          <div className="form-control sm:my-2">
            <label className="input-group">
              <span className="bg-[#1653B2] text-white ">Start Date</span>
              <input
                name="startDate"
                type="date"
                required
                className="input input-bordered"
                min={getCurrentDate()}
                max={getCurrentDate()}
              />
            </label>
          </div>
          {/*  */}
          <div className="form-control my-2">
            <label className="input-group">
              <span className="bg-[#1653B2] text-white ">End Date</span>
              <input
                name="endDate"
                type="date"
                required
                placeholder="info@site.com"
                className="input input-bordered"
                min={getCurrentDate()}
                max={getCurrentDate()}
              />
            </label>
          </div>
          {/* 3 */}

          <button className="btn  btn-primary cursor-pointer ">
            {" "}
            <input
              className="  text-white"
              type="submit"
              value="Search"
            ></input>
          </button>
        </form>
      </div>
      <div className="flex justify-between items-center">
        {/* download */}
        <button
          className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white p-2 mb-2 rounded-md hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-500"
          onClick={() => toPDF()}
        >
          Download PDF
        </button>
      </div>
      {/* table */}
      <div className="mt-2">
        <table ref={targetRef} className="table">
          {/* head */}
          <thead>
            <tr className="md:text-[20px] bg-[#1653B2] text-white text-center py-2">
              <th>#</th>

              <th>Purpose</th>
              <th>Date</th>
              <th>Amount</th>
              <th>User Name</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {isLoading ? (
              <Loading />
            ) : (
              <>
                {expenditures && expenditures.length > 0
                  ? expenditures?.map((expenditure, index) => (
                      <tr key={expenditure._id}>
                        <th>{index + 1}</th>

                        <td>
                          <p>{expenditure?.purpose}</p>
                        </td>
                        <td>{expenditure?.date}</td>
                        <td>{expenditure?.amount}</td>
                        <td>{expenditure?.user}</td>
                      </tr>
                    ))
                  : "no expenditure found"}
              </>
            )}
            <tr className="border-2 font-bold text-[16px]">
              <td></td>
              <td>Total</td>
              <td></td>
              <td>{totalPrice} tk</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenditureAdd;
