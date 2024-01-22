import { useEffect, useState } from "react";

import ExpenditureEntryModal from "./ExpenditureEntryModal";
import Loading from "../../component/Loading";
import Swal from "sweetalert2";
import { usePDF } from "react-to-pdf";

const ExpenditureList = () => {
  const base_url = import.meta.env.VITE_BASE_URL;

  const [expenditures, setExpenditures] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkedItems, setCheckedItems] = useState([]);

  const { toPDF, targetRef } = usePDF({ filename: "Approve_Expenditure.pdf" });

  // handle

  const handleSubmit = (event) => {
    console.log(event);
  };

  // handle calculate

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

  // hanlde

  const handleApproveChange = (id) => {
    // Check if the current ID is already in the checkedItems array
    const isChecked = checkedItems.includes(id);

    // If it is, remove the ID from the checkedItems array
    if (isChecked) {
      setCheckedItems(checkedItems.filter((item) => item !== id));
    } else {
      // If it's not, add the ID to the checkedItems array
      setCheckedItems((prevCheckedItems) => [...prevCheckedItems, id]);
    }
  };

  // handle submit

  const handleSubmitApprove = (e) => {
    setIsLoading(true);
    e.preventDefault();
    fetch(`${base_url}/update_approve`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(checkedItems),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);

        if (data.modifiedCount > 0) {
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
            title: "Approved successfully",
          });
        }
      });
  };

  return (
    <div className="w-full md:px-10">
      <h1 className="text-center font-bold mt-2 text-xl">Expenditure List</h1>

      {/* search expenditure */}
      <div>
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
                className="input input-bordered"
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
                placeholder="info@site.com"
                className="input input-bordered"
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
      {/* button */}
      <div className="flex justify-between items-center">
        {/* download */}
        <button
          className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white p-2 mb-2 rounded-md hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-500"
          onClick={() => toPDF()}
        >
          Download PDF
        </button>

        {/* add */}
      </div>

      {/* table*/}
      <div className="mt-2">
        <table ref={targetRef} className="table">
          {/* head */}
          <thead>
            <tr className="md:text-[20px] bg-[#1653B2] text-white text-center py-2">
              <th>#</th>

              <th>Purpose</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Is Approve</th>
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
                        <td>
                          <div className="form-control">
                            <label className="label cursor-pointer">
                              {expenditure?.approve ? (
                                <span className="text-green-500">Approved</span>
                              ) : (
                                <input
                                  type="checkbox"
                                  checked={checkedItems.includes(
                                    expenditure._id
                                  )}
                                  onChange={() =>
                                    handleApproveChange(expenditure._id)
                                  }
                                  className="checkbox checkbox-primary"
                                />
                              )}
                            </label>
                          </div>
                        </td>
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
      {isLoading ? (
        <button
          disabled
          onClick={handleSubmitApprove}
          className="btn btn-primary w-full my-6 "
        >
          Submitting
        </button>
      ) : (
        <button
          onClick={handleSubmitApprove}
          className="btn btn-primary w-full my-6"
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default ExpenditureList;
