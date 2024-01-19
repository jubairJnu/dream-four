import { useRef } from "react";
import ReactToPrint from "react-to-print";
import logo from "../../../../public/logo.jpg";

const DueReciptPrint = ({ isOpen, onClose, selectedReceipt }) => {
  

  const calculateTotal = () => {
    if (!selectedReceipt || !selectedReceipt?.data?.orderDetails[0]?.service) {
      return 0;
    }

    return selectedReceipt?.data?.orderDetails[0]?.service.reduce(
      (total, receipt) => total + receipt.price,
      0
    );
  };

  const calculateDueAmount = () => {
    const inTotalAmount =
      parseFloat(selectedReceipt?.data?.orderDetails[0]?.total) || 0;
    const totalPaid = selectedReceipt?.data?.totalPaidAmount;

    return inTotalAmount - totalPaid;
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
    <div className="fixed inset-4 flex items-center justify-start z-10 left-0 top-0   overflow-y-auto">
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
      <div className="modal- w-[1200px] max-h-full bg-[#92afe9] rounded-md text-white shadow-2xl overflow-y-auto">
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
          margin: 0 !important;
          padding: 0 !important;
        }
       

        body {
          margin: 0 !important;
          -webkit-print-color-adjust: exact; 
        }
        .print-text {
          font-size: 12pt; /* Adjust the font size as needed */
        }
        div#footer {
          position: fixed;
          bottom: 0;
          
         width: 50%
          
          padding: 5px;
          
         
        }
      }
    `}
            </style>

            {/* two content flex */}
            <div className="flex justify-between gap-5 text-black">
              {/* content one for office */}
              <div className="w-full">
                {/* content */}

                <div className="text-center mb-2  border-2 py-2">
                  {/* style */}
                  <div className="flex justify-center gap-4 items-center">
                    <div>
                      <img className="w-10" src={logo} alt="logo" />
                    </div>
                    <div>
                      <h2 className="font-bold">
                        Dream Four Hospital And Diagonstic Center
                      </h2>
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
                      selectedReceipt?.data?.paymentInfo[0]?.date}
                  </p>
                </div>
                {/* name and order id */}
                <div className="flex justify-between text-[12px] ">
                  <div className="flex text-[12px]">
                    <p className="me-1 font-semibold">Name</p>
                    <p>
                      :{" "}
                      {selectedReceipt &&
                        selectedReceipt?.data?.orderDetails[0]?.patient}
                    </p>
                  </div>
                  {/* order id */}
                  <div className="flex text-[12px]">
                    <p className="me-1 font-semibold">Order Id</p>
                    <p>
                      :{" "}
                      {selectedReceipt &&
                        selectedReceipt?.data?.orderDetails[0]?.OrderId}
                    </p>
                  </div>
                </div>
                {/* for age gender contact */}
                <div className="text-[12px] flex items-center justify-between ">
                  <div className="flex gap-[2px]">
                    <p className="me-[15px] font-semibold">Age </p>
                    <p>
                      :{" "}
                      {selectedReceipt &&
                        selectedReceipt?.data?.orderDetails[0]?.age}{" "}
                      y
                    </p>
                  </div>
                  {/* gender */}
                  <div className="flex gap-[2px] ">
                    <p className="font-semibold"> Gender </p>
                    <p>
                      :{" "}
                      {selectedReceipt &&
                        selectedReceipt?.data?.orderDetails[0]?.gender}
                    </p>
                  </div>
                  {/* contact */}

                  <div className="flex gap-[2px]">
                    <p className="font-semibold">Mobile </p>
                    <p>
                      :{" "}
                      {selectedReceipt &&
                        selectedReceipt?.data?.orderDetails[0]?.phone}
                    </p>
                  </div>
                </div>

                {/* doctor */}

                <div className="text-[12px] flex">
                  <p className="me-[3px] font-semibold">Ref by</p>
                  <p>
                    :{" "}
                    {selectedReceipt &&
                      selectedReceipt?.data?.orderDetails[0]?.doctor}{" "}
                  </p>
                </div>

                {/* service */}

                <div className="bg-white flex justify-between items-center text-black text-[12px] border-b-2 ">
                  <p>
                    <span className="me-5">SL.</span> Test Name
                  </p>
                  <p>Price</p>
                </div>
                {/* data */}

                <div>
                  {selectedReceipt &&
                    selectedReceipt?.data?.orderDetails[0]?.service &&
                    selectedReceipt?.data?.orderDetails[0]?.service?.map(
                      (receipt, index) => (
                        <>
                          <div className="flex justify-between grid-cols-2 items-center text-[12px]">
                            <div>
                              <span className="me-5">{index + 1}</span>
                              {receipt?.name}
                            </div>
                            <p className=" ">{receipt.price} </p>
                          </div>
                        </>
                      )
                    )}
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
                        selectedReceipt?.data?.paymentInfo[0]?.discount}
                    </p>
                  </div>
                </div>

                {/* grand total */}
                <div className=" text-black flex justify-between text-[12px] ">
                  <div></div>
                  <div className="flex border-t-[1px]">
                    <p className="me-5">Grand Total</p>

                    <p className="">
                      {selectedReceipt &&
                        selectedReceipt?.data?.orderDetails[0]?.total}
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
                          selectedReceipt?.data?.paymentInfo[0]?.inWord}
                      </span>
                      Tk only
                    </p>
                  </div>
                  <div className="flex border-t-[1px]">
                    <p className="me-5">Paid </p>

                    <p className="">
                      {selectedReceipt &&
                        selectedReceipt?.data?.paymentInfo[0]?.paid}
                    </p>
                  </div>
                </div>

                <hr />

                <div className="flex justify-between mt-7">
                  <div></div>
                  <div className="flex ">
                    <p className="me-5">Total Paid </p>

                    <p className="">
                      {selectedReceipt &&
                        selectedReceipt?.data?.totalPaidAmount}
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
                  <p>
                    {" "}
                    {selectedReceipt &&
                      selectedReceipt?.data?.paymentInfo[0]?.user}
                  </p>
                </div>

                {/* footer */}
                <div className="flex justify-between gap-5" id="footer">
                  <div>
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
                  <div>
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
              </div>

              {/* line */}
              <div className="border-dotted border-s"></div>
              {/* content 2 for customer */}
              <div className="w-full">
                {/* content */}

                <div className="text-center mb-2  border-2 py-2">
                  {/* style */}
                  <div className="flex justify-center gap-4 items-center">
                    <div>
                      <img className="w-10" src={logo} alt="logo" />
                    </div>
                    <div>
                      <h2 className="font-bold">
                        Dream Four Hospital And Diagonstic Center
                      </h2>
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
                      selectedReceipt?.data?.paymentInfo[0]?.date}
                  </p>
                </div>
                {/* name and order id */}
                <div className="flex justify-between text-[12px] ">
                  <div className="flex text-[12px]">
                    <p className="me-1 font-semibold">Name</p>
                    <p>
                      :{" "}
                      {selectedReceipt &&
                        selectedReceipt?.data?.orderDetails[0]?.patient}
                    </p>
                  </div>
                  {/* order id */}
                  <div className="flex text-[12px]">
                    <p className="me-1 font-semibold">Order Id</p>
                    <p>
                      :{" "}
                      {selectedReceipt &&
                        selectedReceipt?.data?.orderDetails[0]?.OrderId}
                    </p>
                  </div>
                </div>
                {/* for age gender contact */}
                <div className="text-[12px] flex items-center justify-between ">
                  <div className="flex gap-[2px]">
                    <p className="me-[15px] font-semibold">Age </p>
                    <p>
                      :{" "}
                      {selectedReceipt &&
                        selectedReceipt?.data?.orderDetails[0]?.age}{" "}
                      y
                    </p>
                  </div>
                  {/* gender */}
                  <div className="flex gap-[2px] ">
                    <p className="font-semibold"> Gender </p>
                    <p>
                      :{" "}
                      {selectedReceipt &&
                        selectedReceipt?.data?.orderDetails[0]?.gender}
                    </p>
                  </div>
                  {/* contact */}

                  <div className="flex gap-[2px]">
                    <p className="font-semibold">Mobile </p>
                    <p>
                      :{" "}
                      {selectedReceipt &&
                        selectedReceipt?.data?.orderDetails[0]?.phone}
                    </p>
                  </div>
                </div>

                {/* doctor */}

                <div className="text-[12px] flex">
                  <p className="me-[3px] font-semibold">Ref by</p>
                  <p>
                    :{" "}
                    {selectedReceipt &&
                      selectedReceipt?.data?.orderDetails[0]?.doctor}{" "}
                  </p>
                </div>

                {/* service */}

                <div className="bg-white flex justify-between items-center text-black text-[12px] border-b-2 ">
                  <p>
                    <span className="me-5">SL.</span> Test Name
                  </p>
                  <p>Price</p>
                </div>
                {/* data */}

                <div>
                  {selectedReceipt &&
                    selectedReceipt?.data?.orderDetails[0]?.service &&
                    selectedReceipt?.data?.orderDetails[0]?.service?.map(
                      (receipt, index) => (
                        <>
                          <div className="flex justify-between grid-cols-2 items-center text-[12px]">
                            <div>
                              <span className="me-5">{index + 1}</span>
                              {receipt?.name}
                            </div>
                            <p className=" ">{receipt.price} </p>
                          </div>
                        </>
                      )
                    )}
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
                        selectedReceipt?.data?.paymentInfo[0]?.discount}
                    </p>
                  </div>
                </div>

                {/* grand total */}
                <div className=" text-black flex justify-between text-[12px] ">
                  <div></div>
                  <div className="flex border-t-[1px]">
                    <p className="me-5">Grand Total</p>

                    <p className="">
                      {selectedReceipt &&
                        selectedReceipt?.data?.orderDetails[0]?.total}
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
                          selectedReceipt?.data?.paymentInfo[0]?.inWord}
                      </span>
                      Tk only
                    </p>
                  </div>
                  <div className="flex border-t-[1px]">
                    <p className="me-5">Paid </p>

                    <p className="">
                      {selectedReceipt &&
                        selectedReceipt?.data?.paymentInfo[0]?.paid}
                    </p>
                  </div>
                </div>

                {/* total paid */}
                <hr />

                <div className="flex justify-between mt-7">
                  <div></div>
                  <div className="flex ">
                    <p className="me-5">Total Paid </p>

                    <p className="">
                      {selectedReceipt &&
                        selectedReceipt?.data?.totalPaidAmount}
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
                  <p>
                    {" "}
                    {selectedReceipt &&
                      selectedReceipt?.data?.paymentInfo[0]?.user}
                  </p>
                </div>

                {/* footer */}
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
