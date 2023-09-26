import { useRef } from "react";
import ReactToPrint from "react-to-print";


const ReceiptModal = ({ isOpen, onClose, selectedReceipt }) => {
  console.log("receipt modal", selectedReceipt)
  const receiptRef = useRef();

  if (!isOpen) return null;
  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  // handle
  const handlePrint = () => {
    if (receiptRef.current) {
      // Trigger the print action
      receiptRef.current.handlePrint();
    }
  };

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
            <small><p>print Date: {isOpen ? formatDate(new Date()) : ''}  </p></small>
            <p> Receipt Date: <small> {selectedReceipt.date} </small></p>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="form-control">
              <label className="label">
                <span className=" text-black">Patient Name</span>
              </label>
              <input className="input input-bordered input-sm text-black text-center p-1" type="text" value={selectedReceipt.patient} readOnly />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="text-black">Phone Number</span>
              </label>
              <input className="input input-bordered input-sm text-black text-center p-1" type="text" value={selectedReceipt.phone} readOnly />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 ">
            <div className="form-control">
              <label className="label">
                <span className="text-black">Appointment To</span>
              </label>
              <input className="input input-bordered input-sm text-black text-center p-1" type="text" value={selectedReceipt?.doctor} readOnly />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="text-black">Service Name</span>
              </label>
              <input className="input input-bordered input-sm text-black text-center p-1" type="text" value={selectedReceipt.service} readOnly />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-2">

            <div className="form-control">
              <label className="label">
                <span className="text-black">Total amount</span>
              </label>
              <input className="input input-bordered input-sm text-black text-center p-1" type="text" value={selectedReceipt?.total} readOnly />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="text-black">Paid amount</span>
              </label>
              <input className="input input-bordered input-sm text-black text-center p-1" type="text" value={selectedReceipt.paid} readOnly />
            </div>
          </div>
          <p> prepared by</p>
          <p> {selectedReceipt.user}</p>
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
          trigger={() => (
            <button onClick={handlePrint} className="btn btn-warning">
              Print
            </button>
          )}
          content={() => receiptRef.current}
          onBeforePrint={onClose} // Close the modal before printing
          onAfterPrint={onClose} // Close the modal after printing
        />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
