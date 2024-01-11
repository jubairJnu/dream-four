import { useRef } from "react";
import ReactToPrint from "react-to-print";
import logo from "../../../../public/logo.jpg";

const ReceiptModal = ({ isOpen, onClose, selectedReceipt }) => {
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
  // due amount calculate

  const calculateDueAmount = () => {
    if (!selectedReceipt || !selectedReceipt[0]?.paymentInfo) {
      return 0;
    }

    const grandTotal = parseFloat(selectedReceipt[0]?.total) || 0;
    const paidAmount =
      parseFloat(selectedReceipt[0]?.paymentInfo[0]?.paid) || 0;

    return grandTotal - paidAmount;
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
        <div className="fixed inset-4 flex items-center justify-start z-10 left-0 top-0   overflow-y-auto ">
          <div
            className="modal modal-bottom"
            onClick={onClose}
            style={{
              background: "rgba(0, 0, 0, 0.5)",
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          ></div>

          <div className="modal- w-[1200px] max-h-full bg-[#92afe9] rounded-md text-white shadow-2xl overflow-y-auto ">
            <div className="modal-header">
              <span className="modal-close" onClick={onClose}>
                &times;
              </span>
            </div>
            <div className=" print-text  ">
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
          margin: 0;
        }
        .print-text {
          font-size: 12pt; /* Adjust the font size as needed */
        }
        div#footer {
          position: fixed;
          bottom: 0;
          left: 0;
          
          width: 50%;
          
          padding: 5px;
          
         
        }
      }
    `}
                </style>

                <div className="flex justify-between gap-5 print-text  ">
                  {/* content 1 */}

                  <div className="w-full">
                    {/* content */}

                    <div className="text-center mb-2  border-2 py-2">
                      {/* style */}
                      <div className="flex justify-center gap-4 items-center">
                        <div>
                          <img className="w-8" src={logo} alt="logo" />
                        </div>
                        <div>
                          <h2>Dream Four Hospital And Diagonstic Center</h2>
                          <p className="text-[11px]">
                            Amar New Market, Bridge Road, Zero Point, Paikgacha,
                            Khulna
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="w-24 mx-auto text-center text-[11px] border rounded-md ">
                      Customer Copy
                    </p>
                    <div className="flex justify-between text-[10px]">
                      <p>print Date: {isOpen ? formatDate(new Date()) : ""} </p>

                      <p>
                        Issue Date:
                        {selectedReceipt &&
                          selectedReceipt[0]?.paymentInfo[0]?.date}
                      </p>
                    </div>
                    {/* name and order id */}
                    <div className="flex justify-between text-[12px]">
                      <div className="flex text-[12px]">
                        <p className="me-1">Name</p>
                        <p>
                          : {selectedReceipt && selectedReceipt[0]?.patient}
                        </p>
                      </div>
                      {/* order id */}
                      <div className="flex text-[12px]">
                        <p className="me-1">Order Id</p>
                        <p>
                          : {selectedReceipt && selectedReceipt[0]?.OrderId}
                        </p>
                      </div>
                    </div>
                    {/* for age gender contact */}
                    <div className="text-[12px] flex items-center justify-between">
                      <div className="flex gap-[2px]">
                        <p className="me-[15px]">Age </p>
                        <p>: {selectedReceipt && selectedReceipt[0]?.age} y</p>
                      </div>
                      {/* gender */}
                      <div className="flex gap-[2px]">
                        <p>Gender </p>
                        <p>: {selectedReceipt && selectedReceipt[0]?.gender}</p>
                      </div>
                      {/* contact */}

                      <div className="flex gap-[2px]">
                        <p>Mobile </p>
                        <p>: {selectedReceipt && selectedReceipt[0]?.phone}</p>
                      </div>
                    </div>

                    {/* doctor */}

                    <div className="text-[12px] flex">
                      <p className="me-[3px]">Ref by</p>
                      <p>: {selectedReceipt && selectedReceipt[0]?.doctor} </p>
                    </div>

                    {/* service */}

                    <div className="bg-white flex justify-between items-center text-black text-[12px] border-b-2 ">
                      <p>Test Name</p>
                      <p>Price</p>
                    </div>
                    {/* data */}

                    <div>
                      {selectedReceipt &&
                        selectedReceipt[0]?.service &&
                        selectedReceipt[0]?.service?.map((receipt, index) => (
                          <div
                            key={receipt._id}
                            className="flex justify-between items-center text-[12px]"
                          >
                            <p className="">{receipt?.name}</p>
                            <p className=" ">{receipt.price} </p>
                          </div>
                        ))}
                    </div>

                    {/* total */}

                    <div className=" mt-1 text-[12px] flex justify-between items-center text-black border-t-2">
                      <div></div>
                      <div className="flex ">
                        <p>Total</p>
                        <p className="ms-4">{calculateTotal()} /-</p>
                      </div>
                    </div>

                    {/* discount */}
                    <div className=" text-black flex justify-between text-[12px] ">
                      <div></div>
                      <div className="flex border-t-[1px]">
                        <p className="me-5"> (-) Discount</p>

                        <p className="">
                          {selectedReceipt &&
                            selectedReceipt[0]?.paymentInfo[0]?.discount}{" "}
                        </p>
                      </div>
                    </div>

                    {/* grand total */}
                    <div className=" text-black flex justify-between text-[12px] ">
                      <div></div>
                      <div className="flex border-t-[1px]">
                        <p className="me-5">Grand Total</p>

                        <p className="">
                          {selectedReceipt && selectedReceipt[0]?.total}
                        </p>
                      </div>
                    </div>

                    {/* paid */}
                    <div className=" text-black flex justify-between items-center text-[12px]  ">
                      <div>
                        <p className="capitalize">
                          In word:
                          <span className="px-2">
                            {selectedReceipt &&
                              selectedReceipt[0]?.paymentInfo[0]?.inWord}
                          </span>
                          Tk only
                        </p>
                      </div>
                      <div className="flex border-t-[1px]">
                        <p className="me-5">Paid </p>

                        <p className="">
                          {selectedReceipt &&
                            selectedReceipt[0]?.paymentInfo[0]?.paid}
                        </p>
                      </div>
                    </div>
                    {/* due */}

                    <div className="flex justify-between text-[12px] text-black">
                      <div></div>
                      <div className="flex border-t-[1px]">
                        <p className="me-5">Due </p>

                        <p className="">{calculateDueAmount()}</p>
                      </div>
                    </div>

                    {/* prepared */}

                    <div className="flex items-center text-[12px] gap-2 mt-2">
                      <p> prepared by :</p>
                      <p> {selectedReceipt && selectedReceipt[0]?.user}</p>
                    </div>

                    {/* footer */}
                    <div id="footer">
                      <p className="text-[11px] text-center">
                        বিঃদ্রঃ পরীক্ষা করার আগে রোগীর নাম, বয়স, ডাক্তারের নাম,
                        পুরুষ/মহিলা ইত্যাদি তথ্য সঠিক আছে কিনা দেখে নিন।
                      </p>
                      <p className="text-[11px] text-center border-t-[1px]">
                        Mobile: 01329-633401, 01329-633402, 01329-633403
                      </p>
                      <p className="text-[11px] text-center">
                        Web: www.dreamfourhospital.com
                      </p>
                      <p className="text-[9px]">Software by : Novus IT</p>
                    </div>
                  </div>
                  {/* line */}
                  <div className="border-dotted border-s"></div>
                  {/* content2 */}

                  <div className="w-full">
                    {/* content */}

                    <div className="text-center mb-2  border-2 py-2">
                      {/* style */}
                      <div className="flex justify-center gap-4 items-center">
                        <div>
                          <img className="w-8" src={logo} alt="logo" />
                        </div>
                        <div>
                          <h2>Dream Four Hospital And Diagonstic Center</h2>
                          <p className="text-[11px]">
                            Amar New Market, Bridge Road, Zero Point, Paikgacha,
                            Khulna
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="w-24 mx-auto text-center text-[11px] border rounded-md ">
                      Office Copy
                    </p>
                    <div className="flex justify-between text-[11px]">
                      <p>print Date: {isOpen ? formatDate(new Date()) : ""} </p>

                      <p>
                        Issue Date:
                        {selectedReceipt &&
                          selectedReceipt[0]?.paymentInfo[0]?.date}
                      </p>
                    </div>

                    <div className="flex text-[12px]">
                      <p className="me-1">Name</p>
                      <p>: {selectedReceipt && selectedReceipt[0]?.patient}</p>
                    </div>
                    {/* for age gender contact */}
                    <div className="text-[12px] flex items-center justify-between">
                      <div className="flex gap-[2px]">
                        <p className="me-[15px]">Age </p>
                        <p>: {selectedReceipt && selectedReceipt[0]?.age} y</p>
                      </div>
                      {/* gender */}
                      <div className="flex gap-[2px]">
                        <p>Gender </p>
                        <p>: {selectedReceipt && selectedReceipt[0]?.gender}</p>
                      </div>
                      {/* contact */}

                      <div className="flex gap-[2px]">
                        <p>Mobile </p>
                        <p>: {selectedReceipt && selectedReceipt[0]?.phone}</p>
                      </div>
                    </div>

                    {/* doctor */}

                    <div className="text-[12px] flex">
                      <p className="me-[3px]">Ref by</p>
                      <p>: {selectedReceipt && selectedReceipt[0]?.doctor} </p>
                    </div>

                    {/* service */}

                    <div className="bg-white flex justify-between items-center text-black text-[12px] border-b-2 ">
                      <p>Test Name</p>
                      <p>Price</p>
                    </div>
                    {/* data */}

                    <div>
                      {selectedReceipt &&
                        selectedReceipt[0]?.service &&
                        selectedReceipt[0]?.service?.map((receipt, index) => (
                          <div
                            key={receipt._id}
                            className="flex justify-between items-center text-[12px]"
                          >
                            <p className="">{receipt?.name}</p>
                            <p className=" ">{receipt.price} </p>
                          </div>
                        ))}
                    </div>

                    {/* total */}

                    <div className=" mt-1 text-[12px] flex justify-between items-center text-black border-t-2">
                      <div></div>
                      <div className="flex ">
                        <p>Total</p>
                        <p className="ms-4">{calculateTotal()} /-</p>
                      </div>
                    </div>

                    {/* discount */}
                    <div className=" text-black flex justify-between text-[12px] ">
                      <div></div>
                      <div className="flex border-t-[1px]">
                        <p className="me-5"> (-) Discount</p>

                        <p className="">
                          {selectedReceipt &&
                            selectedReceipt[0]?.paymentInfo[0]?.discount}{" "}
                        </p>
                      </div>
                    </div>

                    {/* grand total */}
                    <div className=" text-black flex justify-between text-[12px] ">
                      <div></div>
                      <div className="flex border-t-[1px]">
                        <p className="me-5">Grand Total</p>

                        <p className="">
                          {selectedReceipt && selectedReceipt[0]?.total}
                        </p>
                      </div>
                    </div>

                    {/* paid */}
                    <div className=" text-black flex justify-between items-center text-[12px]  ">
                      <div>
                        <p className="capitalize">
                          In word:
                          <span className="px-2">
                            {selectedReceipt &&
                              selectedReceipt[0]?.paymentInfo[0]?.inWord}
                          </span>
                          Tk only
                        </p>
                      </div>
                      <div className="flex border-t-[1px]">
                        <p className="me-5">Paid </p>

                        <p className="">
                          {selectedReceipt &&
                            selectedReceipt[0]?.paymentInfo[0]?.paid}
                        </p>
                      </div>
                    </div>
                    {/* due */}

                    <div className="flex justify-between text-[12px] text-black">
                      <div></div>
                      <div className="flex border-t-[1px]">
                        <p className="me-5">Due </p>

                        <p className="">{calculateDueAmount()}</p>
                      </div>
                    </div>

                    {/* prepared */}

                    <div className="flex items-center text-[12px] gap-2 mt-2">
                      <p> prepared by :</p>
                      <p> {selectedReceipt && selectedReceipt[0]?.user}</p>
                    </div>
                  </div>

                  {/* main div close */}
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
