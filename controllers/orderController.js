const { items: dbItems, orders } = require('../data');

const orderController = {

	createOrder: function (req, res) {
		// get items ordered by the cliet => {id, count}
		let items = req.body.items;

		// orderItem objects {itemData, count} => could use a class
		let orderItems = [];

		let total = 0; // the total amount of the order

		// loop over the received order items and return a new object with the item details and count
		for (let i = 0; i < items.length; i++) {
			// search for the item in the database
			let data = dbItems.find(dbItem => dbItem.id == items[i].id);

			// if the item doesn't exist => return invalid order
			if (!data)
				return res.status(404).json({ error: "The item with the given ID was not found" });

			// orderItem object containing the data of the item and it's ordered count
			let orderItem = {
				data,
				count: items[i].count
			};

			// add item(s) cost to total
			total += orderItem.count * parseFloat(orderItem.data.price);

			// add the item to orderedItems so far
			orderItems.push(orderItem);
		}

		// create a new unique order with the total price and ordered items
		let newOrder = { id: orders.length + 1, data: orderItems, total: parseFloat(total.toFixed(2)) }

		// save the order in the database
		orders.push(newOrder);

		console.log(orders);

		// return the order object to the client if needed for displaying
		return res.status(201).json({ data: newOrder });
	}
}

module.exports = orderController;