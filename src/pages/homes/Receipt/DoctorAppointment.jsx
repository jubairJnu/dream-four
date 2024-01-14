import AppointmentForm from "../../../component/AppointmentForm";

const DoctorAppointment = () => {
  return (
    <div>
      <h1 className="text-center py-8 text-2xl text-green-500">
        Doctor Appointment
      </h1>
      <hr />
      <div className=" shadow-2xl p-4 ">
        <AppointmentForm />
      </div>
    </div>
  );
};

export default DoctorAppointment;
