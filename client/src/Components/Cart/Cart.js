import { useState } from "react";
import { useCart, useCartUpdate } from "../../CartContext";
import { submitOrder } from "../../serverRequests";

import './Cart.css';

import Navbar from "../Navbar/Navbar";
import CartItem from './CartItem'

export default function Cart() {

	const [orderStatus, setOrderStatus] = useState({ status: "awaiting", message: "", error: "", data: "" });

	const cart = useCart();
	const { clearCart } = useCartUpdate();

	async function onClickOrderHandler(e) {

		// disable button
		e.target.classList.add("disabled");
		e.target.disabled = true;

		// send order to server
		let res = await submitOrder(cart);

		// update order status
		setOrderStatus("pending");

		// if successfully ordered
		if (res?.data) {
			// set status to successful
			setOrderStatus({ status: "successful", message: "Your order has been successfully placed!", data: res.data });

			// clear cart
			clearCart();
		}
		else {
			// set status to failed
			setOrderStatus({ status: "failed", message: "Something went wrong with your order.", error: res.error });
		}
	}

	// calculate the total price on the frontend => note not sent to the server
	function calculateTotal() {
		return cart.reduce((p, c) => parseFloat(p) + parseFloat(c.price) * c.count, 0).toFixed(2);
	}

	return (
		<div className="App">
			<Navbar />
			<div className="cart-container">

				{/* if order not submitted */}
				{(orderStatus.status !== "successful") &&
					<>
						<h1>Your Cart</h1>
						{(!cart || cart.length === 0) && <h2 style={{ marginTop: '50px' }}>Your cart is empty</h2>}

						{cart && cart.length > 0 &&
							<>
								<div className="cart-list">
									{cart.map((item, i) => <CartItem key={i} item={item} />)}
								</div>
								<p id="cart-total">{`$${calculateTotal()}`}</p>


								<button
									id="btn-order"
									className={`btn-submit${orderStatus.status === "pending" ? "disabled" : ""}`}
									onClick={onClickOrderHandler}
									disabled={orderStatus.status === "pending"}
								>
									Order Now
								</button>
								{orderStatus.status === "failed" && <p className="error">{orderStatus.message}</p>}
							</>
						}
					</>
				}

				{/* if order is successful */}
				{orderStatus.status === "successful" &&
					<>
						<h1>{orderStatus.message}</h1>
						<i style={{ marginTop: '50px' }} className="fas fa-check fa-10x anim-rotate-in success"></i>
					</>
				}


			</div>
		</div>
	)
}
