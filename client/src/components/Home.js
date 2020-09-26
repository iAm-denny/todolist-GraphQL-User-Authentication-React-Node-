import React from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import ToDoList from "./ToDoList";

  // get cookie
  const cookies = new Cookies();
  const getCookie = cookies.get("userId");

function Home() {
  return (
    <div>
      {getCookie ? (
        <ToDoList />
       
      ) : (
        <div>
          Please Log in First <Link to="login">Login</Link>
        </div>
      )}
      
    </div>
  );
}

export default Home;
