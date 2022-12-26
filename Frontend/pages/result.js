import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";
export const API_URL = "https://backend-2vl3.onrender.com/api/v1";
import { getBearerToken } from "../lib/beraerTokenFn";
import { toast } from "react-toastify";
import { logout } from "../lib/logout";
import Navbar from "../components/navbar";


function Result(props) {
  //is req sent state
  const [isReqSent, setIsReqSent] = useState(false);
  const [bearerToken, setBearerToken] = useState(getBearerToken());

  useEffect(() => {
    //if bearer token is not set, redirect to login page
    setTimeout(() => {
      console.log(1223, bearerToken, props.bearerToken);
      if (bearerToken === "" && props.bearerToken === "") {
        Router.push("/login");
      }
    }, 500);
    const config = {
      headers: { authorization: `Bearer ${props.bearerToken}` },
    };

    const bodyParameters = {
      wpm: props.wpm,
      accuracy: props.accuracy,
      value: (props.accuracy * 100 * props.wpm) / 10,
    };
    if (props.bearerToken !== "dummy") {
      if (!isReqSent && props.wpm && props.accuracy) {
        let res;
        axios
          .post(`${API_URL}/score/register`, bodyParameters, config)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            toast.error(`error `, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            console.log(err);
          });
        setIsReqSent(true);
      }
    }
  }, []);

  const Logout = logout(props, setBearerToken);
  return (
    <div>
               <Navbar authroute={true} pageprops={props}/>

      {/* {props.wpm}- {props.accuracy}
      back to game
      <Link href={'./game'}> back</Link> */}
      <div className="hero min-h-screen bg-base-200 ">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-6xl font-bold">Game Over!!</h1>
            <p className="py-6 text-5xl ">Here are your results-</p>
            <div className=" py-3">
              <p className="text-xl">Words per minute: {props.wpm} </p>
              <p className=" text-xl">Accuracy: {props.accuracy}% </p>
              <p className=" text-xl">Score: {(props.accuracy * 100 * props.wpm) / 10} </p>
            </div>
            <Link href={"./game"} className="btn btn-primary py-3">
              Play again
            </Link>
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;

