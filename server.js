const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

const itemsRoutes = require('./routes/items');
const orderRoutes = require('./routes/orders');

app.use(cors({ origin: "*" })); // fix cors issue
app.use(express.json()); // allow receiving json data in requests

app.use('/api/items', itemsRoutes); // all calls starting with the /api/items route are sent to the itemsRoutes router
app.use('/api/order', orderRoutes); // all calls starting with the /api/order route are sent to the orderRoutes router

// all other requests are invalid
app.use('*', (req, res) => res.status(400).json({ error: "Invalid request" }));

// start the server
const server = app.listen(port, () => console.log(`server is running on port ${port}`));
