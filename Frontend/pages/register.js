import Router from "next/router";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "https://backend-2vl3.onrender.com/api/v1";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      email,
      password,
      name,
      confirmPassword,
    };
    register(user)
      .then((response) => {
        // handle success
        console.log(response.data.data.bearerToken);
        props.setBearerToken(response.data.data.bearerToken);
        console.log(1, props.bearerToken);
        Router.push("/login");
      })
      .catch((error) => {
        toast.error(`${error.response.data.data.message} `, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        // handle error
      });
  };

  const register = (user) => {
    return axios.post(`${API_URL}/user/register`, user);
  };
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold my-4">Register</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Email</span>
                </label>
                <label className="input-group">
                  <span className=" w-24">Email</span>
                  <input
                    placeholder="info@site.com"
                    className="input input-bordered w-48"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Password</span>
                </label>
                <label className="input-group">
                  <span className=" w-24">Password</span>
                  <input
                    placeholder="info@site.com"
                    className="input input-bordered w-48"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <label className="input-group">
                  <span className=" w-24">Confirm Password</span>
                  <input
                    placeholder="info@site.com"
                    className="input input-bordered w-48"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Name</span>
                </label>
                <label className="input-group">
                  <span className=" w-24">Name</span>
                  <input
                    placeholder="John Doe"
                    className="input input-bordered w-48"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
              </div>
              <br />
              <button className="btn btn-primary my-4" type="submit">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
