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

