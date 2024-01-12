import { useState } from "react";

import ExpenditureEntryModal from "./ExpenditureEntryModal";
import Loading from "../../component/Loading";

const ExpenditureList = () => {
  const base_url = import.meta.env.VITE_BASE_URL;

  const [expenditures, setExpenditures] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // handle
  const handleAddExpenditure = () => {
    openModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleSubmit = (event) => {
    console.log(event);
  };

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
      <div className="flex justify-end">
        <button onClick={handleAddExpenditure} className="btn btn-error btn-sm">
          Add expenditure
        </button>

        <ExpenditureEntryModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleSubmit}
        />
      </div>

      {/* table*/}
      <div className="mt-2">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="md:text-[20px] bg-[#1653B2] text-white text-center ">
              <th>#</th>

              <th>Purpose</th>
              <th>Date</th>
              <th>Amount</th>
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
                      </tr>
                    ))
                  : "no expenditure found"}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenditureList;
