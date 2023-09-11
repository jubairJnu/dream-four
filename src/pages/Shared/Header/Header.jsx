import { Link } from "react-router-dom";


const Header = () => {
  return (
    <div className="navbar bg-[#1653B2] fixed top-0 z-20 text-[20px] p-4 text-yellow-500 ">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#1653B2] rounded-box w-52">
        <li><Link>Our Service</Link></li>
        <li> <Link>Doctor Corner</Link> </li>
        <li> <Link> About Us </Link> </li>
      </ul>
    </div>
    <Link to="/" className="btn btn-ghost normal-case text-xl">Dream Four Hospital </Link>
  </div>
  <div className="navbar-center hidden lg:flex ">
    <ul className="menu menu-horizontal px-1 text-[20px] ">
    <li className="hover:bg-white rounded-md hover:font-semibold">
      <Link>Our Service</Link></li>
    <li tabIndex={0}>
        <details>
          <summary>Receipt</summary>
          <ul className="w-52 bg-[#4075c5]" >
            <li><a> Receipt Entry </a></li>
            <li><a>Income Ledger</a></li>
          </ul>
        </details>
        </li>
        <li className="hover:bg-white rounded-md hover:font-semibold"> <Link>Doctor Corner</Link> </li>
        <li className="hover:bg-white rounded-md hover:font-semibold "> <Link> About Us </Link> </li>
        
    </ul>
  </div>
  <div className="navbar-end rounded-md hover:font-semibold">
    {/* **ToDo */}
   <Link to='/login'>Login</Link> 
  </div>
</div>
  );
};

export default Header;