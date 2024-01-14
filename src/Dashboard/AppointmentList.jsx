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

    fetch(`${base_url}/doctor_appointment?${params.toString()}`, {})
      .then((res) => res.json())
      .then((data) => {
        setAppointment(data);
        setIsloading(false);
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
              <th className="hidden sm:table-cell">Appointment Date</th>
              <th>Patient</th>
              <th>Phone</th>
              <th className="hidden sm:table-cell">Appointment To</th>
              <th>Refference</th>
            </tr>
          </thead>
          {isloading ? (
            <Loading />
          ) : (
            <tbody className="text-center">
              {Appointment?.data?.map((appt, index) => (
                <tr key={appt._id}>
                  <td>{index + 1}</td>
                  <td>{appt?.serial}</td>
                  <td>{appt?.appointmentDate}</td>
                  <td>{appt?.patient}</td>
                  <td>{appt?.phone}</td>
                  <td>{appt?.appointedDoctor}</td>
                  <td>{appt?.refference}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default AppointmentList;
