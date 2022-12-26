import React, { useState } from "react";
import Link from "next/link";
import { logout } from "../lib/logout";

function Navbar(props) {
  const Logout = logout(props.pageprops);
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
         {props.leaderbaord ? ( <Link
            className="btn btn-outline  normal-case text-xl"
            href={"./"}
          >
            home
          </Link>) :( <Link
            className="btn btn-outline  normal-case text-xl"
            href={"./leaderboard"}
          >
            LeaderBoard
          </Link>) }
        </div>
        {props.authroute && (
          <div className="flex-none">
            <Link  href={"./userScore"} className="btn btn-outline mx-1">
              User scores
            </Link>
            <button onClick={Logout} className="btn btn-outline">
              LogOut
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
