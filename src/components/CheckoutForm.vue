<template>
  <form @submit.prevent="onSubmit">
    <div class="progress">
      <div class="progress-bar" :style="validationProgress"></div>
    </div>
    <div>
      <CheckoutInput
        v-for="(item, index) in info"
        :key="index"
        :name="item.name"
        :pattern="item.pattern"
        :value="item.value"
        @input-handler="onInput($event, index)"
      />
    </div>
    <button class="btn" :class="buttonClass" :disabled="disabledButton">
      {{ buttonText }}
    </button>
  </form>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import CheckoutInput from './CheckoutInput'

	export default {
    computed: {
      ...mapGetters('formData', {
        info: 'info',
        order: 'order',
        isFormProcessing: 'isFormProcessing',
        validFields: 'validFields'
      }),

      ...mapGetters('cart', {
        productsInCart: 'products'
      }),

      buttonText() {
        return this.isFormProcessing ? 'Loading...' : 'Send Data';
      },

      buttonClass() {
        return this.isFormProcessing ? 'btn-default' : 'btn-primary';
      },

      disabledButton() {
        return this.info.some(({isValid}) => !isValid) || this.isFormProcessing;
      },

      validationProgress() {
        const progress = 100 / this.info.length * this.validFields.length;
        return `width: ${progress}%`;
      }
    },

    methods: {
      ...mapActions('formData', {
        submitForm: 'submitForm',
        updateData: 'updateData'
      }),

      onInput({value, isValid}, index) {
        this.updateData({
          index,
          value,
          isValid
        });
      },

      onSubmit() {
        this.submitForm({
          ...this.order,
          products: this.productsInCart
        });
      }
    },

    components: {
      CheckoutInput,
    },
  }
</script>
