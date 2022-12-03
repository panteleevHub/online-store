export default {
	namespaced: true,

	state: {
		items: []
	},

	getters: {
		items(state){
			return state.items;
		},

		item: (state, getters) => (id) => {
      return getters.items.find((item) => item.id_product === Number(id));
		}
	},

	mutations: {
		loadItems(state, data){
			state.items = data;
		}
	},

	actions: {
		loadItems(store){
      const data = getProducts();

			store.commit('loadItems', data);
    }
  }
};

function getProducts(){
	return [
		{
			id_product: 10,
			title: 'Iphone 5',
			price: 20000
		},
		{
			id_product: 20,
			title: 'Iphone 6',
			price: 25000
		},
		{
			id_product: 30,
			title: 'Iphone 7',
			price: 30000
		}
	]
}
