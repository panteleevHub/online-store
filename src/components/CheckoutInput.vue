<template>
  <div class="form-group">
    <label>
      {{ name }}
      <span
        class="fa"
        :class="iconClass"
        v-show="showIcon"
      ></span>
    </label>
    <input
      type="text"
      class="form-control"
      @input="onInput"
      :value="value">
  </div>
</template>

<script>
  export default {
    props: {
      name: String,
      pattern: RegExp,
      value: String,
    },

    data() {
      return {
        showIcon: this.value !== ''
      }
    },

    methods: {
      onInput(evt) {
        this.showIcon = true;

        this.$emit('input-handler', {
          value: evt.target.value,
          isValid: this.pattern.test(evt.target.value)
        });
      }
    },

    computed: {
      iconClass() {
        return !this.pattern.test(this.value) ?
          'fa-exclamation-circle text-danger' :
          'fa-check-circle text-success';
      }
    }
  }
</script>
