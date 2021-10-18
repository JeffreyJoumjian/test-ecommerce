const { items: dbItems } = require('../data');

const itemController = {
	getAllItems: (req, res) => {
		res.status(200).json({ data: dbItems });
	},

	getItemById: (req, res) => {
		let itemID = req.params.id;

		let item = dbItems.find(item => item.id == itemID);

		if (!item)
			return res.status(404).json({ error: "The item with the given ID was not found" });

		return res.status(200).json({ data: item });
	}
};

module.exports = itemController;