/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { motion as m } from "framer-motion";
import Navbar from "../components/navbar";

function Home(props) {
  let animationLength = 0.7;

  return (
    <div>
      <Navbar pageprops={props} />
      <m.div
        className="hero min-h-screen bg-base-200"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          delay: 0.1,
          default: { ease: "easeIn" },
          opacity: { duration: animationLength },
        }}
      >
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <p className="py-6">
              Welcome to typing test. This is a typing test app built with
              Next.js and nodejs
            </p>

            <div className=" flex flex-row items-center justify-center gap-4 flex-wrap">
              <div className="flex flex-row items-center justify-center gap-4 flex-wrap">
                <Link href={"./login"} className=" w-40 btn btn-accent">
                  Login
                </Link>
                <Link href={"./register"} className=" w-40 btn btn-accent">
                  register
                </Link>
              </div>
              <Link href={"./guest"} className=" w-40 btn btn-primary">
                Login as guest
              </Link>
            </div>
          </div>
        </div>
      </m.div>
    </div>
  );
}

export default Home;
