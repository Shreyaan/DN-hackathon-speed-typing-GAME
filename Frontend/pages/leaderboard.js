import React, { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/navbar";
const API_URL = "https://backend-2vl3.onrender.com/api/v1";

function Leaderboard(props) {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const config = {
      headers: { authorization: `Bearer ${props.bearerToken}` },
    };

    axios
      .get(`${API_URL}/score/get/all`, config)
      .then((res) => {
        setLeaderboardData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="">
        <Navbar leaderbaord={true} pageprops={props}/>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content text-center">
        <div className="">
          <h1 className="text-5xl font-bold mb-4">LeaderBoard</h1>
          <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>WPM</th>
                <th>Accuracy</th>
                <th>Total Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((entry, index) => (
                <tr key={entry.id}>
                  <th>{index + 1}</th>
                  <td>{entry.userName}</td> 
                  <td>{entry.wpm}</td>
                  <td>{entry.accuracy}%</td>
                  <td>{entry.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
          </div>
        </div>
    </div>
    
  );
}

export default Leaderboard;
