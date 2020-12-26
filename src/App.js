import React, { useEffect } from "react";
import './App.css';
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from  "./Payment";
import Orders from './Orders'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {auth} from './firebase';
import { useStateValue } from "./StateProvider";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";

const promise = loadStripe('pk_test_51Hw7zyEcSacaN6BlePPn8SOK8Zzof4gSqTgjnC71uqmmoBdGOYow69HqiHAQUuhRMuN7uZd473COWBr7iZE2vUgF00JtDhGUc6')

function App() {
   
  const [{}, dispatch] = useStateValue();
  useEffect(() =>{
    //only run when the app component loads.
    auth.onAuthStateChanged(authUser =>{
      console.log("The USER is ", authUser);

      if(authUser){
        //user just logged in or was logged in
        dispatch({
          type : 'SET_USER',
          user : authUser
        })
      }else{
        //the user logged out
        dispatch({
          type : 'SET_USER',
          user : null
        })
      }
    })
  }, [])
  return (
    <Router>
      <div className="app">
       <Switch>
       <Route path="/login">
         <Login />
       </Route>
       <Route path="/checkout">
       <Header/>
         <Checkout />
       </Route>
       <Route path="/payment">
         <Header/>
         <Elements stripe={promise}>
         <Payment />
         </Elements>
       </Route>
       <Route path="/orders">
          <Header />
          <Orders />
       </Route>

       <Route path="/">
        <Header/>
         <Home />
       </Route>
       </Switch>
    </div>
    </Router>
  );
}

export default App;
