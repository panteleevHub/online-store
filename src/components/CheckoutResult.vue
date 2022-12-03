<template>
  <div>
    <table class="table table-bordered">
      <tbody>
        <tr v-for="item in info">
          <td>{{ item.name }}</td>
          <td>{{ item.value }}</td>
        </tr>
        <tr v-for="product in products">
          <td>Product</td>
          <td>{{ product.title }}</td>
        </tr>
      </tbody>
    </table>
    <router-link
      class="btn btn-success"
      :to="{name: 'products'}"
    >
      Back to main page
    </router-link>
    <router-link
      class="btn btn-danger"
      to="*"
    >
      Cancel the order
    </router-link>
  </div>

</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    beforeDestroy() {
      this.clearForm();
      this.clearCart();
    },

    computed: {
      ...mapGetters('formData', {
        info: 'info'
      }),

      ...mapGetters('products', {
				productsAll: 'items'
			}),

			...mapGetters('cart', {
				productsInCart: 'products'
			}),

			products(){
				return this.productsAll.filter((elem) => {
					return this.productsInCart.indexOf(elem.id_product) !== -1;
				});
			},
    },

    methods: {
      ...mapActions('formData', {
        clearForm: 'clearForm'
      }),

      ...mapActions('cart', {
        clearCart: 'clear'
      })
    }
  }
</script>
