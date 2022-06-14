import axios from "axios";
import URL from "@/views/pages/request";
const sideBar = [
  {
    title: "Dashboard",
    route: "home",
    icon: "HomeIcon",
    role: "superadmin",
    noView: "",
  },

  {
    title: "Compte utilisateurs",
    route: "user",
    icon: "UsersIcon",
    role: "superadmin",
    noView: "",
    // children:[
    //   {
    //     title: "Compte administrateur",
    //     route: "admin",
    //     icon: "UsersIcon",
    //     role: "superadmin",
    //     noView: "",
    //   },
    //   {
    //     title: "Compte etablissement",
    //     route: "etab",
    //     icon: "UsersIcon",
    //     role: "superadmin",
    //     noView: "",
    //   },
    //   {
    //     title: "Compte livreur",
    //     route: "livreur",
    //     icon: "UsersIcon",
    //     role: "superadmin",
    //     noView: "",
    //   },
    //   {
    //     title: "Compte client",
    //     route: "client",
    //     icon: "UsersIcon",
    //     role: "superadmin",
    //     noView: "",
    //   }
    // ]
  },

  {
    title: "Etablissements",
    route: "etablissement",
    icon: "BookIcon",
    role: "superadmin",
    noView: "",
  },

  {
    title: "Articles",
    route: "article",
    icon: "BookOpenIcon",
    role: "superadmin",
    noView: "",
  },

  {
    title: "Kits",
    route: "kit",
    icon: "BriefcaseIcon",
    role: "superadmin",
    noView: "",
  },

  {
    title: "Point Retraits",
    route: "point-retrait",
    icon: "NavigationIcon",
    role: "superadmin",
    noView: "",
  },

  {
    title: "Commandes",
    route: "commande",
    icon: "ShoppingCartIcon",
    role: "superadmin",
    noView: "",
  },

  {
    title: "Code promo",
    route: "code-promo",
    icon: "WatchIcon",
    role: "superadmin",
    noView: "",
  },

  {
    title: "Parametres",
    route: "",
    icon: "SettingsIcon",
    role: "superadmin",
    noView: "",

    children: [
      {
        title: "Type parametres",
        route: "type-parametre",
        icon: "ToolIcon",
        role: "superadmin",
        noView: "admin",
      },

      {
        title: "Enseignements",
        route: { path: `/parametre/enseignement` },
        icon: "SettingsIcon",
        role: "superadmin",
        noView: "admin",
      },
      {
        title: "Diocèses",
        route: { path: `/parametre/diocese` },
        icon: "SettingsIcon",
        role: "superadmin",
        noView: "",
      },
      {
        title: "Sedecs",
        route: { path: `/parametre/sedec` },
        icon: "SettingsIcon",
        role: "superadmin",
        noView: "",
      },

      {
        title: "Cycles",
        route: { path: `/parametre/cycle` },
        icon: "SettingsIcon",
        role: "superadmin",
        noView: "admin",
      },
      {
        title: "Niveaux",
        route: { path: `/parametre/niveau` },
        icon: "SettingsIcon",
        role: "superadmin",
        noView: "",
      },
      {
        title: "Communes",
        route: { path: `/parametre/commune` },
        icon: "SettingsIcon",
        role: "superadmin",
        noView: "",
      },

      {
        title: "Etats de la commande",
        route: { path: `/parametre/etat-de-la-commande` },
        icon: "SettingsIcon",
        role: "superadmin",
        noView: "admin",
      },

      {
        title: "Categories",
        route: { path: `/parametre/categorie` },
        icon: "SettingsIcon",
        role: "superadmin",
        noView: "",
      },

      {
        title: "Modes de livraison",
        route: { path: `/parametre/mode-de-livraison` },
        icon: "SettingsIcon",
        role: "superadmin",
        noView: "admin",
      },
      {
        title: "Modes de paiement",
        route: { path: `/parametre/mode-de-paiement` },
        icon: "SettingsIcon",
        role: "superadmin",
        noView: "admin",
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

      if (children.noView === role) {
        element.children = element.children.filter((item) => {
          return item.noView !== role
        })
      }
    });
  }

  console.log(role);
});

export default sideBar;
