export default {
	namespaced: true,

	state: {
		info: [
      {
        name: 'Name',
        value: '',
        pattern: /^[a-zA-Z ]{2,30}$/,
        isValid: false
      },
      {
        name: 'Phone',
        value: '',
        pattern: /^[0-9]{7,14}$/,
        isValid: false
      },
      {
        name: 'Email',
        value: '',
        pattern: /.+/,
        isValid: false
      },
      {
        name: 'Delivery address',
        value: '',
        pattern: /.+/,
        isValid: false
      },
      {
        name: 'Promo Code',
        value: '',
        pattern: /.+/,
        isValid: false
      }
    ],
    isFormProcessing: false,
    isFormSubmited: false
	},

  getters: {
    info(state) {
      return state.info.map((item) => ({
        ...item,
        isValid: item.pattern.test(item.value)
      }));
    },

    order(state) {
      return {
        name: state.info[0].value,
        phone: state.info[1].value,
        email: state.info[2].value,
        address: state.info[3].value,
        promoCode: state.info[4].value
      };
    },

    validFields(state, getters) {
      return getters.info.filter(({isValid}) => isValid);
    },

    name(state) {
      return state.info[0].value;
    },

    isFormSubmited(state) {
      return state.isFormSubmited;
    },

    isFormProcessing(state) {
      return state.isFormProcessing;
    }
  },

  mutations: {
    updateData(state, {index, value, isValid}) {
      state.info[index].value = value;
      state.info[index].isValid = isValid;
    },

    formProcessing(state) {
      state.isFormProcessing = true;
    },

    submitForm(state) {
      state.isFormSubmited = true;
      state.isFormProcessing = false;
    },

    clearForm(state) {
      state.isFormSubmited = false;

      state.info.forEach((item) => item.value = '');
    },
  },

  actions: {
    updateData(store, data) {
      store.commit('updateData', data);
    },

    submitForm(store, data) {
      store.commit('formProcessing');

      // Vue.http.post(address, data);

      setTimeout(() => {
        store.commit('submitForm');
      }, 1000);
    },

    clearForm(store) {
      store.commit('clearForm');
    }
  }
};
