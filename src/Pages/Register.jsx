import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
  });

   const URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const HandleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${URL}/api/user/register`, user, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success(res.data.message || "Account Created Successfully");

      navigate("/login");
    } catch (error) {
      console.log(error);

      toast.error(error.response.data.errors || error.response.data.message);
    }
    setuser({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      <div>
        <div className="flex justify-center items-center mt-20">
          <form onSubmit={HandleSubmit}>
            <div className="card w-96 bg-base-100 shadow-xl justify-center items-center ">
              <div className="card-body">
                <h1 className="card-title justify-center font-semibold cursor-pointer">
                  Create Account
                </h1>
                <div className="items-center mt-2">
                  <label className="input input-bordered flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Full Name"
                      name="name"
                      value={user.name}
                      onChange={(e) =>
                        setuser({ ...user, name: e.target.value })
                      }
                    />
                  </label>
                </div>
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
                      placeholder="password"
                      name="password"
                      value={user.password}
                      onChange={(e) =>
                        setuser({ ...user, password: e.target.value })
                      }
                    />
                  </label>
                </div>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary w-full" type="submit">
                    Create Account
                  </button>
                </div>

                <div className="bold justify-center text-center">
                  I Have a Account? {""}
                  <Link to="/login" className="text-red-500">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
