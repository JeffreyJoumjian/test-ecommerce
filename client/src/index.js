// import './setupTests'; // only use for testing

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { CartProvider } from './CartContext';

import App from './App';
import Cart from './Components/Cart/Cart';
import ItemPage from './Components/ItemPage/ItemPage';

ReactDOM.render(
	<Router>
		<CartProvider>
			<Switch>
				<Route exact path="/" component={App} />
				<Route exact path="/cart" component={Cart} />
				<Route exact path="/item/:name/:id" render={
					(routeProps) => <ItemPage dataItemId={routeProps.match.params.id} />
				} />
				{/* ideally render a 404 page */}
				<Route path="*" component={App} />
			</Switch>
		</CartProvider>
	</Router>
	, document.getElementById('root'));
