/* eslint-disable eqeqeq */
import React, { useContext, useEffect, useState } from 'react';

// create the actual context to provide to children
const CartContext = React.createContext();
const CartUpdateContext = React.createContext();

// each individual context exposes a custom hook which uses useContext
/* this is to avoid importing the individual contexts 
and calling useContext on them everytime we want to use them */

// provides access to the cart value which is an array of items the user has added to their cart
export function useCart() {
	return useContext(CartContext);
}

// provides access to the functions that are used to update the items in the cart
export function useCartUpdate() {
	return useContext(CartUpdateContext);
}

// helper function to get the user's cart from localStorage
function getLocalStorage() {
	return JSON.parse(localStorage.getItem('cart'));
}

// helper function to update the user's cart in localStorage
function setLocalStorage(value) {
	localStorage.setItem('cart', JSON.stringify(value));
}

// the actual CartProvider Wrapper which provides access to the cart and cartUpdate contexts to its children
export function CartProvider({ children }) {

	// if the user already has a cart in localStorage => load it
	const [cart, setCart] = useState(getLocalStorage() || []);

	// on first load => if the user doesn't have a cart in localStorage (first visit) => set empty cart
	useEffect(() => {
		if (!getLocalStorage())
			setLocalStorage([]);
	}, []);


	// add item to cart and update localStorage
	function addToCart(item) {
		let localCart = getLocalStorage();

		if (localCart.find(i => i.id == item.id))
			alert('item already in cart!');
		else {
			item.count = 1;
			localCart.push(item);
			setLocalStorage(localCart);
			setCart(localCart);
		}
	}

	// empty the cart and update localStorage
	function clearCart() {
		setLocalStorage([]);
		return setCart([]);
	}


	// given an itemId => increase the count of that item if it's in the user's cart
	function increaseItemCount(itemId) {
		let localCart = getLocalStorage();

		let index = localCart.findIndex(i => i.id == itemId);

		// if item is in the user's cart
		if (index > -1) {
			localCart[index].count = localCart[index].count + 1;
			setLocalStorage(localCart);
			setCart(localCart);
		}
	}

	function decreaseItemCount(itemId) {
		let localCart = getLocalStorage();

		let index = localCart.findIndex(i => i.id == itemId);

		if (index > -1) {

			// if item is the last one => remove from cart
			if (localCart[index].count == 1)
				localCart.splice(index, 1);
			else
				localCart[index].count = localCart[index].count - 1;

			setLocalStorage(localCart);
			setCart(localCart);
		}
	}


	return (
		<CartContext.Provider value={cart}>
			<CartUpdateContext.Provider value={{ addToCart, increaseItemCount, decreaseItemCount, clearCart }}>
				{children}
			</CartUpdateContext.Provider>
		</CartContext.Provider>
	)
}
