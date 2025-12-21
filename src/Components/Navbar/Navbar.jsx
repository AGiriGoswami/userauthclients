import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userlogout } from "../../Redux/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const { authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const Logout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/user/logout",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message);
      dispatch(userlogout())
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Logout" || error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
      <div className="navbar-start">
        <Link
          className="btn btn-ghost text-xl font-bold hover:text-blue-600 transition-colors"
          to="/"
        >
          User Auth App
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        {/* Optional: Add center items if needed */}
      </div>

      <div className="navbar-end">
        {/* Desktop Dropdown */}
        <div className="dropdown dropdown-end hidden md:block">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
            onClick={toggleDropdown}
          >
            <div className="w-10 rounded-full">
              <img
                alt="User Avatar"
                src="data:image/png;base64,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"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className={`menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow ${
              isDropdownOpen ? "block" : "hidden"
            }`}
          >
            {authUser ? (
              <>
                <li>
                  <Link
                    className="justify-between"
                    to="/profile"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      Logout();
                      setIsDropdownOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" onClick={() => setIsDropdownOpen(false)}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" onClick={() => setIsDropdownOpen(false)}>
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="btn btn-ghost btn-circle"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-base-100 shadow-lg z-40">
          <ul className="menu menu-compact p-4">
            {authUser ? (
              <>
                <li>
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      Logout();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
