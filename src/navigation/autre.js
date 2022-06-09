import axios from "axios";
import URL from "@/views/pages/request";
const sideBar= [
  {
    title: 'Dashboard',
    route: 'home',
    icon: 'HomeIcon',
  },
  {
    title: 'Parametre',
    icon: 'SettingsIcon',
    children: [
     
    ]
  },

  {
    title: 'Etablissement',
    route: 'etablissement',
    icon: 'FileIcon',
  },

]
const getTypaParametre=async()=>{
  let typeParametre = []
  let getParm = []
  
   const {data} =  await axios.get(URL.TYPEPARAMETRE)
   
   if(data){
    typeParametre = data.liste;
    localStorage.setItem('typeParametre', JSON.stringify(typeParametre))
    console.log('liste',typeParametre);
    return { ty : typeParametre };
   }


}

async function  test(){
  const { ty } = await getTypaParametre()

  if(ty.length != 0){
    for (let i = 0; i < ty.length; i++) {
      const el = ty[i];
      sideBar[1].children.push({
        title: el.title,
        route: {name: `parametre/${el.id}/${el.slug}`},
        icon: "FileTextIcon",
        
      })
    }

    console.log(sideBar)
  }
  
}

console.log('Test 3', sideBar)

export default sideBar

// import axios from "axios";
// import URL from "@/views/pages/request";
// export default [
//   {
//     title: 'Dashboard',
//     route: 'home',
//     icon: 'HomeIcon',
//   },

//   {
//     title: 'Utilisateur',
//     route: 'user',
//     icon: 'UsersIcon',
//   },
 

//   {
//     title: 'Etablissement',
//     route: 'etablissement',
//     icon: 'BookIcon',
//   },

//   {
//     title: 'Articles',
//     route: 'article',
//     icon: 'BookIcon',
//   },

//   {
//     title: 'Kit',
//     route: 'kit',
//     icon: 'BookIcon',
//   },

//   {
//     title: 'Point Retrait',
//     route: 'point-retrait',
//     icon: 'NavigationIcon',
//   },

//   {
//     title: 'Commande',
//     route: 'commande',
//     icon: 'ShoppingCartIcon',
//   },


//   {
//     title: 'Parametre',
//     route: '',
//     icon: 'SettingsIcon',
//     children:[

//       {
//         title: 'Type parametre',
//         route: 'type-parametre',
//         icon: 'ToolIcon',
//        },

//      {
//       title: 'Enseignement',
//       route: {path: `/parametre/enseignement`},
//       icon: 'SettingsIcon',
//      },
//      {
//       title: 'Diocèse',
//       route: {path: `/parametre/diocese`},
//       icon: 'SettingsIcon',
//      },
//      {
//       title: 'Sedec',
//       route: {path: `/parametre/sedec`},
//       icon: 'SettingsIcon',
//      },

//      {
//       title: 'Cycle',
//       route: {path: `/parametre/cycle`},
//       icon: 'SettingsIcon',
//      },
//      {
//       title: 'Niveau',
//       route: {path: `/parametre/niveau`},
//       icon: 'SettingsIcon',
//      },
//      {
//       title: 'Commune',
//       route: {path: `/parametre/commune`},
//       icon: 'SettingsIcon',
//      },

//      {
//       title: 'Etat de la commande',
//       route: {path: `/parametre/etat-de-la-commande`},
//       icon: 'SettingsIcon',
//      },

//      {
//       title: 'Categorie',
//       route: {path: `/parametre/categorie`},
//       icon: 'SettingsIcon',
//      },

//      {
//       title: 'Mode de livraison',
//       route: {path: `/parametre/mode-de-livraison`},
//       icon: 'SettingsIcon',
//      }


//     //  mode-de-livraison
     
//     ]
//   },

// ]

 


