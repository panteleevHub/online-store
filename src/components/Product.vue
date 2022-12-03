<template>
	<div>
		<h1>{{ product.title }}</h1>
		<router-link :to="{name: 'products'}">Back to products</router-link>
		<hr>
		<div class="alert alert-success">
			{{ product.price }}
		</div>
		<button
      v-if="!isInCart"
      @click="addToCart(product.id_product)"
      class="btn btn-primary"
    >
      Add to cart
    </button>
    <button v-else
      @click="removeFromCart(product.id_product)"
      class="btn btn-warning"
    >
      Remove from cart
    </button>
	</div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

	export default {
		computed: {
      ...mapGetters('cart', {
				productsInCart: 'products'
			}),

			id(){
				return this.$route.params.id;
			},

			product(){
				return this.$store.getters['products/item'](this.id);
			},

      isInCart() {
        return this.productsInCart.indexOf(this.product.id_product) !== -1;
      }
		},

    methods: {
			...mapActions('cart', {
				addToCart: 'add',
				removeFromCart: 'remove'
			})
		},
	}
</script>
