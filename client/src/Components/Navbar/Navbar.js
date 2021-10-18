import { Link } from "react-router-dom";
import { useCart } from "../../CartContext";
import './Navbar.css';

export default function Navbar(props) {

	const cart = useCart();

	return (
		<nav className="navbar">
			<ul className="navbar-nav">
				<li className="nav-item"><Link to="/">Shop</Link></li>
				<li className="nav-item shopping-cart">
					<Link to="/cart">
						<i className="fas fa-shopping-cart"></i>
						{cart.length > 0 && <span className="notification">{cart.length}</span>}
					</Link>
				</li>
			</ul>
		</nav>
	)
}
