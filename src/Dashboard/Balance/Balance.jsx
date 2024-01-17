import { useEffect, useState } from "react";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

const Balance = () => {
  const base_url = import.meta.env.VITE_BASE_URL;
  const [isloading, setIsloading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [totalIncomes, setTotalIncomes] = useState(0);
  const [totalExpenditures, setTotalExpenditures] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    setIsloading(true);
    // fetch(`${base_url}/balance_list`)
    fetch(`${base_url}/balance_list`)
      .then((res) => res.json())
      .then((data) => {
        setIsloading(false);

        setTransactions(data);
      });
  }, []);

  // calculte
  useEffect(() => {
    // Calculate total income, total expenditure, and overall balance
    const calculateBalance = () => {
      // Filter transactions into income and expenditure arrays
      const incomeTransactions = transactions.filter(
        (transaction) => transaction.type === "income"
      );
      const expenditureTransactions = transactions.filter(
        (transaction) =>
          transaction.type === "expenditure" && transaction.approve === true
      );

      // Helper function to calculate the total amount from an array of transactions
      const calculateTotal = (transactions) =>
        transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

      // Set the state variables with the calculated totals
      setTotalIncomes(calculateTotal(incomeTransactions));
      setTotalExpenditures(calculateTotal(expenditureTransactions));
      setTotalBalance(
        calculateTotal(incomeTransactions) -
          calculateTotal(expenditureTransactions)
      );
    };
    calculateBalance();
  }, [transactions]);

  return (
    <div className="md:flex justify-between items-center w-full md:px-10 mt-4 ">
      {/* income */}
      <div className="w-80 text-center bg-blue-500 rounded-md text-white p-3 mx-auto mb-3 ">
        <h1 className="mb-2 font-bold">Total Income</h1>
        <hr />
        {isloading ? (
          <p>Calcutating</p>
        ) : (
          <p className="font-semibold">{totalIncomes}</p>
        )}
        <Link to="/dashboard/incomeledger">
          <button className="flex items-center ml-auto">
            Detaiils <MdOutlineKeyboardDoubleArrowRight />
          </button>
        </Link>
      </div>
      {/* Expenditure */}
      <div className="w-80 text-center bg-red-500 rounded-md text-white p-3 mx-auto mb-3 ">
        <h1 className="mb-2 font-bold">Total Expenditure</h1>
        <hr />
        {isloading ? (
          <p>Calcutating</p>
        ) : (
          <p className="font-semibold">{totalExpenditures}</p>
        )}
        <Link to="/dashboard/expenditure">
          <button className="flex items-center ml-auto">
            Detaiils <MdOutlineKeyboardDoubleArrowRight />
          </button>
        </Link>
      </div>

      {/* remaining Balance */}
      <div className="w-80 text-center bg-green-500 rounded-md text-white p-3 mx-auto mb-3 ">
        <h1 className="mb-2 font-bold">Remaining Balance</h1>
        <hr />
        {isloading ? (
          <p>Calcutating</p>
        ) : (
          <p className="font-semibold">{totalBalance}</p>
        )}
        <Link to="/dashboard/balance">
          <button className="flex items-center ml-auto">
            Detaiils <MdOutlineKeyboardDoubleArrowRight />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Balance;
