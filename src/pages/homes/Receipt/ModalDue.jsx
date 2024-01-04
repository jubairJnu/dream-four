import { useRef } from "react";
import ReactToPrint from "react-to-print";

const ModalDue = ({ isOpen, onClose, formData }) => {
  // console.log("due modal", formData);
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
                  <small>Office Copy</small>
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
                    <small> {formData?.date} </small>
                  </p>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="text-black">Order Id</span>
                  </label>
                  <input
                    className="input input-bordered input-sm text-black text-center p-1"
                    type="text"
                    value={formData?.OrderId}
                    readOnly
                  />
                </div>

                {/* total */}

                {/* discount */}
                <div className="bg-white mt-2 text-black">
                  <table className="table">
                    <thead className="flex justify-between items-center p">
                      <th className="ps-6">Discount</th>
                      <th>- {formData?.discount} % / -</th>
                    </thead>
                  </table>
                </div>
                {/* grand total */}

                {/* paid */}
                <div className="bg-white mt-2 text-black">
                  <table className="table">
                    <thead className="flex justify-between items-center px-5 border-t-2">
                      <th>Paid</th>
                      <th></th>
                      {formData?.paid}
                    </thead>
                  </table>
                </div>
                {/* in word */}
                <p className="capitalize">
                  In Word: <span className="px-2">{formData?.inWord}</span> tk
                  only{" "}
                </p>
                {/*  */}

                <p> prepared by</p>
                <p> {formData.user} </p>
                {/* footer */}
                <div className="mt-1 border p-3 text-center">
                  <p>Mobile: 01329-633401, 01329-633402, 01329-633403</p>
                  <p>Web: www.dreamfourhospital.com</p>
                </div>
              </div>
              {/* line */}
              <div className="border-dotted border-s"></div>
              {/* content 2 for customer */}
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
                    <small> {formData?.date} </small>
                  </p>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="text-black">Order Id</span>
                  </label>
                  <input
                    className="input input-bordered input-sm text-black text-center p-1"
                    type="text"
                    value={formData?.OrderId}
                    readOnly
                  />
                </div>

                {/* total */}

                {/* discount */}
                <div className="bg-white mt-2 text-black">
                  <table className="table">
                    <thead className="flex justify-between items-center p">
                      <th className="ps-6">Discount</th>
                      <th>- {formData?.discount} % / -</th>
                    </thead>
                  </table>
                </div>
                {/* grand total */}

                {/* paid */}
                <div className="bg-white mt-2 text-black">
                  <table className="table">
                    <thead className="flex justify-between items-center px-5 border-t-2">
                      <th>Paid</th>
                      <th></th>
                      {formData?.paid}
                    </thead>
                  </table>
                </div>
                {/* in word */}
                <p className="capitalize">
                  In Word: <span className="px-2">{formData?.inWord}</span> tk
                  only{" "}
                </p>
                {/*  */}

                <p> prepared by</p>
                <p> {formData.user} </p>
                {/* footer */}
                <div className="mt-1 border p-3 text-center">
                  <p>Mobile: 01329-633401, 01329-633402, 01329-633403</p>
                  <p>Web: www.dreamfourhospital.com</p>
                </div>
              </div>
            </div>
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

export default ModalDue;
