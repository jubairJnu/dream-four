import { useRef } from "react";
import ReactToPrint from "react-to-print";


const Modal = ({ isOpen, onClose, formData }) => {

  if (!isOpen) return null;
  const printRef = useRef();

  return (
    <div className="fixed inset-0 flex items-center justify-end z-10 right-0 top-0 left-80">
      <div
        className="modal-top  max-w-5xl"
        onClick={onClose}
        style={{
          background: "rgba(0, 0, 0, 0.5)",
        }}
      ></div>
      <div className="modal-container bg-[#1653B2]  mx-auto rounded-md text-white shadow-lg z-50">
        <div className="modal-header">
          <span className="modal-close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="modal-body p-4">
          {/* Your modal content goes here */}
          <div className="m-5" ref={printRef}>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="form-control">
              <label className="label">
                <span className=" text-yellow-300">Patient Name</span>
              </label>
              <input className="input input-bordered input-sm text-black text-center p-1" type="text" value={formData.patient} readOnly />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="text-yellow-300">Phone Number</span>
              </label>
              <input className="input input-bordered input-sm text-black text-center p-1" type="text" value={formData.phone} readOnly />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 ">
            <div className="form-control">
              <label className="label">
                <span className="text-yellow-300">Appointment To</span>
              </label>
              <input className="input input-bordered input-sm text-black text-center p-1" type="text" value={formData?.doctor} readOnly />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="text-yellow-300">Service Name</span>
              </label>
              <input className="input input-bordered input-sm text-black text-center p-1" type="text" value={formData.service} readOnly />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-2">

            <div className="form-control">
              <label className="label">
                <span className="text-yellow-300">Total amount</span>
              </label>
              <input className="input input-bordered input-sm text-black text-center p-1" type="text" value={formData?.total} readOnly />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="text-yellow-300">Paid amount</span>
              </label>
              <input className="input input-bordered input-sm text-black text-center p-1" type="text" value={formData.paid} readOnly />
            </div>
          </div>
          <p> prepared by</p>
          <p> {formData.user}</p>
          </div>

          {/* <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click the button below to close</p> */}
          
          <div className="modal-action flex justify-between">
            <form method="dialog">
              <button className="btn " onClick={onClose}>
                Close
              </button>

            </form>
            <ReactToPrint
       trigger={() =>  <button className="btn btn-warning ">Print</button>}
       content={() => printRef.current}
     />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
