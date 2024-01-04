import { useRef } from "react";
import ReactToPrint from "react-to-print";

const ReceiptModal = ({ isOpen, onClose, selectedReceipt }) => {
  console.log("print", selectedReceipt);
  const receiptRef = useRef();
  const calculateTotal = () => {
    if (!selectedReceipt || !selectedReceipt[0]?.service) {
      return 0;
    }

    return selectedReceipt[0].service.reduce(
      (total, receipt) => total + receipt.price,
      0
    );
  };

  if (!isOpen || !selectedReceipt) return null;

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
    // Simulate a delay before starting the print
    setTimeout(() => {
      if (receiptRef.current) {
        window.print();
      }
    }, 800); // Adjust the delay as needed
  };

  return (
    <div>
      {selectedReceipt && selectedReceipt.length > 0 && (
        <div className="fixed inset-0 flex items-center justify-end z-10 right-0 top-0 left-80 overflow-y-auto">
          <div
            className="modal-top max-h-32 "
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
              <div className="mt-2 mx-5" ref={receiptRef}>
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

                <div className="flex justify-between gap-5">
                  {/* content 1 */}

                  <div>
                    {/* content */}
                    <p className="mb-1">
                      <small>Office Copy</small>
                    </p>
                    <div className="text-center mb-2  border-2 p-3">
                      {/* style */}
                      <h2>Dream Four Hospital And Diagonstic Center</h2>
                      <p>
                        Omor New Market, Bridge Road, Zero Point, Paikgasa,
                        Khulna
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p>print Date: {isOpen ? formatDate(new Date()) : ""} </p>

                      <p>
                        Issue Date:
                        {selectedReceipt &&
                          selectedReceipt[0]?.paymentInfo[0]?.date}
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
                          value={selectedReceipt && selectedReceipt[0]?.patient}
                          readOnly
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="text-black">Age</span>
                        </label>
                        <input
                          className="input input-bordered input-sm text-black text-center p-1"
                          type="text"
                          value={selectedReceipt && selectedReceipt[0]?.age}
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
                          value={selectedReceipt && selectedReceipt[0]?.doctor}
                          readOnly
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="text-black">Order Id</span>
                        </label>
                        <input
                          className="input input-bordered input-sm text-black text-center p-1"
                          type="text"
                          value={selectedReceipt && selectedReceipt[0]?.OrderId}
                          readOnly
                        />
                      </div>
                    </div>
                    <hr />
                    {/* service */}
                    <div className="bg-white">
                      <table className="table">
                        <thead className="flex-col justify-between items-center px-5">
                          {selectedReceipt &&
                            selectedReceipt[0]?.service &&
                            selectedReceipt[0]?.service?.map(
                              (receipt, index) => (
                                <tr key={receipt._id}>
                                  <th>{index + 1}</th>
                                  <span className="px-2">
                                    {" "}
                                    {selectedReceipt &&
                                      selectedReceipt[0]?.paymentInfo[0]
                                        ?.inWord}
                                  </span>
                                  <th className="ps-64">{receipt.price}</th>
                                </tr>
                              )
                            )}
                        </thead>
                      </table>
                    </div>

                    {/*  */}

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
                        <thead className="flex justify-between items-center ">
                          <th className="ps-6">Discount</th>
                          <th>
                            -
                            {selectedReceipt &&
                              selectedReceipt[0]?.paymentInfo[0]?.discount}{" "}
                          </th>
                        </thead>
                      </table>
                    </div>

                    {/* grand total */}
                    <div className="bg-white mt-2 text-black">
                      <table className="table">
                        <thead className="flex justify-between items-center px-5 border-t-2">
                          <th>Grand Total</th>
                          <th></th>
                          {selectedReceipt && selectedReceipt[0]?.total}
                        </thead>
                      </table>
                    </div>

                    {/* paid */}
                    <div className="bg-white mt-2 text-black">
                      <table className="table">
                        <thead className="flex justify-between items-center px-5 border-t-2">
                          <th>Paid</th>
                          <th></th>
                          {selectedReceipt &&
                            selectedReceipt[0]?.paymentInfo[0]?.paid}
                          {/* todo calculate*/}
                        </thead>
                      </table>
                    </div>
                    <p className="capitalize">
                      In word:
                      <span className="px-2">
                        {selectedReceipt &&
                          selectedReceipt[0]?.paymentInfo[0]?.inWord}
                      </span>
                      tk only
                    </p>

                    <p> prepared by</p>
                    <p> {selectedReceipt && selectedReceipt[0]?.user}</p>
                    <div className="mt-1 border p-3 text-center">
                      <p>Mobile: 01329-633401, 01329-633402, 01329-633403</p>
                      <p>Web: www.dreamfourhospital.com</p>
                    </div>
                  </div>
                  {/* line */}
                  <div className="border-dotted border-s"></div>
                  <div>
                    {/* content2 */}
                    <p className="mb-1">
                      <small>Customer Copy</small>
                    </p>
                    <div className="text-center mb-2  border-2 p-3">
                      {/* style */}
                      <h2>Dream Four Hospital And Diagonstic Center</h2>
                      <p>
                        Omor New Market, Bridge Road, Zero Point, Paikgasa,
                        Khulna
                      </p>
                    </div>

                    <div className="flex justify-between">
                      <p>print Date: {isOpen ? formatDate(new Date()) : ""} </p>

                      <p>
                        Issue Date:
                        {selectedReceipt &&
                          selectedReceipt[0]?.paymentInfo[0]?.date}
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
                          value={selectedReceipt && selectedReceipt[0]?.patient}
                          readOnly
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="text-black">Age</span>
                        </label>
                        <input
                          className="input input-bordered input-sm text-black text-center p-1"
                          type="text"
                          value={selectedReceipt && selectedReceipt[0]?.age}
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
                          value={selectedReceipt && selectedReceipt[0]?.doctor}
                          readOnly
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="text-black">Order Id</span>
                        </label>
                        <input
                          className="input input-bordered input-sm text-black text-center p-1"
                          type="text"
                          value={selectedReceipt && selectedReceipt[0]?.OrderId}
                          readOnly
                        />
                      </div>
                    </div>
                    <hr />
                    {/* service */}
                    <div className="bg-white">
                      <table className="table">
                        <thead className="flex-col justify-between items-center ">
                          {selectedReceipt &&
                            selectedReceipt[0]?.service &&
                            selectedReceipt[0]?.service?.map(
                              (receipt, index) => (
                                <tr key={receipt._id}>
                                  <th>{index + 1}</th>
                                  <span className="px-2">
                                    {" "}
                                    {selectedReceipt &&
                                      selectedReceipt[0]?.paymentInfo[0]
                                        ?.inWord}
                                  </span>
                                  <th className="ps-64">{receipt.price}</th>
                                </tr>
                              )
                            )}
                        </thead>
                      </table>
                    </div>

                    {/*  */}

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
                            -{" "}
                            {selectedReceipt &&
                              selectedReceipt[0]?.paymentInfo[0]?.discount}{" "}
                            % / -
                          </th>
                        </thead>
                      </table>
                    </div>

                    {/* grand total */}
                    <div className="bg-white mt-2 text-black">
                      <table className="table">
                        <thead className="flex justify-between items-center px-5 border-t-2">
                          <th>Grand Total </th>

                          {selectedReceipt && selectedReceipt[0]?.total}
                        </thead>
                      </table>
                    </div>

                    {/* paid */}
                    <div className="bg-white mt-2 text-black">
                      <table className="table">
                        <thead className="flex justify-between items-center px-5 border-t-2">
                          <th>Paid</th>
                          <th></th>
                          {selectedReceipt &&
                            selectedReceipt[0]?.paymentInfo[0]?.paid}
                          {/* todo calculate*/}
                        </thead>
                      </table>
                    </div>
                    <p className="capitalize">
                      In word:
                      <span className="px-2">
                        {selectedReceipt &&
                          selectedReceipt[0]?.paymentInfo[0]?.inWord}
                      </span>
                      tk only
                    </p>
                    <p> prepared by</p>
                    <p> {selectedReceipt && selectedReceipt[0]?.user}</p>

                    {/* footer */}
                    <div className="mt-1 border p-3 text-center">
                      <p>Mobile: 01329-633401, 01329-633402, 01329-633403</p>
                      <p>Web: www.dreamfourhospital.com</p>
                    </div>
                  </div>
                </div>
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
                  content={() => receiptRef.current}
                  onBeforePrint={onClose} // Close the modal before printing
                  onAfterPrint={onClose} // Close the modal after printing
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceiptModal;
