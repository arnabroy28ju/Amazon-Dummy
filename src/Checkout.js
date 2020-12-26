import React from 'react';
import "./Checkout.css";
import { useStateValue } from './StateProvider';
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";

function Checkout() {
    const [{basket, user},dispatch] = useStateValue();
    return (
        <div className="checkout">
            <div className="checkout_left">
                <img className="checkout_ad" src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Camera/AmzSpl/1500x200_dslrs_cameras_point__shoot_DSLRS_and_mirrorless_cameras.jpg" alt="adimage" />
                <div>
                <h3>{user?.email}</h3>
                <h2 className="checkout_title">Your Shopping Basket</h2>
                {basket.map(item =>(
                    
                    <CheckoutProduct 
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                    />
                
                   
                ))}
                
            </div>
            </div>
            
            <div className="checkout_right">
            <Subtotal />
            </div>
        </div>
    )
}

export default Checkout;
