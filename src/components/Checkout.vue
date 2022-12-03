<template>
	<div>
		<h1>{{ title }}</h1>
		<hr>
    <CheckoutForm v-if="!isFormSubmited" />
    <CheckoutResult v-else />
	</div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import CheckoutForm from './CheckoutForm';
  import CheckoutResult from './CheckoutResult';

  export default {
    computed: {
      ...mapGetters('formData', {
        isFormSubmited: 'isFormSubmited'
      }),

      title() {
        return this.isFormSubmited ? 'Order accepted' : 'Order now';
      }
    },

    components: {
      CheckoutForm,
      CheckoutResult
    }
  }
</script>
