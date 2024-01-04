/* eslint-disable no-unused-vars */
import { useState } from "react";
import numberToWords from "number-to-words";
import Loading from "../../../component/Loading";
import ReceiptModal from "./ReceiptModal";

const DueEntry = () => {
  const base_url = import.meta.env.VITE_BASE_URL;
  const [selectedReceipt, setselectedReceipt] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchDatas, setSearchDatas] = useState([]);
  const [formData, setFormData] = useState([]);
  const [priceField, setpriceField] = useState([]);
  const [coverted, setcoverted] = useState([]);

  //hnadler
  const handlePriceWord = (event) => {
    const paidField = event.target.value;
    setpriceField(paidField);
    console.log(paidField);

    const convert = numberToWords.toWords(paidField);
    console.log(convert);
    setcoverted(convert);
    setFormData((prevFormData) => ({
      ...prevFormData,
      inWord: convert,
    }));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleView = (receipt) => {
    fetch(`${base_url}/all-receipt/${receipt._id}`)
      .then((res) => res.json())
      .then((data) => {
        setselectedReceipt(data);
        console.log("modal", data);
      });

    openModal();
  };

  const handleOrderSearch = (e) => {
    const orderId = e.target.value;
    if (orderId && orderId.length === 6) {
      setIsLoading(true);
      fetch(`${base_url}/search-orderid`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ OrderId: orderId }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
          setSearchDatas(data);
          setIsLoading(false);
        });
    }
  };

  //handle submit

  const handleSubmit = (event) => {
    event.preventDefault();

    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    // Format the date as "YYYY-MM-DDTHH:mm:ss.sssZ"
    const formattedDate = `${year}-${month}-${day}`;

    const form = event.target;
    const OrderId = form.orderId.value;
    const paid = form.paid.value;
    const discount = form.discount.value;
    const paymentInfo = {
      OrderId,
      paid: parseInt(paid),
      discount,
      coverted,
      date: formattedDate,
    };
    console.log("paymentinfo", paymentInfo);
    fetch(`${base_url}/due-amount`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(paymentInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        setSearchDatas(data);
        setIsLoading(false);
      });
  };

  return (
    <div className="container mx-auto md:px-10 mt-14">
      <div className="md:flex justify-between items-center">
        {/* search part */}
        <div>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-black">Order Id </span>
              </label>
              <input
                name="orderId"
                onChange={handleOrderSearch}
                className="input input-bordered input-info w-full "
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Paid Amount </span>
              </label>
              <input
                name="paid"
                className="input input-bordered input-info w-full"
                placeholder="Pay Now"
                onChange={handlePriceWord}
                required
              />
            </div>
            {/* discount */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Discount Amount </span>
              </label>
              <input
                name="discount"
                className="input input-bordered input-info w-full"
                placeholder="Discount"
              />
              <p className="my-4 capitalize text-sm text-start">
                {" "}
                <span className="font-bold text-blue-700 text-sm text-start ">
                  In Word:
                </span>{" "}
                {coverted} Tk Only{" "}
              </p>
            </div>

            {/* submit */}

            <button className="btn-block bg-blue-500 px-2 py-2 mt-3 cursor-pointer text-white rounded-md mx-auto">
              {" "}
              <input type="submit" />
            </button>
          </form>
        </div>

        {/* show details */}
        {/* <div>
          
          <p>Patient Name: {} </p>
          <p>Order ID: </p>
          <p>Sevice Name: </p>
          <p>Service Fee: </p>
          <p>Paid Amount: </p>
          <p>Discount: </p>
          <p>Due Amount: </p>
        
        </div> */}

        {isLoading ? (
          <Loading />
        ) : (
          <div>
            {searchDatas &&
            searchDatas.data &&
            searchDatas.data.orderDetails &&
            searchDatas.data.orderDetails.length > 0 ? (
              <div>
                <p>
                  Patient Name: {searchDatas?.data?.orderDetails[0]?.patient}
                </p>
                <p>Order ID: {searchDatas?.data?.orderDetails[0]?.OrderId}</p>
                <p>
                  Service Name: {searchDatas?.data?.orderDetails[0]?.service}
                </p>
                <p>Total Fee: {searchDatas?.data?.orderDetails[0]?.total}</p>
                <p>
                  Paid Amount:
                  {searchDatas?.data?.orderDetails[0]?.paymentInfo[0]?.paid}
                </p>
                <p>
                  Discount:
                  {searchDatas?.data?.orderDetails[0]?.paymentInfo[0]?.discount}
                </p>
                <p>
                  Due Amount:
                  {searchDatas?.data?.orderDetails[0]?.total -
                    searchDatas?.data?.totalPaidAmount}
                </p>
              </div>
            ) : (
              <p>No order details found</p>
            )}
          </div>
        )}
      </div>

      {/* payment details table */}
      <div className="mt-7">
        <h1 className="md:text-[20px] bg-[#1653B2] text-white p-4 rounded-lg  mb-5">
          Payment List Of{" "}
          {searchDatas &&
          searchDatas.data &&
          searchDatas.data.orderDetails &&
          searchDatas.data.orderDetails.length > 0
            ? searchDatas.data.orderDetails[0]?.patient
            : " "}{" "}
          (
          {searchDatas &&
          searchDatas.data &&
          searchDatas.data.orderDetails &&
          searchDatas.data.orderDetails.length > 0
            ? searchDatas.data.orderDetails[0]?.OrderId
            : " "}
          )
        </h1>

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
              {/* tbody */}
              <tbody>
                {searchDatas &&
                searchDatas.data &&
                searchDatas.data.orderDetails &&
                searchDatas.data.orderDetails.length > 0
                  ? searchDatas?.data?.orderDetails.map((order, orderIndex) =>
                      // Map through paymentInfo array for each orderDetails
                      order.paymentInfo.map((payment, paymentIndex) => (
                        <tr key={`${orderIndex}-${paymentIndex}`}>
                          <th>{paymentIndex + 1}</th>
                          <td>{order?.OrderId}</td>
                          <td>
                            <p>{payment?.paid}tk </p>
                          </td>
                          <td className="hidden sm:table-cell">
                            {order?.service}
                          </td>
                          <th>{payment?.date}</th>
                          <th>{order?.user}</th>
                          <th className="hidden sm:table-cell">
                            <button onClick={() => handleView(order)}>
                              View
                            </button>
                            <ReceiptModal
                              isOpen={isModalOpen}
                              onClose={closeModal}
                              selectedReceipt={order}
                            />
                          </th>
                        </tr>
                      ))
                    )
                  : null}
              </tbody>
            </>
          )}
        </table>
      </div>
    </div>
  );
};

export default DueEntry;
