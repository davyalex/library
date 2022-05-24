import axios from "axios";

export default [
  {
    title: 'Dashboard',
    route: 'home',
    icon: 'HomeIcon',
  },
 

  {
    title: 'Etablissement',
    route: 'etablissement',
    icon: 'BookIcon',
  },

  {
    title: 'Articles',
    route: 'article',
    icon: 'BookIcon',
  },

  {
    title: 'Parametre',
    route: '',
    icon: 'SettingsIcon',
    children:[

      {
        title: 'Type parametre',
        route: 'type-parametre',
        icon: 'ToolIcon',
       },

     {
      title: 'Enseignement',
      route: {path: `/parametre/enseignement`},
      icon: 'SettingsIcon',
     },
     {
      title: 'Diocèse',
      route: {path: `/parametre/diocese`},
      icon: 'SettingsIcon',
     },
     {
      title: 'Sedec',
      route: {path: `/parametre/sedec`},
      icon: 'SettingsIcon',
     },

     {
      title: 'Cycle',
      route: {path: `/parametre/cycle`},
      icon: 'SettingsIcon',
     },
     {
      title: 'Niveau',
      route: {path: `/parametre/niveau`},
      icon: 'SettingsIcon',
     },
     {
      title: 'Commune',
      route: {path: `/parametre/commune`},
      icon: 'SettingsIcon',
     },

     {
      title: 'Etat de la commande',
      route: {path: `/parametre/etat-de-la-commande`},
      icon: 'SettingsIcon',
     },

     {
      title: 'Categorie',
      route: {path: `/parametre/categorie`},
      icon: 'SettingsIcon',
     }
     
    ]
  },

]

