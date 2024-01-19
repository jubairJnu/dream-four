import { useRef } from "react";
import ReactToPrint from "react-to-print";
import logo from "../../public/logo.jpg";

const Modal = ({ isOpen, onClose, formData, Order }) => {
  const calculateTotal = () => {
    if (!formData || !formData?.service) {
      return 0;
    }

    return formData?.service.reduce(
      (total, receipt) => total + receipt.price,
      0
    );
  };

  // calculte due
  const calculateDueAmount = () => {
    if (!formData || !formData?.paymentInfo) {
      return 0;
    }

    const grandTotal = parseFloat(formData?.total) || 0;
    const paidAmount = parseFloat(formData?.paymentInfo[0]?.paid) || 0;

    return grandTotal - paidAmount;
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
              {/* content one 1 */}
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
                {/*  */}
                <p className="w-24 mx-auto text-center text-[11px] border rounded-md ">
                  Customer Copy
                </p>
                {/* time and date */}
                <div className="flex justify-between text-[10px]">
                  <p>print Date: {isOpen ? formatDate(new Date()) : ""} </p>

                  <p>
                    Issue Date:
                    {formData?.paymentInfo[0]?.date}
                  </p>
                </div>

                {/* name */}
                <div className="flex justify-between">
                  <div className="flex text-[12px]">
                    <p className="me-1 font-semibold">Name</p>
                    <p>: {formData.patient}</p>
                  </div>
                  <div className="flex text-[12px]">
                    <p className="me-1 font-semibold">Order Id</p>
                    <p>: {Order}</p>
                  </div>
                </div>
                {/*age gender contact  */}

                <div className="text-[12px] flex items-center justify-between">
                  <div className="flex gap-[2px]">
                    <p className="me-[15px] font-semibold">Age </p>
                    <p>: {formData?.age} y</p>
                  </div>
                  {/* gender */}
                  <div className="flex gap-[2px]">
                    <p className="font-semibold">Gender </p>
                    <p>: {formData?.gender}</p>
                  </div>
                  {/* contact */}

                  <div className="flex gap-[2px]">
                    <p className="font-semibold">Mobile </p>
                    <p>: {formData?.phone}</p>
                  </div>
                </div>
                {/* doctor */}
                <div className="text-[12px] flex">
                  <p className="me-[3px] font-semibold">Ref by</p>
                  <p>: {formData?.doctor}</p>
                </div>

                {/* services */}
                <div className="bg-white flex justify-between items-center text-black text-[12px] border-b-2 font-semibold mt-2 ">
                  <p>
                    <span className="me-10">SL.</span> Test Name
                  </p>
                  <p>Price</p>
                </div>
                <div>
                  {formData &&
                    formData?.service &&
                    formData?.service?.map((receipt, index) => (
                      <>
                        <div className="flex justify-between grid-cols-2 items-center text-[12px]">
                          <div>
                            <span className="me-5">{index + 1}</span>
                            {receipt?.name}
                          </div>
                          <p className=" ">{receipt.price} </p>
                        </div>
                      </>
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
                      {formData?.paymentInfo[0]?.discount}
                      {formData?.paymentInfo[0]?.discountType &&
                        (formData?.paymentInfo[0]?.discountType ===
                        "percentage" ? (
                          <span className="ms-2"> % </span>
                        ) : (
                          <span className="ms-2"> /- </span>
                        ))}
                    </p>
                  </div>
                </div>

                {/* grand total */}

                <div className=" text-black flex justify-between text-[12px] ">
                  <div></div>
                  <div className="flex border-t-[1px]">
                    <p className="me-5">Grand Total</p>

                    <p className="">{formData?.total}</p>
                  </div>
                </div>

                {/* paid */}

                <div className=" text-black flex justify-between items-center text-[12px]  ">
                  <div>
                    <p className="capitalize">
                      In word:
                      <span className="px-2">
                        {formData?.paymentInfo[0]?.inWord}
                      </span>
                      Tk only
                    </p>
                  </div>
                  <div className="flex border-t-[1px]">
                    <p className="me-5">Paid </p>

                    <p className="">{formData?.paymentInfo[0]?.paid}</p>
                  </div>
                </div>

                {/*due  */}
                <div className="flex justify-between text-[12px] text-black">
                  <div></div>
                  <div className="flex border-t-[1px]">
                    <p className="me-5">Due </p>

                    <p className="">{calculateDueAmount()}</p>
                  </div>
                </div>

                {/*  */}
                <div className="flex items-center text-[12px] gap-2 mt-2">
                  <p> prepared by :</p>
                  <p> {formData?.paymentInfo[0]?.user} </p>
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
                {/*  */}
                <p className="w-24 mx-auto text-center text-[11px] border rounded-md ">
                  Office Copy
                </p>
                {/* time and date */}
                <div className="flex justify-between text-[10px]">
                  <p>print Date: {isOpen ? formatDate(new Date()) : ""} </p>

                  <p>
                    Issue Date:
                    {formData?.paymentInfo[0]?.date}
                  </p>
                </div>

                {/* name */}
                <div className="flex justify-between">
                  <div className="flex text-[12px]">
                    <p className="me-1 font-semibold">Name</p>
                    <p>: {formData.patient}</p>
                  </div>
                  <div className="flex text-[12px]">
                    <p className="me-1 font-semibold">Order Id</p>
                    <p>: {Order}</p>
                  </div>
                </div>
                {/*age gender contact  */}

                <div className="text-[12px] flex items-center justify-between">
                  <div className="flex gap-[2px]">
                    <p className="me-[15px] font-semibold">Age </p>
                    <p>: {formData?.age} y</p>
                  </div>
                  {/* gender */}
                  <div className="flex gap-[2px]">
                    <p className="font-semibold">Gender </p>
                    <p>: {formData?.gender}</p>
                  </div>
                  {/* contact */}

                  <div className="flex gap-[2px]">
                    <p className="font-semibold">Mobile </p>
                    <p>: {formData?.phone}</p>
                  </div>
                </div>
                {/* doctor */}
                <div className="text-[12px] flex">
                  <p className="me-[3px] font-semibold">Ref by</p>
                  <p>: {formData?.doctor}</p>
                </div>

                {/* services */}
                <div className="bg-white flex justify-between items-center text-black text-[12px] border-b-2 font-semibold mt-2">
                  <p>
                    <span className="me-10">SL.</span> Test Name
                  </p>
                  <p>Price</p>
                </div>
                <div>
                  {formData &&
                    formData?.service &&
                    formData?.service?.map((receipt, index) => (
                      <>
                        <div className="flex justify-between grid-cols-2 items-center text-[12px]">
                          <div>
                            <span className="me-5">{index + 1}</span>
                            {receipt?.name}
                          </div>
                          <p className=" ">{receipt.price} </p>
                        </div>
                      </>
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
                    <p className="me-5">(-) Discount</p>

                    <p className="">
                      {formData?.paymentInfo[0]?.discount}
                      {/* conditionally sign */}
                      {formData?.paymentInfo[0]?.discountType &&
                        (formData?.paymentInfo[0]?.discountType ===
                        "percentage" ? (
                          <span className="ms-2"> % </span>
                        ) : (
                          <span className="ms-2"> /- </span>
                        ))}
                    </p>
                  </div>
                </div>

                {/* grand total */}

                <div className=" text-black flex justify-between text-[12px] ">
                  <div></div>
                  <div className="flex border-t-[1px]">
                    <p className="me-5">Grand Total</p>

                    <p className="">{formData?.total}</p>
                  </div>
                </div>

                {/* paid */}

                <div className=" text-black flex justify-between items-center text-[12px]  ">
                  <div>
                    <p className="capitalize">
                      In word:
                      <span className="px-2">
                        {formData?.paymentInfo[0]?.inWord}
                      </span>
                      Tk only
                    </p>
                  </div>
                  <div className="flex border-t-[1px]">
                    <p className="me-5">Paid </p>

                    <p className="">{formData?.paymentInfo[0]?.paid}</p>
                  </div>
                </div>

                {/*due  */}
                <div className="flex justify-between text-[12px] text-black">
                  <div></div>
                  <div className="flex border-t-[1px]">
                    <p className="me-5">Due </p>

                    <p className="">{calculateDueAmount()}</p>
                  </div>
                </div>

                {/*  */}
                <div className="flex items-center text-[12px] gap-2 mt-2">
                  <p> prepared by :</p>
                  <p> {formData?.paymentInfo[0]?.user} </p>
                </div>

                {/* footer */}
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

export default Modal;
