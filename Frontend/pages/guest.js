import Router from "next/router";
import React, { useEffect } from "react";

function Guest(props) {
  useEffect(() => {
   //set dummy bearer token and push to game page
    props.setBearerToken("dummy");
    Router.push("/game");
  }, [props.bearerToken]);

  return <div>guest</div>;
}

export default Guest;
