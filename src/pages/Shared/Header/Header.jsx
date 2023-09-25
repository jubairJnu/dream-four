import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";


const Header = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then({})
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <div className="navbar  bg-[#1653B2] fixed top-0 z-20 text-[20px] text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#1653B2] rounded-box w-52">
            <li><Link to="/service">Our Service</Link></li>
            <li> <Link to="/doctor">Doctor Corner</Link> </li>
            <li> <Link> About Us </Link> </li>
            {
              user &&                
              <>
              <li className=" hover:bg-white rounded-md hover:font-semibold ">
                <Link to="/dashboard"> Dashboard </Link> </li>            
              <li className="mr-3 hover:bg-white rounded-md hover:font-semibold ">
                <Link to="/receipt"> Receipt Entry </Link> </li>  
              </>          

            }
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case md:text-xl">Dream Four Hospital </Link>
      </div>


      <div className="navbar-center hidden lg:flex ">
        <ul className="menu menu-horizontal px-1 text-[20px] ">
          <li className="hover:bg-white rounded-md hover:font-semibold">
            <Link to="/service">Our Service</Link></li>

          <li className="hover:bg-white rounded-md hover:font-semibold"> 
          <Link to="/doctor">Doctor Corner</Link> </li>
          <li className="hover:bg-white rounded-md hover:font-semibold "> <Link> About Us </Link> </li>

          {
              user &&                
                <>
                <li className=" hover:bg-white rounded-md hover:font-semibold ">
                  <Link to="/dashboard"> Dashboard </Link> </li>            
                <li className="mr-3 hover:bg-white rounded-md hover:font-semibold ">
                  <Link to="/receipt"> Receipt Entry </Link> </li>  
                </>          

            }
                    </ul>
</div>
          {/* condition for users login */}

          <div className="navbar-end">
          <div>
          {
              user ? 
                <button onClick={handleLogOut} className="btn btn-ghost">Log Out</button>
               : <>
                <Link to='/login'>Login</Link></>

            }
          </div>
          </div>

        

      

    </div>
  );
};

export default Header;