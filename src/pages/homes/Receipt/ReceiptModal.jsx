import { useRef } from "react";
import ReactToPrint from "react-to-print";


const ReceiptModal = ({ isOpen, onClose, recentReceipt }) => {
  const receiptRef = useRef();
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-end z-10 right-0 top-0 left-80">
      <div
        className="modal-top  max-w-5xl"
        onClick={onClose}
        style={{
          background: "rgba(0, 0, 0, 0.5)",
        }}
      ></div>
      <div className="modal-container bg-[#92afe9]  mx-auto rounded-md text-white shadow-2xl z-50">
        <div className="modal-header">
          <span className="modal-close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="modal-body p-4">
          {/* Your modal content goes here */}
          <div className=" mt-20 mx-5" ref={receiptRef}>
            <p><small> {recentReceipt.date} </small></p>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="form-control">
              <label className="label">
                <span className=" text-black">Patient Name</span>
              </label>
              <input className="input input-bordered input-sm text-black text-center p-1" type="text" value={recentReceipt.patient} readOnly />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="text-black">Phone Number</span>
              </label>
              <input className="input input-bordered input-sm text-black text-center p-1" type="text" value={recentReceipt.phone} readOnly />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 ">
            <div className="form-control">
              <label className="label">
                <span className="text-black">Appointment To</span>
              </label>
              <input className="input input-bordered input-sm text-black text-center p-1" type="text" value={recentReceipt?.doctor} readOnly />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="text-black">Service Name</span>
              </label>
              <input className="input input-bordered input-sm text-black text-center p-1" type="text" value={recentReceipt.service} readOnly />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-2">

            <div className="form-control">
              <label className="label">
                <span className="text-black">Total amount</span>
              </label>
              <input className="input input-bordered input-sm text-black text-center p-1" type="text" value={recentReceipt?.total} readOnly />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="text-black">Paid amount</span>
              </label>
              <input className="input input-bordered input-sm text-black text-center p-1" type="text" value={recentReceipt.paid} readOnly />
            </div>
          </div>
          <p> prepared by</p>
          <p> {recentReceipt.user}</p>
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
       content={() => receiptRef.current}
     />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
