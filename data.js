// ideally store this in a database
const orders = [];

const items = [{
	"id": 1,
	"name": "Puma Caracal",
	"desc": "Leather and eco-leather sports shoes",
	"price": 29.99,
	"color": "white",
	"image": "https://s13emagst.akamaized.net/products/38719/38718364/images/res_77f1d4c73f927ead770892cf79fb537b.jpg",
	"width": 150
},
{
	"id": 2,
	"name": "Adidas Galaxy 5",
	"desc": "Sneakers made for everyday wear",
	"price": 65.99,
	"color": "red",
	"image": "https://s13emagst.akamaized.net/products/34693/34692633/images/res_4f10945a19b0748b516639a69677901a.jpg?width=450&height=450&hash=5B0BACEE89919DB14962D3E45CE3EC94",
	"width": 150,
	"height": 170
},
{
	"id": 3,
	"name": "Kondition Classic",
	"desc": "Classic lace-up sneakers",
	"price": 7.99,
	"color": "black",
	"image": "https://s13emagst.akamaized.net/products/10618/10617371/images/res_f111bfa15068d1419eaf6d9852080d18.jpg?width=450&height=450&hash=DF44FF371663A97A575DCAB06BFD79F6",
	"width": 150,
	"height": 150
},
{
	"id": 4,
	"name": "Nike Court Vision",
	"desc": "Leather and eco-leather sneakers",
	"price": 63.99,
	"color": "white",
	"image": "https://s13emagst.akamaized.net/products/30120/30119877/images/res_aa17a0cf7906a1efff55c9035f69a988.jpg?width=450&height=450&hash=18CEEC31BE4EC559E9A388FFD3CE2143",
	"width": 150
},
{
	"id": 5,
	"name": "Nike Air Max Bolt",
	"desc": "Sport shoes with mesh inserts",
	"price": 91.99,
	"color": "gray",
	"image": "https://s13emagst.akamaized.net/products/38728/38727672/images/res_30c1b9f8b36b62351a29e9a9656594c0.jpg?width=450&height=450&hash=C2FF530B8E8CDD8B8D7115B893C8F98D",
	"width": 150
},
{
	"id": 6,
	"name": "Sketchers Dynamight",
	"desc": "Sport shoes with Dynamight mesh inserts",
	"price": 49.99,
	"color": "navy blue",
	"image": "https://s13emagst.akamaized.net/products/39506/39505460/images/res_b39ef2d426868e1d1fd91acad84caa95.jpg?width=450&height=450&hash=86E2A18DD4BAE3657ABE206C7C7EE56F",
	"width": 150,
	"flip": true
},
{
	"id": 7,
	"name": "Gant Glove",
	"desc": "Gant signature leather sneakers",
	"price": 109.99,
	"color": "Cinnamon",
	"image": "https://s13emagst.akamaized.net/products/38987/38986210/images/res_f5f6801357b5c2592bcd3b45cfa81824.jpg?width=450&height=450&hash=0116B5E4CFE47BFF7D4701CB8DE48FA8",
	"width": 150
},
{
	"id": 8,
	"name": "US Polo Assn.",
	"desc": "Sport shoes with eco-leather inserts Sam",
	"price": 39.99,
	"color": "Dark Gray",
	"image": "https://s13emagst.akamaized.net/products/34479/34478846/images/res_a39e4db82e32255751d77dbb61d6cb43.jpg?width=450&height=450&hash=138650C9F4BD7A80BA2DEC9B3AE5AE72",
	"width": 150
}
];


module.exports = {
	orders, items
}