<template>
	<div class="d-flex flex-column min-vh-100">
		<header>
			<div class="container">
				<div class="row">
					<div class="col col-sm-9">
						<h1>Site</h1>
					</div>
					<div class="col col-sm-3">
						<div class="alert alert-default">
							<div>In Cart: {{ lengthInCart }}</div>
						</div>
					</div>
				</div>
				<hr>
			</div>
		</header>
		<section class="flex-grow-1">
			<div class="container">
				<div class="row">
					<div class="col col-sm-3 menu">
						<ul class="list-group">
							<router-link
                v-for="(item, index) in menuList"
                :key="index"
                :to="item.url"
                tag="li"
                class="list-group-item"
                :class="isLinkDisabled(item)"
                active-class="active"
							>
								<a>{{ item.text }}</a>
							</router-link>
						</ul>
					</div>
					<div class="col col-sm-9">
						<transition name="slide" mode="out-in">
							<router-view></router-view>
						</transition>
					</div>
				</div>
			</div>
		</section>
    <footer>
			<div class="container">
        <hr>
				<div class="row">
          <div class="col col-sm-9">
						<h1>Site</h1>
					</div>
					<div class="col col-sm-3">
						<div class="alert alert-default">
							<div>@copyright</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';

	export default {
    created() {
      this.loadItems();
    },

		computed: {
			...mapGetters('menu', {
				menuList: 'items'
			}),

			...mapGetters('cart', {
				lengthInCart: 'cnt',
			}),
		},

    methods: {
      ...mapActions('products', {
        loadItems: 'loadItems'
      }),

      isLinkDisabled(item) {
        return item.url === '/checkout' && !this.lengthInCart ? 'disabled' : '';
      }
    }
	}
</script>

<style>
.menu {
		border-right: 1px solid #ddd;
	}

	.list-group-item {
		transition: background 0.3s, color 0.3s;
	}

	.list-group-item a {
		text-decoration: none;
	}

	.list-group-item.active a {
		color: inherit;
	}

  .list-group-item.disabled a {
    color: #000;
		opacity: 0.3;
    pointer-events: none;
	}

	.slide-enter-active {
		animation: slideIn 0.5s;
	}

	.slide-leave-active {
		animation: slideOut 0.5s;
	}

	@keyframes slideIn {
		from {
      transform: rotateY(90deg);
    }

		to {
      transform: rotateY(0deg);
    }
	}

	@keyframes slideOut {
    from {
        transform: rotateY(0deg);
      }

    to {
      transform: rotateY(90deg);
    }
	}
</style>
