import React from 'react';
import "./Home.css";
import Product from "./Product";

function Home() {
    return (
        <div className="home">
            <div className="home_container">
                <img className="home_image" src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/AmazonPay/Rajeshwari/Oct/GW/DesktopHero_1500x600._CB402740210_.jpg" alt="amazonBackground"/>

                <div className="home_row">
                    {/* Product */}
                    <Product  id="12132413" title="Samsung Galaxy S10 (Prism Blue, 8GB RAM, 128GB Storage)" price={71000} image="https://images-na.ssl-images-amazon.com/images/I/61BAVcOnyiL._SL1500_.jpg" rating={5} />
                    {/* Product */}
                    <Product id="12132451" title="Infinity (JBL) Fuze Pint Deep Bass Dual EQ Bluetooth 5.0 Wireless Portable Speaker (Charcoal Black)"price={799} image="https://m.media-amazon.com/images/I/71K6mroOBJL._AC_UY327_FMwebp_QL65_.jpg" rating={4} />
                </div>
                <div className="home_row">
                    {/* Product */}
                    
                    <Product id="12132464" title="CLAW SM50 Professional Studio Monitoring DJ Headphones with 2 detachable cables (2.8m Coiled Cable & 1.2m Straight Cable with Mic and In-line Controls)" price={2990} image="https://images-na.ssl-images-amazon.com/images/I/61wRoNoZ1OL._SL1000_.jpg" rating={3}/>
                    {/* Product */}
                    <Product id="12132478" title="Akai Professional MPK mini MK3 – 25 Key USB MIDI Keyboard Controller With 8 Backlit Drum Pads, 8 Knobs and Music Production Software included" price={11340} image="https://images-na.ssl-images-amazon.com/images/I/810es8pM0-L._SL1500_.jpg" rating={4}/>
                    {/* Product */}
                    <Product id="12132454" title="YAMAHA FS80C NATURAL CONCERT CUTAWAY GUITAR" price={7490} image="https://images-na.ssl-images-amazon.com/images/I/71XfZ5MJQoL._SL1500_.jpg" rating={5} />
                </div>
                <div className="home_row">
                    {/* Product */}
                    <Product id="1213281" title="BLUEWUD Mallium Engineered Wood Study Table, Laptop, Computer Table Desk for Home & Office (Wenge) Standard" price={6299} image="https://images-na.ssl-images-amazon.com/images/I/71l%2B3ocDZ8L._SL1500_.jpg"  rating={3}/>
                </div>
            </div>
        </div>
    )
}

export default Home;
