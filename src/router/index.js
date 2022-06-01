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
      component: () => import('@/views/pages/dashboard/Home.vue'),
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
      path: '/kit/create',
      name: 'kit/create',
      component: () => import('@/views/pages/kit/create.vue'),
      meta: {
        pageTitle: 'Kit',
        breadcrumb: [
          {
            text: 'Ajouter un kit',
            active: true,
          },
          {
            text: 'Liste des kits',
            to: { name: 'kit' },
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
        requiresAuth: true,
      },
    },

    {
      path: '/parametre/:slug',
      // path: '/parametre/:slug',
      name: 'parametre/:slug',
      component: () => import('@/views/pages/parametre/index.vue'),
      meta: {
        pageTitle: 'Parametre',
        breadcrumb: [
          {
            text: 'parametre',
            active: true,
          },
        ],
        requiresAuth: true,
      },
    },
    

    {
      path: '/etablissement',
      name: 'etablissement',
      component: () => import('@/views/pages/etablissements/listeEtablissement.vue'),
      meta: {
        pageTitle: 'Liste',
        breadcrumb: [
          {
            text: 'Etablissement',
            active: true,
          },
        ],
        requiresAuth: true,
      },
    },
    

    {
      path: '/etablissement/create',
      name: 'create',
      component: () => import('@/views/pages/etablissements/CreateEtablissement.vue'),
      meta: {
        pageTitle: 'Liste',
        breadcrumb: [
          {
            text: 'Etablissement',
            active: true,
          },
        ],
        requiresAuth: true,
      },
    },

    {
      path: '/etablissement/edit',
      name: 'edit',
      component: () => import('@/views/pages/etablissements/editEtablissement.vue'),
      meta: {
        pageTitle: 'Modifier',
        breadcrumb: [
          {
            text: 'Etablissement',
            active: true,
          },
        ],
        requiresAuth: true,
      },
    },


    {
      path: '/point-retrait',
      name: 'point-retrait',
      component: () => import('@/views/pages/pointRetrait/index.vue'),
      meta: {
        pageTitle: 'Point',
        breadcrumb: [
          {
            text: 'Retrait',
            active: true,
          },
        ],
        requiresAuth: true,
      },
    },

    {
      path: '/point-retrait/create',
      name: 'point-retrait/create',
      component: () => import('@/views/pages/pointRetrait/create.vue'),
      meta: {
        pageTitle: 'Point',
        breadcrumb: [
          {
            text: 'Retrait',
            active: true,
          },
        ],
        requiresAuth: true,
      },
    },

    {
      path: '/point-retrait/update',
      name: 'point-retrait/update',
      component: () => import('@/views/pages/pointRetrait/edit.vue'),
      meta: {
        pageTitle: 'Modifier',
        breadcrumb: [
          {
            text: 'Point Retrait',
            active: true,
          },
        ],
        requiresAuth: true,
      },
    },


    {
      path: '/article/create',
      name: 'article/create',
      component: () => import('@/views/pages/articles/create.vue'),
      meta: {
        pageTitle: 'Article',
        breadcrumb: [
          {
            text: 'Ajouter un articles',
            active: true,
          },
          {
            text: 'Liste des articles',
            to: { name: 'article' },
          },
        ],
        requiresAuth: true,
      },
    },

    {
      path: '/article',
      name: 'article',
      component: () => import('@/views/pages/articles/index.vue'),
      meta: {
        pageTitle: 'Article',
        breadcrumb: [
          {
            text: 'Liste des articles',
            active: true,
          },
        ],
        requiresAuth: true,
      },
    },


    {
      path: '/register/:role',
      name: 'register',
      component: () => import('@/views/pages/auth/register.vue'),
      meta: {
        layout: 'full',
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
