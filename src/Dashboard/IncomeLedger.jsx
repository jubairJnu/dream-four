import { useState } from "react";


const IncomeLedger = () => {
  const [Incomes, setIncomes] = useState([]);
  return (
    <div className="w-full ">
      <h1 className="text-center text-purple-500 text-2xl mb-8">Income Ledger</h1>
      <div className="flex justify-center items-center mb-10 gap-3">
        <div className="form-control">

          <label className="input-group">
            <span className="bg-[#1653B2] text-white ">Start Date</span>
            <input type="date" className="input input-bordered" />
          </label>
        </div>
        {/*  */}
        <div className="form-control">

          <label className="input-group">
            <span className="bg-[#1653B2] text-white ">End Date</span>
            <input type="date" placeholder="info@site.com" className="input input-bordered" />
          </label>
        </div>
        {/* 3 */}
        <div className="form-control">
          <div className="input-group">
            <span className="bg-[#1653B2] text-white ">Users</span>
            <select className="select select-bordered">
              <option>T-shirts</option>
              <option>Mugs</option>
            </select>
            <button className="btn btn-square bg-[#1653B2] text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
          </div>
        </div>
      </div>

      <div>
        <table className="table">
          {/* head */}
          <thead>
            <tr className="md:text-[20px] bg-[#1653B2] text-white ">
              <th>
                #
              </th>
              <th>Order Id</th>
              <th>Amount</th>
              <th>Service</th>
              <th>Date</th>
              <th>User Name</th>
              <th>Print</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
              Incomes?.map((income, index) => <tr key={income.id}>
                <th>
                  {index + 1}
                </th>
                <td>
                  {income?.orderId}
                </td>
                <td>
                  <p>{income?.paid}  </p>
                </td>
                <td>{income?.service} </td>
                <th>
                  {income?.date}
                </th>
                <th>
                  {income?.name} tk
                </th>
                <th>
                  {income?.time}
                </th>
                <th >
                  {income?.education}
                </th>
                <th>
                  inactive
                </th>
              </tr>)
            }

          </tbody>


        </table>
      </div>

    </div>
  );
};

export default IncomeLedger;