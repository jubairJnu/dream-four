import React, { useState } from "react";
import Loading from "../../component/Loading";
import { usePDF } from "react-to-pdf";

const BalanceList = () => {
  const base_url = import.meta.env.VITE_BASE_URL;

  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenditure, setTotalExpenditure] = useState(0);
  const [remainingBalance, setRemainingBalance] = useState(0);

  const { toPDF, targetRef } = usePDF({ filename: "Balance_Details.pdf" });

  // handle

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
    fetch(`${base_url}/balance_details/?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);

        const incomeTotal = data
          .filter((item) => item.type === "income")
          .reduce((total, income) => total + income.amount, 0);

        const expenditureTotal = data
          .filter((item) => item.type === "expenditure")
          .reduce((total, expenditure) => total + expenditure.amount, 0);

        setTotalIncome(incomeTotal);
        setTotalExpenditure(expenditureTotal);

        // Calculate remaining balance
        const remainingBalanceValue = incomeTotal - expenditureTotal;
        setRemainingBalance(remainingBalanceValue);

        setIsLoading(false);
      });
  };

  const incomeData = data?.filter((item) => item.type === "income");
  const ExpenData = data?.filter(
    (item) => item.type === "expenditure" && item.approve === true
  );

  return (
    <div className="w-full md:px-10">
      <h1 className="text-center font-bold mt-2 text-xl">Balance List</h1>

      {/* search expenditure */}
      <div>
        <form
          onSubmit={handleSearch}
          className="md:flex justify-center items-center mb-10 gap-3 "
        >
          <div className="form-control sm:my-2 ">
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

          <button className="btn  btn-primary cursor-pointer w-full md:w-fit ">
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

      {/* table*/}
      <button
        className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white p-2 mb-2 rounded-md hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-500"
        onClick={() => toPDF()}
      >
        Download PDF
      </button>
      <div className="mt-2">
        <table ref={targetRef} className="table">
          {/* head */}
          <thead>
            <tr className="md:text-[20px] flex justify-between bg-[#1653B2] text-white text-center ">
              <div>
                <th>#</th>

                <th>Date</th>
                <th>Income</th>
              </div>
              <div>
                <th>#</th>

                <th>Date</th>

                <th>Expenditure</th>
              </div>
            </tr>
          </thead>
          <tbody className="text-center">
            {isLoading ? (
              <Loading />
            ) : (
              <div className="flex justify-between">
                <div>
                  {incomeData &&
                    incomeData.length > 0 &&
                    incomeData.map((income, index) => (
                      <tr key={income._id}>
                        <th>{index + 1}</th>
                        <td>{income.date}</td>
                        <td>{income.amount}</td>
                      </tr>
                    ))}
                  <tr className="text-blue-500 font-bold">
                    <td></td>
                    <td>Total Income</td>
                    <td>{totalIncome}</td>
                  </tr>
                </div>
                {/* expenditure */}
                <div className="text-center ">
                  {ExpenData &&
                    ExpenData.length > 0 &&
                    ExpenData.map((expenditure, index) => (
                      <tr key={expenditure._id}>
                        <th>{index + 1}</th>
                        <td>{expenditure.date}</td>

                        <td>{expenditure.amount}</td>
                      </tr>
                    ))}
                  <tr className="text-red-500 font-bold">
                    <td></td>
                    <td>Total Expenditure</td>
                    <td>{totalExpenditure}</td>
                  </tr>
                </div>
              </div>
            )}
          </tbody>
          <tfoot className="flex justify-center px-8 border-t-2 ">
            <tr className="flex font-bold text-green-500 text-xl">
              <td>Remaining Balance</td>
              <td>{remainingBalance}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default BalanceList;
