/* eslint-disable eqeqeq */
import { useEffect, useState } from 'react';
import { useCart, useCartUpdate } from './CartContext';
import { getItemsFromServer } from './serverRequests';

import './App.css';

import Item from './Components/Item/Item';
import Navbar from './Components/Navbar/Navbar';

function App() {

	const cart = useCart();
	const { addToCart } = useCartUpdate();

	const [items, setItems] = useState([]);

	function onClickAddToCart(e) {
		let item = e.target.parentNode;

		let savedItem = {
			id: item.getAttribute('data-item-id'), // change this to get id
			name: item.querySelector('.item-name').innerText.trim(),
			desc: item.querySelector('.item-desc').innerText.trim(),
			price: parseFloat(item.querySelector('.item-price').innerText.trim().replace('$', '')),
			image: item.querySelector('.item-img').src,
			color: item.querySelector('.color.selected').innerText.trim(),
		}

		addToCart(savedItem);
	}



	// loop over the items received from the server and create Item elements
	function generateItems() {
		return items.map((item, i) => <Item key={i}
			item={item}
			inCart={cart.find(cartItem => cartItem.id == item.id)}
			onClickAddToCart={onClickAddToCart}
		/>);
	}

	// when the component first loads/mounts
	useEffect(() => {
		// get the items from the server and update the items state
		async function loadItems() {
			let data = await getItemsFromServer();
			setItems(data);
		}
		loadItems();
	}, [])

	return (
		<div className="App">
			<Navbar />
			<div className="items-container">
				{items && generateItems()}
			</div>
		</div>
	);
}

export default App;
