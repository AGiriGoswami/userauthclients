import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  UserIcon,
  EnvelopeIcon,
  ArrowRightOnRectangleIcon,
  ShieldCheckIcon, // Added for visual flair
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { userlogout } from "../Redux/userSlice";

const Profile = () => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  // Safe access to user data with fallbacks
  const userName = authUser?.preuser?.name || "User";
  const userEmail = authUser?.preuser?.email || "No email provided";

  const handleLogout = async () => {
    setIsLoggingOut(true);
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
      dispatch(userlogout());
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      {/* Card Container */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        
        {/* Decorative Header Background */}
        <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
          {/* Absolute Logout Button (Top Right) */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-200 group"
            title="Logout"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Content Section */}
        <div className="px-8 pb-8 relative">
          
          {/* Floating Avatar */}
          <div className="-mt-16 mb-6 flex justify-center">
            <div className="w-32 h-32 bg-white p-2 rounded-full shadow-lg">
              <div className="w-full h-full bg-indigo-50 rounded-full flex items-center justify-center border-2 border-indigo-100">
                <UserIcon className="h-16 w-16 text-indigo-400" />
              </div>
            </div>
          </div>

          {/* User Basics */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-800 capitalize ">{userName}</h1>
          </div>

          {/* Details Box */}
          <div className="bg-slate-50 rounded-2xl p-5 space-y-5 border border-slate-100">
            
            {/* Username Field */}
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white rounded-xl shadow-sm text-indigo-500">
                <ShieldCheckIcon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider ">
                  Full Name
                </p>
                <p className="text-sm font-medium text-slate-700 capitalize">{userName}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-200 w-full"></div>

            {/* Email Field */}
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white rounded-xl shadow-sm text-indigo-500">
                <EnvelopeIcon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Email Address
                </p>
                <p className="text-sm font-medium text-slate-700 break-all">
                  {userEmail}
                </p>
              </div>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="mt-8">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center space-x-2 ${
                isLoggingOut
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95"
              }`}
            >
                {isLoggingOut ? (
                    // Simple loading spinner
                    <svg className="animate-spin h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    <>
                        <ArrowRightOnRectangleIcon className="w-5 h-5" />
                        <span>Sign Out</span>
                    </>
                )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile; 