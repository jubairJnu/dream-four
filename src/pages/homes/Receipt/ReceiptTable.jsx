/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import ReceiptModal from "./ReceiptModal";
import Loading from "../../../component/Loading";
const ReceiptTable = () => {
  const base_url = import.meta.env.VITE_BASE_URL;
  const [recentReceipt, setRecentReceipt] = useState([]);
  const [selectedReceipt, setselectedReceipt] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const lastReceipt = recentReceipt.slice(-5).reverse();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //

  const handleView = (receipt, paymentDetails) => {
    fetch(`${base_url}/receipt/${receipt._id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        setselectedReceipt(data);
        openModal();
        // const selectedDate = paymentDetails.date; // Use the date from the first paymentInfo object

        // const selectedReceiptData = data?.data.orderDetails
        //   .map((item) => {
        //     const matchingPaymentInfo = item.paymentInfo.filter(
        //       (info) => info.date === selectedDate
        //     );

        // Include the item only if there's a matching paymentInfo for the selected date
        //   if (matchingPaymentInfo.length > 0) {
        //     return { ...item, paymentInfo: matchingPaymentInfo };
        //   }

        //   return null; // Exclude the item if there's no matching paymentInfo
        // })
        // .filter(Boolean); // Remove null entries from the result

        // setselectedReceipt(selectedReceiptData);
      });
  };

  useEffect(() => {
    fetch(`${base_url}/all-receipt`)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);

        setRecentReceipt(data);
      });
  }, []);

  return (
    <div className="my-10">
      <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white  p-2">
        Last Five Receipt
      </h3>
      <table className="table">
        {/* head */}

        <thead>
          <tr className="md:text-[20px] bg-[#1653B2] text-white  ">
            <th>#</th>
            <th>Order Id</th>
            <th>Amount</th>
            <th className="hidden sm:table-cell">Service</th>
            <th>Date</th>
            <th>User Name</th>
            <th className="hidden sm:table-cell">Print</th>
          </tr>
        </thead>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <tbody>
              {lastReceipt?.map((receipts, index) =>
                receipts?.paymentInfo?.map((paymentDetails) => (
                  <tr key={receipts._id}>
                    <th>{index + 1}</th>
                    <td>{receipts?.OrderId}</td>
                    <td>
                      <p>{paymentDetails?.paid}tk </p>
                    </td>
                    <td className="hidden sm:table-cell">
                      {Array.isArray(receipts?.service) &&
                        receipts?.service?.map((item, index) => (
                          <div key={index}>
                            <p>{item.name}</p>
                          </div>
                        ))}
                    </td>

                    <th>{paymentDetails?.date}</th>
                    <th>{paymentDetails?.user}</th>

                    <th className="hidden sm:table-cell">
                      <button
                        className="cursor-pointer"
                        onClick={() => handleView(receipts, paymentDetails)}
                      >
                        View
                      </button>
                      <ReceiptModal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        selectedReceipt={selectedReceipt}
                      />
                    </th>
                  </tr>
                ))
              )}
            </tbody>
          </>
        )}
      </table>
    </div>
  );
};

export default ReceiptTable;
