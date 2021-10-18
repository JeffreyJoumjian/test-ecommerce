/* eslint-disable eqeqeq */
import { useEffect, useState } from 'react';
import { useCart, useCartUpdate } from '../../CartContext';
import { getItemDetailsFromServer } from '../../serverRequests';

import './ItemPage.css';

import Navbar from '../Navbar/Navbar';


export default function ItemPage(props) {

	const { dataItemId } = props;

	const [item, setItem] = useState(null);
	const [inCart, setInCart] = useState(false);
	const [, setColor] = useState();

	const cart = useCart();
	const { addToCart } = useCartUpdate();

	// switch between colors => add also switch displayed image
	function onClickColorHandler(e) {
		let colors = [...e.target.parentNode.querySelectorAll('.color-container .color')];
		colors.forEach(color => color.classList.remove('selected'));
		e.target.classList.add('selected');
		setColor(e.target.id);
	}


	function onClickAddToCart(e) {
		const { id, name, desc, price, image } = item;
		let savedItem = {
			id, name, desc, price, image,
			color: document.querySelector('.color.selected').innerText.trim(),
		}
		addToCart(savedItem);
		setInCart(true);
	}

	// check if the item is in the cart => to disable add button
	function checkInCart(item) {
		return cart.find(localItem => localItem.id == item.id);
	}

	// when the component loads/mounts for the first time 
	// => get item details from the server and save it in state
	// => check if the item is already in the user's cart
	useEffect(() => {
		let isMounted = true; // used to prevent updates to the state in tests after the component has unmounted
		async function loadItem() {
			let item = await getItemDetailsFromServer(dataItemId);
			if (isMounted) {
				setItem(item);
				setInCart(checkInCart(item));
			}
		}
		loadItem();
		return () => { isMounted = false; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


	return (
		<div className="App" data-testid="item-page">
			<Navbar />
			{item &&
				<div className="item-page-container" data-item-id={item.id} data-testid={item.id}>

					<h1 className="item-page-name" data-testid="item-page-name">{item.name}</h1>
					<p className="item-page-desc" data-testid="item-page-desc">{item.desc}</p>

					<img className={`item-page-img${item.flip ? " flip" : ""}`}
						src={item.image} alt={item.image}
						data-testid="item-page-img"
					/>

					<div className="color-container">
						<div className="color selected" id="black" onClick={onClickColorHandler} />
						<div className="color" id="white" onClick={onClickColorHandler} />
					</div>

					<h1 className="item-page-price" data-testid="item-page-price">{`$${item.price}`}</h1>

					<button className={`btn-submit${inCart ? " disabled" : ""}`} id="btn-add" onClick={onClickAddToCart} disabled={inCart}>
						{inCart ? <i className="fas fa-check fa-sm anim-rotate-in"></i> : "Add To Cart"}
					</button>

				</div>
			}
		</div>
	)
}
