import { useEffect, useState } from 'react';
import ReceiptModal from './ReceiptModal';
import Loading from '../../../component/Loading';
const ReceiptTable = ({ formData }) => {
  const [recentReceipt, setRecentReceipt] = useState([]);
  const [selectedReceipt, setselectedReceipt] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const lastReceipt = recentReceipt.slice(-5).reverse()




  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleView = (receipt) => {    
      fetch(`https://dream-four-server.vercel.app/all-receipt/${receipt._id}`)
        .then(res => res.json())
        .then(data =>{ 
        setselectedReceipt(data)
          console.log('modal',data)});
   
    openModal()
  }

  useEffect(() => {
    fetch('https://dream-four-server.vercel.app/all-receipt')
      .then(res => res.json())
      .then(data =>
        {setIsLoading(false)
         setRecentReceipt(data)});
  }, [])

  return (
    <div className='my-10'>
        <h3 className='text-xl font-bold mb-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white  p-2'>Last Five Receipt</h3>
      <table className="table">
        {/* head */}
      
        <thead>
          <tr className="md:text-[20px] bg-[#1653B2] text-white ">
            <th>
              #
            </th>
            <th>Order Id</th>
            <th>Amount</th>
            <th>Service</th>
            <th>Date</th>
            <th>User Name</th>
            <th>Print</th>

          </tr>
        </thead>
       {
        isLoading? <Loading/> : <> 
         <tbody >

{
  lastReceipt?.map((receipts, index) => <tr key={receipts._id}>
    <th>
      {index + 1}
    </th>
    <td>
      {receipts?.OrderId}
    </td>
    <td>
      <p>{receipts?.paid}tk  </p>
    </td>
    <td>{receipts?.service} </td>
    <th>
      {receipts?.date}
    </th>
    <th>
      {receipts?.user}
    </th>
    <th>
      <button onClick={()=> handleView(receipts)}>View</button>
    <ReceiptModal isOpen={isModalOpen} onClose={closeModal} selectedReceipt={selectedReceipt} />
    </th>


  </tr>)
}


</tbody>
        </>
       }


      </table>
    </div>
  );
};

export default ReceiptTable;