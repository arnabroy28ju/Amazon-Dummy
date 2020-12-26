import React from 'react';
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { useHistory } from 'react-router-dom';


function Subtotal() {
    const history = useHistory();
    const [{basket}] = useStateValue();
    return (
        <div className="subtotal">
            <CurrencyFormat renderText={(value) =>(
                <>
                    <p>
                        Subtotal ({basket?.length} items)
                        <strong>{value}</strong>
                    </p>
                    <small className="subtotal_gift">
                     <input type="checkbox"></input>
                     <label> This Order contains a gift. </label>
                    </small>
                </>

            )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rs."}
            />
            <button onClick={e=>history.push('/payment')}>Proceed To Checkout.</button>
        </div>
    )
}

export default Subtotal;
