import { useCartUpdate } from "../../CartContext";

export default function CartItem(props) {
	const { id, name, price, image, count } = props.item;

	const { increaseItemCount, decreaseItemCount } = useCartUpdate();

	function increaseCount() {
		increaseItemCount(id);
	}

	function decreaseCount() {
		decreaseItemCount(id);
	}

	return (
		<div className="cart-item" data-item-id={id}>
			<img src={image} alt={image} className="cart-item-img" />
			<div className="cart-item-details">
				<h2 className="cart-item-name">{count} x {name}</h2>
				<div className="cart-item-actions">
					<button className="cart-item-action" id="cart-item-remove" onClick={decreaseCount}>
						<i className="fas fa-minus"></i>
					</button>
					<button className="cart-item-action" id="cart-item-add" onClick={increaseCount}>
						<i className="fas fa-plus"></i>
					</button>
				</div>
			</div>

			<h2 className="cart-item-price">{`$${(count * parseFloat(price)).toFixed(2)}`}</h2>
		</div>
	)
}
