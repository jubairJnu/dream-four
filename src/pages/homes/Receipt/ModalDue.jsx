import { useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import logo from "../../../../public/logo.jpg";

const ModalDue = ({ isOpen, onClose, formData, searchDatas }) => {
 
  // calculate total paid

  const calculateTotal = () => {
    if (!searchDatas || !searchDatas?.data?.totalPaidAmount) {
      return formData.paid || 0;
    }

    const totalFromSearch =
      searchDatas.data.totalPaidAmount + (formData.paid || 0);

    return totalFromSearch;
  };

  // calculate due amoun

  const calculateDueAmount = () => {
    const inTotalAmount =
      parseFloat(searchDatas?.data?.orderDetails[0]?.total) || 0;
    const totalPaid = calculateTotal();

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
                {/* copy */}

                <p className="w-24 mx-auto text-center text-[11px] border rounded-md ">
                  Customer Copy
                </p>

                {/* time and date */}

                <div className="flex justify-between text-[10px]">
                  <p>print Date: {isOpen ? formatDate(new Date()) : ""} </p>

                  <p>
                    Issue Date:
                    {formData?.date}
                  </p>
                </div>

                {/* name and order id */}
                <div className="flex justify-between">
                  <div className="flex text-[12px]">
                    <p className="me-1 font-semibold">Name</p>
                    <p>: {searchDatas?.data?.orderDetails[0]?.patient}</p>
                  </div>

                  <div className="flex text-[12px]">
                    <p className="me-1 font-semibold">Order Id</p>
                    <p>: {formData?.OrderId}</p>
                  </div>
                </div>
                {/* total amoun*/}

                <hr className="mt-8" />
                <div className=" text-black flex justify-between text-[12px] mt-4 font-semibold mb-3">
                  <div></div>
                  <div className="flex ">
                    <p className="me-5 ">Total Amount</p>

                    <p className="">
                      {searchDatas?.data?.orderDetails[0]?.total}
                    </p>
                  </div>
                </div>

                {/* paid */}

                <div className=" text-black flex justify-between items-center text-[12px]  ">
                  <div>
                    <p className="capitalize">
                      In word:
                      <span className="px-2">{formData?.inWord}</span>
                      Tk only
                    </p>
                  </div>
                  <div className="flex border-t-[1px]">
                    <p className="me-5">Paid </p>

                    <p className="">{formData?.paid}</p>
                  </div>
                </div>

                <div className=" text-black flex justify-between text-[12px] ">
                  <div></div>
                  <div className="flex border-t-[1px]">
                    <p className="me-5">Total Paid</p>

                    <p className="">{calculateTotal()}</p>
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

                <div className="flex items-center text-[12px] gap-2 mt-2">
                  <p> prepared by :</p>
                  <p> {formData.user} </p>
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
                {/* copy */}

                <p className="w-24 mx-auto text-center text-[11px] border rounded-md ">
                  Customer Copy
                </p>

                {/* time and date */}

                <div className="flex justify-between text-[10px]">
                  <p>print Date: {isOpen ? formatDate(new Date()) : ""} </p>

                  <p>
                    Issue Date:
                    {formData?.date}
                  </p>
                </div>

                {/* name and order id */}
                <div className="flex justify-between">
                  <div className="flex text-[12px]">
                    <p className="me-1 font-semibold">Name</p>
                    <p>: {searchDatas?.data?.orderDetails[0]?.patient}</p>
                  </div>

                  <div className="flex text-[12px]">
                    <p className="me-1 font-semibold">Order Id</p>
                    <p>: {formData?.OrderId}</p>
                  </div>
                </div>
                {/* total amoun*/}

                <hr className="mt-8" />
                <div className=" text-black flex justify-between text-[12px] mt-4 font-semibold mb-3">
                  <div></div>
                  <div className="flex ">
                    <p className="me-5 ">Total Amount</p>

                    <p className="">
                      {searchDatas?.data?.orderDetails[0]?.total}
                    </p>
                  </div>
                </div>

                {/* paid */}

                <div className=" text-black flex justify-between items-center text-[12px]  ">
                  <div>
                    <p className="capitalize">
                      In word:
                      <span className="px-2">{formData?.inWord}</span>
                      Tk only
                    </p>
                  </div>
                  <div className="flex border-t-[1px]">
                    <p className="me-5">Paid </p>

                    <p className="">{formData?.paid}</p>
                  </div>
                </div>

                <div className=" text-black flex justify-between text-[12px] ">
                  <div></div>
                  <div className="flex border-t-[1px]">
                    <p className="me-5">Total Paid</p>

                    <p className="">{calculateTotal()}</p>
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

                <div className="flex items-center text-[12px] gap-2 mt-2">
                  <p> prepared by :</p>
                  <p> {formData.user} </p>
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
