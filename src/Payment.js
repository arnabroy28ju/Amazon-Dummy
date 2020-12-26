import React, { useEffect, useState } from 'react';
import CheckoutProduct from './CheckoutProduct';
import "./Payment.css";
import axios from "./axios";
import { useStateValue } from './StateProvider';
import {Link, useHistory} from "react-router-dom";
import {CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import {db} from "./firebase";

function Payment() {
    const [{basket, user}, dispatch] = useStateValue();
    const history = useHistory();
    const stripe = useStripe();
    const elements = useElements();
    
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() =>{
        //generate the stripe user secret
        const getClientSecret = async () =>{
            const response = await axios({
                method : 'post',
                url : `/payments/create?total= ${getBasketTotal(basket)*100}`
            })
            setClientSecret(response.data.clientSecret);
        }
        getClientSecret();
    },[basket]);
    console.log('The Client Secret : ', clientSecret)
    
    const handleSubmit=async (event) =>{
        event.preventDefault();
        setProcessing(true);
        const payload= await stripe.confirmCardPayment(clientSecret,{
            payment_method : {
                card : elements.getElement(CardElement)
            }
        }).then(({ paymentIntent })=>{
            // confirmation
            

            db.collection('users').doc(user?.id).collection('orders').doc(paymentIntent.id).set({
                basket : basket,
                amount : paymentIntent.amount,
                created : paymentIntent.created
            });

            setSucceeded(true);
            setError(null);
            setProcessing(true);

            dispatch({
                type : 'EMPTY_BASKET'
            })

            history.replace('/orders');
        })
    }

    const handleChange = event =>{
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        
        <div className="payment">
            <div className="payment_container">
                <h1>
                    Checkout(<Link to="/checkout">{basket?.length} items</Link>)
                </h1>
                {/* Payment Section- dilevery address*/}
                <div className="payment_section">
                  <div className="payment_title">
                      <h3>Dilevery Address</h3>
                  </div>
                  <div className="payment_address">
                      <p>{user?.email}</p>
                      <p>Nagrota</p>
                      <p>Jammu</p>
                  </div>
                </div>
                {/* Payment Section - reviewing items */}
                <div className="payment_section">
                    <div className="payment_title">
                        <h3> Review items and dilevery </h3>
                    </div>
                    <div className="payment_items">
                      {basket.map(item =>(
                          <CheckoutProduct 
                              id={item.id}
                              title={item.title}
                              image={item.image}
                              price={item.price}
                              rating={item.rating}
                          />
                      ))}
                    </div>
                    </div>
                {/* Payment Section - payment method */}
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment_details">
                        {/* Stripe Magic*/ }
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className="payment_priceContainer">
                              <CurrencyFormat 
                                  renderText={(value)=>(
                                      <>
                                         <h3>Order Total: {value}</h3> 
                                      </>
                                  )}
                                  decimalScale={2}
                                  value={getBasketTotal(basket)}
                                  displayType={"text"}
                                  thousandSeperator={true}
                                  prefix={"Rs."}
                              />
                              <button disabled={processing || disabled || succeeded}>
                                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                              </button>
                            </div>
                            {error &&<div>{error}</div>}
                        </form>
                    </div>
                    </div>
            </div>
        </div>
    )
}

export default Payment;
