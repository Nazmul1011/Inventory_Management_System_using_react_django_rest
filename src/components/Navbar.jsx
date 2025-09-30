import { Link } from "react-router-dom";
import AuthDropdowns from "./AutoDropDown";

function Navbar() {
  return (
    <div className="navbar max-w-screen-2xl container mx-auto bg-white shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/contact"}>Contect Us</Link>
            </li>
            <li>
              <Link to={"/aboutus"}>About Us</Link>
            </li>
           
             <li>
              <Link to={"/help"}>Help</Link>
            </li>
            <li>
              <Link to={"/userlogin"}>User_Login</Link>
            </li>
          </ul>
        </div>

        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          <img src="./logo.png" alt="IMS Logo" />
          <span>IMS</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/contact"}>Contact US</Link>
            </li>
            <li>
              <Link to={"/aboutus"}>About Us</Link>
            </li>
             <li>
              <Link to={"/help"}>Help</Link>
            </li>
        </ul>
      </div>
      <div className="navbar-end">
        <AuthDropdowns />
      </div>
    </div>
  );
}
export default Navbar;
