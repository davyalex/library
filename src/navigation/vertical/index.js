import axios from "axios";
import URL from "@/views/pages/request";
const sideBar = [
  {
    title: "Dashboard",
    route: "home",
    icon: "HomeIcon",
    role: "superadmin",
    noRole: "",
  },

  {
    title: "Compte utilisateur",
    route: "user",
    icon: "UsersIcon",
    role: "superadmin",
    noRole: "",
    // children:[
    //   {
    //     title: "Compte administrateur",
    //     route: "admin",
    //     icon: "UsersIcon",
    //     role: "superadmin",
    //     noRole: "",
    //   },
    //   {
    //     title: "Compte etablissement",
    //     route: "etab",
    //     icon: "UsersIcon",
    //     role: "superadmin",
    //     noRole: "",
    //   },
    //   {
    //     title: "Compte livreur",
    //     route: "livreur",
    //     icon: "UsersIcon",
    //     role: "superadmin",
    //     noRole: "",
    //   },
    //   {
    //     title: "Compte client",
    //     route: "client",
    //     icon: "UsersIcon",
    //     role: "superadmin",
    //     noRole: "",
    //   }
    // ]
  },

  {
    title: "Etablissement",
    route: "etablissement",
    icon: "BookIcon",
    role: "superadmin",
    noRole: "",
  },

  {
    title: "Articles",
    route: "article",
    icon: "BookIcon",
    role: "superadmin",
    noRole: "",
  },

  {
    title: "Kit",
    route: "kit",
    icon: "BookIcon",
    role: "superadmin",
    noRole: "",
  },

  {
    title: "Point Retrait",
    route: "point-retrait",
    icon: "NavigationIcon",
    role: "superadmin",
    noRole: "",
  },

  {
    title: "Commande",
    route: "commande",
    icon: "ShoppingCartIcon",
    role: "superadmin",
    noRole: "",
  },

  {
    title: "Parametre",
    route: "",
    icon: "SettingsIcon",
    role: "superadmin",
    noRole: "",

    children: [
      {
        title: "Type parametre",
        route: "type-parametre",
        icon: "ToolIcon",
        role: "superadmin",
        noRole: "admin",
      },

      {
        title: "Enseignement",
        route: { path: `/parametre/enseignement` },
        icon: "SettingsIcon",
        role: "superadmin",
        noRole: "admin",
      },
      {
        title: "Diocèse",
        route: { path: `/parametre/diocese` },
        icon: "SettingsIcon",
        role: "superadmin",
        noRole: "",
      },
      {
        title: "Sedec",
        route: { path: `/parametre/sedec` },
        icon: "SettingsIcon",
        role: "superadmin",
        noRole: "",
      },

      {
        title: "Cycle",
        route: { path: `/parametre/cycle` },
        icon: "SettingsIcon",
        role: "superadmin",
        noRole: "admin",
      },
      {
        title: "Niveau",
        route: { path: `/parametre/niveau` },
        icon: "SettingsIcon",
        noRole: "admin",
      },
      {
        title: "Commune",
        route: { path: `/parametre/commune` },
        icon: "SettingsIcon",
        role: "superadmin",
        noRole: "",
      },

      {
        title: "Etat de la commande",
        route: { path: `/parametre/etat-de-la-commande` },
        icon: "SettingsIcon",
        role: "superadmin",
        noRole: "admin",
      },

      {
        title: "Categorie",
        route: { path: `/parametre/categorie` },
        icon: "SettingsIcon",
        role: "superadmin",
        noRole: "",
      },

      {
        title: "Mode de livraison",
        route: { path: `/parametre/mode-de-livraison` },
        icon: "SettingsIcon",
        role: "superadmin",
        noRole: "admin",
      },

      //  mode-de-livraison
    ],
  },
];

const userConnect = JSON.parse(localStorage.getItem("user"));
const role = userConnect.roles[0].name;
console.log("userConnect", role);
console.log("sideBar", sideBar);

// for (let index = 0; index < sideBar1.length; index++) {
//   const element = sideBar1[index];
//   console.log('role',element.role);

// }

sideBar.forEach((element, index) => {
  if (element.children) {
    element.children.forEach((children, index) => {

      if (children.noRole === role) {
        element.children = element.children.filter((item) => {
          return item.noRole !== role
        })
      }
    });
  }

  console.log(role);
});

export default sideBar;
