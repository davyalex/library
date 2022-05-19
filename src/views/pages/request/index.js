// ****
// Indication important avant de pouvoir utiliser les routes d'api definit ici
//
// Ajoutez dans chaque composant (fichiers) où vous souhaitez faire des requetes vers l'api le lien ci dessous
// ===>>> import URL from '@/views/pages/request'
//
// Vous n'avez ensuite qu'a faire dans vos requetes < URL.NOM_DE_LA_ROUTE_A_UTILISER >
//
// ****

// TOUTES LES URL DISPONIBLE DANS L'APP
// const baseUrl = 'https://devapi.ediqia.com/api'
const baseUrl = 'http://127.0.0.1:8000/api'
// export const APP_HOST = 'https://ediqia.com'
export const APP_HOST = 'http://127.0.0.1:8080'
export const APP_PROD = false

const URL = {
  LOGIN: `${baseUrl}/login`,
  REGISTER: `${baseUrl}/register`,
  USER_CONNECTE: `${baseUrl}/user_connecte`,
  LIST_ETABLISSEMENT: `${baseUrl}/etablissement`,
  CREATE_ETABLISSEMENT: `${baseUrl}/store/etablissement`,

};

export default URL;
