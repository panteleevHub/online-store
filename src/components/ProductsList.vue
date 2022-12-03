<template>
	<div>
		<h1>Products</h1>
		<div class="row">
			<div class="col col-sm-4" v-for="product in products">
			  <router-link tag="h3" :to="createPath(product.id_product)">
				    <a>{{ product.title }}</a>
				</router-link>
				<div>{{ product.price }}</div>
				<button
            v-if="!isInCart(product.id_product)"
						@click="addToCart(product.id_product)"
						class="btn btn-primary"
						>
					Add to cart
				</button>
				<button
            v-else
						@click="removeFromCart(product.id_product)"
						class="btn btn-warning"
				>
					Remove from cart
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';

	export default {
		computed: {
			...mapGetters('products', {
				products: 'items'
			}),

			...mapGetters('cart', {
				productsInCart: 'products'
			}),
		},

		methods: {
			...mapActions('cart', {
				addToCart: 'add',
				removeFromCart: 'remove'
			}),

      isInCart(productId) {
        return this.productsInCart.indexOf(productId) !== -1;
      },

      createPath(productId) {
        return `/products/${productId}`;
      }
		},
	}
</script>

<style scoped>
	.row{
		padding-left: 15px;
	}
</style>
