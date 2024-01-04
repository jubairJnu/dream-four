import { useRef } from "react";
import ReactToPrint from "react-to-print";

const DueReciptPrint = ({ isOpen, onClose, selectedReceipt }) => {
  // console.log("due", selectedReceipt);

  const calculateTotal = () => {
    if (!selectedReceipt || !selectedReceipt?.service) {
      return 0;
    }

    return selectedReceipt?.service.reduce(
      (total, receipt) => total + receipt.price,
      0
    );
  };

  const printRef = useRef();
  if (!isOpen) return null;
  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const handlePrint = () => {
    if (printRef.current) {
      // Trigger the print action
      printRef.current.handlePrint();
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-end z-10 right-0 top-0 left-80 overflow-y-auto">
      <div
        className="modal-top  "
        onClick={onClose}
        style={{
          background: "rgba(0, 0, 0, 0.5)",
        }}
      ></div>
      <div className="modal-container bg-[#92afe9]  mx-auto rounded-md text-white shadow-2xl z-50 ">
        <div className="modal-header">
          <span className="modal-close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="modal-body p-4">
          {/* Your modal content goes here */}
          <div className=" mt-2 mx-5" ref={printRef}>
            {/* style */}
            <style>
              {`
      @media print {
        @page {
          size: A4 landscape;
          margin: 0;
        }
       

        body {
          margin: 1cm;
        }
      }
    `}
            </style>

            {/* two content flex */}
            <div className="flex justify-between gap-5 text-black">
              {/* content one for office */}
              <div>
                <p className="mb-1">
                  <small>Customer Copy</small>
                </p>
                <div className="text-center mb-2  border-2 p-3">
                  {/* style */}
                  <h2>Dream Four Hospital And Diagonstic Center</h2>
                  <p>
                    Omor New Market, Bridge Road, Zero Point, Paikgasa, Khulna
                  </p>
                </div>
                <div className="flex justify-between">
                  <small>
                    <p>print Date: {isOpen ? formatDate(new Date()) : ""} </p>
                  </small>
                  <p>
                    <small> {selectedReceipt?.paymentInfo[0]?.date} </small>
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div className="form-control">
                    <label className="label">
                      <span className=" text-black">Patient Name</span>
                    </label>
                    <input
                      className="input input-bordered input-sm text-black text-center p-1"
                      type="text"
                      value={selectedReceipt?.patient}
                      readOnly
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="text-black">Age </span>
                    </label>
                    <input
                      className="input input-bordered input-sm text-black text-center p-1"
                      type="text"
                      value={selectedReceipt?.age}
                      readOnly
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-2 ">
                  <div className="form-control">
                    <label className="label">
                      <span className="text-black">Doctor</span>
                    </label>
                    <input
                      className="input input-bordered input-sm text-black text-center p-1"
                      type="text"
                      value={selectedReceipt?.doctor}
                      readOnly
                    />
                  </div>
                  {/* order */}
                  <div className="form-control">
                    <label className="label">
                      <span className="text-black">Order Id </span>
                    </label>
                    <input
                      className="input input-bordered input-sm text-black text-center p-1"
                      type="text"
                      value={selectedReceipt?.OrderId}
                      readOnly
                    />
                  </div>
                </div>

                {/* services */}
                <div className="bg-white text-black">
                  <table className="table">
                    <thead className="flex-col justify-between items-center "></thead>
                    {selectedReceipt &&
                      selectedReceipt?.service?.map((srvc, index) => (
                        <tr key={srvc._id}>
                          <th> {index + 1} </th>
                          <th>{srvc?.name}</th>
                          <th className="ps-64">{srvc?.price}</th>
                        </tr>
                      ))}
                  </table>
                </div>
                {/* total */}
                <div className="bg-white mt-2 text-black">
                  <table className="table">
                    <thead className="flex justify-between items-center px-5 border-t-2">
                      <th>Total</th>
                      <th></th> {calculateTotal()}
                    </thead>
                  </table>
                </div>
                {/* discount */}
                <div className="bg-white mt-2 text-black">
                  <table className="table">
                    <thead className="flex justify-between items-center p">
                      <th className="ps-6">Discount</th>
                      <th>
                        - {selectedReceipt?.paymentInfo[0]?.discount} % / -
                      </th>
                    </thead>
                  </table>
                </div>
                {/* grand total */}
                <div className="bg-white mt-2 text-black">
                  <table className="table">
                    <thead className="flex justify-between items-center px-5 border-t-2">
                      <th>Grand Total </th>

                      {selectedReceipt?.total}
                    </thead>
                  </table>
                </div>
                {/* paid */}
                <div className="bg-white mt-2 text-black">
                  <table className="table">
                    <thead className="flex justify-between items-center px-5 border-t-2">
                      <th>Paid</th>
                      <th></th>
                      {selectedReceipt?.paymentInfo[0]?.paid}
                    </thead>
                  </table>
                </div>
                {/* in word */}
                <p className="capitalize">
                  In Word:{" "}
                  <span className="px-2">
                    {selectedReceipt?.paymentInfo[0]?.inWord}
                  </span>{" "}
                  tk only{" "}
                </p>
                {/*  */}

                <p> prepared by</p>
                <p> {selectedReceipt.user} </p>
                {/* footer */}
                <div className="mt-1 border p-3 text-center">
                  <p>Mobile: 01329-633401, 01329-633402, 01329-633403</p>
                  <p>Web: www.dreamfourhospital.com</p>
                </div>
              </div>
            </div>
            {/* line */}
            <div className="border-dotted border-s"></div>
            {/* content 2 for customer */}
          </div>
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
              content={() => printRef.current}
              onBeforePrint={onClose} // Close the modal before printing
              onAfterPrint={onClose} // Close the modal after printing
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DueReciptPrint;
