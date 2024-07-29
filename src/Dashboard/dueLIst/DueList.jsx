import  { useRef, useState } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import Loading from "../../component/Loading";

const DueList = () => {
  const base_url = import.meta.env.VITE_BASE_URL;

  const [dueLists, setDueLists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log(dueLists);

  const tableRef = useRef(null);

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
    fetch(`${base_url}/due_list/?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setDueLists(data);

        setIsLoading(false);
      });
  };

  return (
    <div className="w-full md:px-10">
      {/* search */}
      <h1 className="text-center text-xl font-bold my-4">Due List</h1>
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
      {/* buttton */}
      <DownloadTableExcel
        filename="Due List"
        sheet="Due_List"
        currentTableRef={tableRef.current}
      >
        <button className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white p-2 mb-2 rounded-md hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-500">
          Download
        </button>
      </DownloadTableExcel>

      {/* table */}

      <div className="overflow-x-auto">
        <table ref={tableRef} className="table ">
          {/* head */}
          <thead>
            <tr className="md:text-[16px] bg-[#1653B2] text-white text-center ">
              <th>SL</th>
              <th>Date</th>
              <th>Order Id</th>
              <th>Name</th>
              <th className="hidden sm:table-cell">Mobile</th>
              <th className="hidden sm:table-cell">Ref</th>
              <th>Total</th>
              <th>Total Paid</th>
              <th>Due Amount</th>
            </tr>
          </thead>
          {isLoading ? (
            <Loading />
          ) : (
            <tbody className="text-center">
              {dueLists?.map((duelist, index) => (
                <tr key={duelist._id}>
                  <td> {index + 1} </td>
                  <td> {duelist?.paymentInfo[0]?.date} </td>
                  <td> {duelist?.OrderId} </td>
                  <td> {duelist?.patient} </td>
                  <td> {duelist?.phone} </td>
                  <td> {duelist?.refference} </td>
                  <td> {duelist?.total} </td>
                  <td> {duelist?.paidAmount} </td>
                  <td> {duelist?.total - duelist?.paidAmount} </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default DueList;
