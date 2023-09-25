import { useEffect, useState } from "react";


const IncomeLedger = () => {
  const [Incomes, setIncomes] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // Step 1: Create a state for the total price

  const calculateTotalPrice = () => {
       const total = Incomes.reduce((accumulator, income) => {
      return accumulator + parseFloat(income.paid);
    }, 0);
    setTotalPrice(total);
  };

  useEffect(() => {
    // Step 2: Call the calculateTotalPrice function when Incomes data changes
    calculateTotalPrice();
  }, [Incomes]);

  // handlechange

  


  const handleSearch = event => {
    event.preventDefault();
    const form = event.target;
    const startedDate = form.startDate.value;
    const endedDate = form.endDate.value;

    setStartDate(startedDate);
    setEndDate(endedDate);

    // Create a URLSearchParams object to pass query parameters
    const params = new URLSearchParams();
    params.append('startDate', startedDate);
    params.append('endDate', endedDate);

    // Use the URLSearchParams object in the fetch request
    fetch(`https://dream-four-server.vercel.app/all-incomeledger?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        setIncomes(data)
        console.log(data)
      })
      .catch(error => console.error(error));

    console.log(startDate);
    
  };


  return (
    <div className="w-full ">
      <h1 className="text-center text-purple-500 text-2xl mb-8">Income Ledger</h1>
      <div >
        <form onSubmit={handleSearch} className="md:flex justify-center items-center mb-10 gap-3 ">

          <div className="form-control sm:my-2">

            <label className="input-group">
              <span className="bg-[#1653B2] text-white ">Start Date</span>
              <input name="startDate" type="date" className="input input-bordered" />
            </label>
          </div>
          {/*  */}
          <div className="form-control my-2">

            <label className="input-group">
              <span className="bg-[#1653B2] text-white ">End Date</span>
              <input name="endDate" type="date" placeholder="info@site.com" className="input input-bordered" />
            </label>
          </div>
          {/* 3 */}
          <div className="form-control">
            <div className="input-group">
              <span className="bg-[#1653B2] text-white ">Users</span>
              <select name="users" className="select select-bordered">
                <option>T-shirts</option>
                <option>Mugs</option>
              </select>

            </div>
          </div>
          <button className="btn  btn-primary cursor-pointer ">  <input className="  text-white" type="submit" value="Search">
          </input></button>
        </form>
      </div>

      <div className="overflow-x-auto">
        <table className="table ">
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody >

            {
              Incomes?.map((income, index) => <tr key={income._id}>
                <th>
                  {index + 1}
                </th>
                <td>
                  {income?.orderId}
                </td>
                <td>
                  <p>{income?.paid}tk  </p>
                </td>
                <td>{income?.service} </td>
                <th>
                  {income?.date}
                </th>
                <th>
                  {income?.user}
                </th>
                <th>
                  view
                </th>

                <th>
                  inactive
                </th>
              </tr>)
            }
            <tr className="border-2 font-bold text-[16px]">
              <td>

              </td>
              <td> 
                Total
              </td>
              <td >
                {totalPrice} tk
              </td>
            </tr>

          </tbody>


        </table>
      </div>

    </div>
  );
};

export default IncomeLedger;