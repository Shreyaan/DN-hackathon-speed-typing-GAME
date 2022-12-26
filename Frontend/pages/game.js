import React, { useState, useEffect, useRef, use } from "react";
import Router from "next/router";

import useBearerToken from "../lib/useBearerToken";
import { getBearerToken } from "../lib/beraerTokenFn";

import quotes from "../lib/quotes";
import { gameLogic } from "../lib/gameLogic";
import Navbar from "../components/navbar";

export default function Game(props) {
  const [bearerToken, setBearerToken] = useState(getBearerToken());

  //use effect to push login page if bearer token is not set

  useEffect(() => {
    console.log(1223, bearerToken, props.bearerToken);
    setTimeout(() => {
      if (bearerToken === "" && props.bearerToken === "") {
        Router.push("/login");
      }
    }, 500);
  }, [bearerToken, props.bearerToken]);

  const duration = 60;
  let length_of_string = 400;

  const [typedText, setTypedText] = useState("");
  const [referenceText, setReferenceText] = useState("");
  const [timeLeft, setTimeLeft] = useState(duration * 10);
  const intervalId = useRef(null);
  const startTime = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  //set props.wpm to 0 when the component mounts

  useEffect(() => {
    props.setWpm(0);
    props.setAccuracy(0);
  }, []);

  // Set the reference text when the component mounts
  useEffect(() => {
    let referenceText = "";
    while (referenceText.length < length_of_string) {
      const quote = quotes[Math.floor(Math.random() * quotes.length)];
      referenceText += quote.quote;
    }
    setReferenceText(referenceText.slice(0, length_of_string));
  }, [length_of_string]);

  useEffect(() => {
    gameLogic(
      timeLeft,
      typedText,
      setIsPlaying,
      startTime,
      intervalId,
      setTimeLeft,
      isPlaying,
      props.setWpm,
      duration,
      props.setAccuracy,
      referenceText
    );
    return () => clearInterval(intervalId.current);
  }, [timeLeft, typedText, isPlaying, referenceText, duration]);

  const handleInputChange = (event) => {
    if (typedText.length < referenceText.length && timeLeft > 0.1) {
      setTypedText(event.target.value);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Backspace") {
      event.preventDefault();
    }
  };

  const timeLeftFormated = timeLeft <= 0 ? "0.0" : (timeLeft / 10).toFixed(1);

  function charStyle(index) {
    return index === typedText.length ? { boxShadow: "0 0 0 3px grey" } : {};
  }

  function classNameLogic(index, char) {
    return index < typedText.length
      ? char === typedText[index]
        ? "correct"
        : "incorrect"
      : "";
  }

  function getTimeLeftColor(timeLeftFormated) {
    if (timeLeftFormated > 30) {
      return "green";
    } else if (timeLeftFormated <= 30 && timeLeftFormated > 20) {
      return "orange";
    } else if (timeLeftFormated <= 20 && timeLeftFormated > 10) {
      return "yellow";
    } else {
      return "red";
    }
  }

  return (
    <div>
       <Navbar authroute={true} pageprops={props}/>
      
      <div
        className=" flex justify-center  text-2xl "
        style={{ color: getTimeLeftColor(timeLeftFormated) }}
      >
        Time left: {timeLeftFormated}
      </div>
      <div className="reference-text ">
        {referenceText.split("").map((char, index) => (
          <span
            key={index}
            className={" " + classNameLogic(index, char)}
            style={charStyle(index)}
          >
            {char === " " ? "\u00a0" : char}
          </span>
        ))}
      </div>
      <div className=" flex justify-center">
        <input
          value={typedText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={timeLeft < 0.1}
          className=" w-[91vw]  text-4xl  border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent mx-auto"
          placeholder="Start typing to start game..."
        />
      </div>
    </div>
  );
}
