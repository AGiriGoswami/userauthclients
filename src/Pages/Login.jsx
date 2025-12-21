import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { setauthUser } from "../Redux/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [user, setuser] = useState({
    email: "",
    password: "",
  });
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/api/user/login",
        user,
        {
          withCredentials: true,
        }
      );
      console.log(res);
      dispatch(setauthUser(res.data));
      Navigate("/profile");
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.errors || error.response.data.message);
    }
  };
  return (
    <div className="flex items-center justify-center mt-20">
      <div className="flex justify-center">
        <form onSubmit={HandleSubmit}>
          <div className="card w-96 bg-base-100 shadow-xl justify-center items-center">
            <div className="card-body">
              <h1 className="card-title justify-center font-semibold cursor-pointer">
                Login
              </h1>

              <div className="items-center mt-2">
                <label className="input input-bordered flex items-center gap-2 mb-2">
                  
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={user.email}
                    onChange={(e) =>
                      setuser({ ...user, email: e.target.value })
                    }
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2 mb-2">
                
                  <input
                    type="password"
                    placeholder="******"
                    name="password"
                    value={user.password}
                    onChange={(e) =>
                      setuser({ ...user, password: e.target.value })
                    }
                  />
                </label>
              </div>
              <div className="card-actions justify-end">
                <button className="btn btn-primary w-full">Login</button>
              </div>
              <div className="bold justify-center text-center">
                I Have No Account? {""}
                <Link to="/register" className="text-red-500">
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
