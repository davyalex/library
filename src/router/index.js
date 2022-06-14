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
      path: '/404',
      name: '404',
      component: () => import('@/views/pages/Error.vue'),
      meta: {
        layout: 'full',
      },
    },

//utilisateur
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/pages/user/administrateur.vue'),
      meta: {
        pageTitle: 'Utilisteurs',
        breadcrumb: [
          {
            text: 'Liste des utilisteurs',
            active: true,
          },
        ],
        requiresAuth: true,
      },
    },

    {
      path: '/etab',
      name: 'compte-etablissement',
      component: () => import('@/views/pages/user/compte_etablissement.vue'),
      meta: {
        pageTitle: 'Utilisteurs',
        breadcrumb: [
          {
            text: 'Liste des utilisteurs',
            active: true,
          },
        ],
        requiresAuth: true,
      },
    },

    {
      path: '/livreur',
      name: 'livreur',
      component: () => import('@/views/pages/user/livreur.vue'),
      meta: {
        pageTitle: 'Utilisteurs',
        breadcrumb: [
          {
            text: 'Liste des utilisteurs',
            active: true,
          },
        ],
        requiresAuth: true,
      },
    },

    {
      path: '/client',
      name: 'client',
      component: () => import('@/views/pages/user/client.vue'),
      meta: {
        pageTitle: 'Utilisteurs',
        breadcrumb: [
          {
            text: 'Liste des utilisteurs',
            active: true,
          },
        ],
        requiresAuth: true,
      },
    },

    //utilisateur//

    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/pages/user/index.vue'),
      meta: {
        pageTitle: 'Utlisateurs',
        breadcrumb: [
          {
            text: 'Créer un utilisteurs',
            active: true,
          },
        ],
        requiresAuth: true,
      },
    },


    {
      path: '/kit/create',
      name: 'create',
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
      path: '/kit/update',
      name: 'kit/edit',
      component: () => import('@/views/pages/kit/update.vue'),
      meta: {
        pageTitle: 'Kit',
        breadcrumb: [
          {
            text: 'Modifier un kit',
            active: true,
          },
          {
            text: 'Ajouter un kits',
            to: { name: 'create' },
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
      path: '/kit',
      name: 'kit',
      component: () => import('@/views/pages/kit/index.vue'),
      meta: {
        pageTitle: 'Kit',
        breadcrumb: [
          {
            text: 'Liste des kits',
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
        requiresAuth: true,
      },
    },

    {
      path: '/commande',
      name: 'commande',
      component: () => import('@/views/pages/commande/index.vue'),
      meta: {
        pageTitle: 'Commande',
        breadcrumb: [
          {
            text: 'Liste des commandes',
            active: true,
          },
        ],
        requiresAuth: true,
      },
    },

    {
      path: '/detail',
      name: 'detail',
      component: () => import('@/views/pages/commande/preview.vue'),
      meta: {
        pageTitle: 'Detail de la commande',
        breadcrumb: [
          {
            text: 'Liste des commandes',
            to: {name:'commande'},
          

          },
        ],
        requiresAuth: true,
      },
    },

    {
      path: '/facture',
      name: 'commande/facture',
      component: () => import('@/views/pages/commande/facture.vue'),
      meta: {
        pageTitle: 'Detail de la commande',
        breadcrumb: [
          {
            text: 'Liste des commandes',
            to: {name:'commande'},
          

          },
        ],
        requiresAuth: true,
      },
    },


    {
      path: '/code-promo',
      name: 'code-promo',
      component: () => import('@/views/pages/code/index.vue'),
      meta: {
        pageTitle: 'Creer un code promo',
        breadcrumb: [
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
      component: () => import('@/views/pages/etablissements/index.vue'),
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
      name: 'etablissement/create',
      component: () => import('@/views/pages/etablissements/create.vue'),
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
      component: () => import('@/views/pages/etablissements/edit.vue'),
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
            to: { name: 'article' },
          },
        ],
        requiresAuth: true,
      },
    },

    {
      path: '/article/update',
      name: 'article/update',
      component: () => import('@/views/pages/articles/update.vue'),
      meta: {
        pageTitle: 'Article',
        breadcrumb: [ {
          text: 'Modifier un article',
          active: true,
        },
          {
            text: 'Liste des articles',
            to: {name:'article'}
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
