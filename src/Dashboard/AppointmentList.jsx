/* eslint-disable no-unused-vars */
import { DownloadTableExcel } from "react-export-table-to-excel";
import Loading from "../component/Loading";
import { useContext, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const AppointmentList = () => {
  const base_url = import.meta.env.VITE_BASE_URL;
  const [Appointment, setAppointment] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectDoctor, setSelectDoctor] = useState();
  const [users, setUsers] = useState([]);
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    fetch(`${base_url}/users`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  const doctors = useLoaderData();

  const tableRef = useRef(null);

  // handlechange

  const handleSearch = (event) => {
    event.preventDefault();
    setIsloading(true);
    const form = event.target;
    const startedDate = form.startDate.value;
    const endedDate = form.endDate.value;

    setStartDate(startedDate);
    setEndDate(endedDate);

    // Create a URLSearchParams object to pass query parameters
    const params = new URLSearchParams();
    params.append("startDate", startedDate);
    params.append("endDate", endedDate);
    params.append("appointedDoctor", selectDoctor);

    // Include the selected user in the query only if it's not 'All'
    // if (selectedUser !== "All") {

    // }

    // params.append("email", currentUser?.email);

    // ********************
    // let endPointApi = " ";

    // if (currentUser?.role == "admin" || currentUser?.role == "owner") {
    //   endPointApi = `${base_url}/all-infoledger?${params.toString()}`;
    // } else if (currentUser?.role == "staff") {
    //   endPointApi = `${base_url}info-ledger?${params.toString()}`;
    // }

    // Use the URLSearchParams object in the fetch request
    fetch(`${base_url}/doctor_appointment?${params.toString()}`, {})
      .then((res) => res.json())
      .then((data) => {
        setAppointment(data);
        setIsloading(false);
        console.log(data);
      })
      .catch((error) => console.error(error));
  };
  return (
    <div>
      <h1 className="text-center text-purple-500 text-2xl mb-8">
        Doctor Appointment List
      </h1>
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
                required
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
                required
              />
            </label>
          </div>
          {/* 3 */}
          <div className="form-control">
            <div className="input-group">
              <span className="bg-[#1653B2] text-white ">Doctor</span>
              <select
                name="users"
                className="select select-bordered"
                value={selectDoctor}
                onChange={(e) => setSelectDoctor(e.target.value)}
                required
              >
                <option disabled value="" selected>
                  Select Doctor
                </option>
                {doctors?.map((doctor) => (
                  <option key={doctor._id} value={doctor.name}>
                    {doctor?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button className="btn  btn-primary cursor-pointer ">
            <input
              className="  text-white"
              type="submit"
              value="Search"
            ></input>
          </button>
        </form>
      </div>
      {/* excel download buttton */}
      <DownloadTableExcel
        filename="info ledger"
        sheet="info"
        currentTableRef={tableRef.current}
      >
        <button className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white p-2 mb-2 rounded-md hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-500">
          Download
        </button>
      </DownloadTableExcel>

      <div className="overflow-x-auto">
        <table ref={tableRef} className="table ">
          {/* head */}
          <thead>
            <tr className="md:text-[15px] bg-[#1653B2] text-white ">
              <th>#</th>
              <th>Serial</th>
              <th>Order Id</th>
              <th>Patient</th>
              <th>Phone</th>
              <th className="hidden sm:table-cell">Appointment To</th>
              <th className="hidden sm:table-cell">Appointment Date</th>
            </tr>
          </thead>
          {isloading ? (
            <Loading />
          ) : (
            <tbody className="text-center">
              {Appointment?.data?.map((info, index) =>
                info.paymentInfo.map((paydetais) => (
                  <tr key={info._id}>
                    <th>{index + 1}</th>
                    <td>{info?.serial}</td>
                    <td>
                      <p>{info?.OrderId}</p>
                    </td>
                    <td>
                      <p>{info?.patient} </p>
                    </td>
                    <td>
                      <p>{info?.phone} </p>
                    </td>

                    <th>{info?.appointedDoctor}</th>
                    <th>{info?.appointmentDate}</th>
                  </tr>
                ))
              )}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default AppointmentList;
