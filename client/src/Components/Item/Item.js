import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Item.css';

export default function Item(props) {
	const { inCart } = props;
	const { id, name, desc, price, image, width = 200, height = 200, flip = false } = props.item;

	const [, setColor] = useState();

	const history = useHistory();

	// switch between colors => add also switch displayed image
	function onClickColorHandler(e) {
		let colors = [...e.target.parentNode.querySelectorAll('.color-container .color')];
		colors.forEach(color => color.classList.remove('selected'));
		e.target.classList.add('selected');
		setColor(e.target.id);
	}


	function onClickAddToCartHandler(e) {
		props.onClickAddToCart(e);
	}

	function onClickItemHandler(e) {
		if (e.target.classList.contains('item')) {
			let path = `${e.target.querySelector('.item-name').innerText.trim().replaceAll(' ', '-')}/${id}`;
			history.push(`/item/${path}`);
		}
	}

	return (
		<div className="item" data-item-id={id} onClick={onClickItemHandler}>

			<button className={`item-add ${inCart ? "added disabled" : ""}`}
				onClick={onClickAddToCartHandler} disabled={inCart}>
				{!inCart && <i className="fas fa-cart-plus fa-sm"></i>}
				{inCart && <i className="fas fa-check fa-sm anim-rotate-in"></i>}
			</button>

			<img src={image} alt={image} width={width} height={height} className={`item-img${flip ? " flip" : ""}`} />

			<h2 className="item-name">{name}</h2>

			<p className="item-desc">{desc}</p>

			<div className="color-container">
				<div className="color selected" id="black" onClick={onClickColorHandler} />
				<div className="color" id="white" onClick={onClickColorHandler} />
			</div>

			<h2 className="item-price">{`$${price}`}</h2>

		</div>
	)
}
