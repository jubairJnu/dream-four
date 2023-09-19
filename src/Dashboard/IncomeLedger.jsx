import { useState } from "react";


const IncomeLedger = () => {
  const [Incomes, setIncomes ] = useState([]);
  return (
    <div className="w-full ">
      <h1 className="text-center text-purple-500 text-2xl">Income Ledger</h1>
   

      <div className="">
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