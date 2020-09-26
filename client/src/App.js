import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";
import { Switch, Route } from "react-router-dom";

// Components
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

// Set up ApolloClient
// Fixed Network error: Failed To Fetch
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
  cors: corsOptions
});

// get Cookie
const cookies = new Cookies();
const getCookie = cookies.get("userId");

//decoded
  // if(getCookie) {
  //   const decoded = jwtDecode(getCookie);
  //   console.log(decoded);
  // }
 

function App() {
  return (
    <div>
    <ApolloProvider client={client}>
    <Navbar />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/" component={Signup} />
      </Switch>
    </ApolloProvider>
    </div>
  );
}

export default App;
