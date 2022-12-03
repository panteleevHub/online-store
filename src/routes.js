import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import ProductList from './components/ProductsList';
import Product from './components/Product';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import E404 from './components/E404';

import {store} from './store';

const routes = [
	{
		path: '',
		redirect: {name: 'products'}
	},
	{
		name: 'products',
		path: '/products',
		component: ProductList,
	},
	{
		path: '/products/:id',
		component: Product
	},
	{
		path: '/cart',
		component: Cart
	},
  {
		path: '/checkout',
		component: Checkout,
    beforeEnter(to, from, next) {
      if (!store.getters['cart/cnt']) {
        next({name: 'products'});
        return;
      }
      next();
    }
	},
	{
		path: '*',
		component: E404
	}
];

export const router = new VueRouter({
	routes,
	mode: 'history'
});
