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
const baseUrl = 'https://nx6sqasslr.preview.infomaniak.website/api'
// export const APP_HOST = 'https://ediqia.com'
export const APP_HOST = 'https://nx6sqasslr.preview.infomaniak.website/api'
export const APP_PROD = false

const URL = {
  LOGIN: `${baseUrl}/login`,

  REGISTER: `${baseUrl}/register`,

  USER_CONNECTE: `${baseUrl}/user_connecte`,

//type parametre
  TYPEPARAMETRE: `${baseUrl}/type-parametre`,
  TYPEPARAMETRE_STORE: `${baseUrl}/type-parametre/store`,
  TYPEPARAMETRE_DESTROY: `${baseUrl}/type-parametre/destroy`,

  //parametre
  PARAMETRE: `${baseUrl}/parametre`,
  PARAMETRE_CREATE: `${baseUrl}/parametre/create`,
  PARAMETRE_STORE: `${baseUrl}/parametre/store`,
  PARAMETRE_DESTROY: `${baseUrl}/parametre/destroy`,

//etablissement
  LIST_ETABLISSEMENT: `${baseUrl}/etablissement`,
  CREATE_ETABLISSEMENT: `${baseUrl}/etablissement/store`,
  UPDATE_ETABLISSEMENT: `${baseUrl}/etablissement/update`,
  DESTROY_ETABLISSEMENT: `${baseUrl}/etablissement/destroy`,
  CREATE_ETABLISSEMENT: `${baseUrl}/store/etablissement`,

  //article
  LIST_CATEGORIE: `${baseUrl}/parametre`,
  LIST_ARTICLE: `${baseUrl}/article`,
  ARTICLE_STORE: `${baseUrl}/article/store`,

};

export default URL;
