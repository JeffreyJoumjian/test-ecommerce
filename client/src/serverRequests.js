// get all items from the server
async function getItemsFromServer() {
	try {
		let req = await fetch('http://localhost:3001/api/items');

		if (req.status === 200) {
			let data = (await req.json()).data;
			return data;
		}
	}
	catch (e) {
		console.log(e.message);
	}
}

// get specific item from the server using the item id
async function getItemDetailsFromServer(id) {
	try {
		let req = await fetch(`http://localhost:3001/api/items/${id}`);

		if (req.status === 200) {
			let data = (await req.json()).data;
			return data;
		}
	}
	catch (e) {
		console.log(e.message);
	}
}

async function submitOrder(cart) {
	try {
		let items = cart.map(item => ({ id: item.id, count: item.count }));

		let req = await fetch('http://localhost:3001/api/order', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ items })
		});

		return await req.json();
	}
	catch (e) {
		console.log(e.message);
	}
}

module.exports = {
	getItemsFromServer,
	getItemDetailsFromServer,
	submitOrder
};