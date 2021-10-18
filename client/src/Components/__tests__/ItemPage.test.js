import { render, screen, cleanup } from "@testing-library/react";
import { CartProvider } from "../../CartContext";
import { BrowserRouter as Router } from "react-router-dom";
import ItemPage from "../ItemPage/ItemPage";

let item = {
	data: {
		id: 1,
		name: "Puma Caracal",
		desc: "Leather and eco-leather sports shoes",
		price: 29.99,
		color: "white",
		image: "https://s13emagst.akamaized.net/products/38719/38718364/images/res_77f1d4c73f927ead770892cf79fb537b.jpg",
		width: 150
	}
}

afterEach(cleanup);

test('should render ItemPage component', () => {
	render(
		<Router>
			<CartProvider>
				<ItemPage dataItemId={1} />
			</CartProvider>
		</Router>
	);

	const itemPageElement = screen.getByTestId('item-page');
	expect(itemPageElement).toBeInTheDocument();
});

test('ItemPage component should show the item with its details', async () => {

	// get item from server
	let { id, name, desc, price } = item.data;

	const { findByTestId } = render(
		<Router>
			<CartProvider>
				<ItemPage dataItemId={id} />
			</CartProvider>
		</Router>
	);


	const itemElement = await findByTestId(`${id}`);
	const itemNameElement = await findByTestId('item-page-name');
	const itemDescElement = await findByTestId('item-page-desc');
	const itemPriceElement = await findByTestId('item-page-price');

	expect(itemElement.getAttribute('data-item-id')).toEqual(`${id}`);
	expect(itemNameElement).toHaveTextContent(name);
	expect(itemDescElement).toHaveTextContent(desc);
	expect(itemPriceElement).toHaveTextContent(`$${price}`);
});