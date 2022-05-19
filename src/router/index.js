import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/pages/Home.vue'),
      meta: {
        pageTitle: 'Dashboard',
        breadcrumb: [
          {
            text: 'Dashboard',
            active: true,
          },
        ],
        requiresAuth: true,
      },
    },
    {
      path: '/type-parametre',
      name: 'type-parametre',
      component: () => import('@/views/pages/type-parametre/index.vue'),
      meta: {
        pageTitle: 'Parametre',
        breadcrumb: [
          {
            text: 'Type-parametre',
            active: true,
          },
        ],
        // requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/pages/auth/Login.vue'),
      meta: {
        layout: 'full',
      },
    },

    {
      path: '/etablissement',
      name: 'etablissement',
      component: () => import('@/views/pages/etablissements/listeEtablissement.vue'),
      meta: {
        layout: 'full',
      },
    },

    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/pages/auth/register.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})


router.beforeEach((to, from, next) => {
	// Determine if the route requires authentication
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		// Get value from somewhere to determine if the user is
		// logged in or not
		let isLoggedIn = false;
		if (localStorage.getItem('token')) {
			isLoggedIn = localStorage.getItem('connected');
		}

		// If user is not logged in, navigate to the named "login" route
		// with a query string parameter indicating where to navigate to after
		// successful login
		if (!isLoggedIn) {
			// Navigate to login route
			next({
				name: 'login',
				query: { redirect: to.fullPath },
			});
		} else {
			next();
		}
	} else {
		next();
	}
});

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
