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
// const baseUrl = 'http://127.0.0.1:8000/api'
 const baseUrl = 'https://nx6sqasslr.preview.infomaniak.website/api'

// export const APP_HOST = 'https://127.0.0.1:8000'

// export const APP_HOST = 'https://nx6sqasslr.preview.infomaniak.website'
// const baseUrl = 'https://nx6sqasslr.preview.infomaniak.website/api'
// export const APP_HOST = 'https://nx6sqasslr.preview.infomaniak.website/api'
export const APP_PROD = true

const URL = {
  //auth
  LOGIN: `${baseUrl}/login`,
  REGISTER: `${baseUrl}/register`,

//user
  USER_CONNECTE: `${baseUrl}/user-connect`,
  LIST_USER: `${baseUrl}/user`,
  USER_STORE:`${baseUrl}/user/store`,
  USER_UPDATE:`${baseUrl}/user/update`,
  USER_DESTROY:`${baseUrl}/user/destroy`,


//type parametre
  TYPEPARAMETRE: `${baseUrl}/type-parametre`,
  TYPEPARAMETRE_STORE: `${baseUrl}/type-parametre/store`,
  TYPEPARAMETRE_DESTROY: `${baseUrl}/type-parametre/destroy`,

  //parametre
  PARAMETRE: `${baseUrl}/parametre`,
  PARAMETRE_CREATE: `${baseUrl}/parametre/create`,
  PARAMETRE_STORE: `${baseUrl}/parametre/store`,
  PARAMETRE_UPDATE: `${baseUrl}/parametre/update`,
  PARAMETRE_DESTROY: `${baseUrl}/parametre/destroy`,

//etablissement
  LIST_ETABLISSEMENT: `${baseUrl}/etablissement`,
  CREATE_ETABLISSEMENT: `${baseUrl}/etablissement/store`,
  UPDATE_ETABLISSEMENT: `${baseUrl}/etablissement/update`,
  DESTROY_ETABLISSEMENT: `${baseUrl}/etablissement/destroy`,

  CREATE_ETABLISSEMENT: `${baseUrl}/etablissement/store`,

  //article
  LIST_CATEGORIE: `${baseUrl}/parametre`,
  LIST_ARTICLE: `${baseUrl}/article`,
  ARTICLE_STORE: `${baseUrl}/article/store`,
  ARTICLE_UPDATE: `${baseUrl}/article/update`,


  //kit
  KIT_STORE: `${baseUrl}/kit/store`,
  LIST_KIT: `${baseUrl}/kit`,
  KIT_UPDATE: `${baseUrl}/kit/update`,
  KIT_DESTROY: `${baseUrl}/kit/destroy`,

  //Point de retrait
  LIST_POINTRETRAIT: `${baseUrl}/point-retrait`,
  CREATE_POINTRETRAIT: `${baseUrl}/point-retrait/store`,
  UPDATE_POINTRETRAIT: `${baseUrl}/point-retrait/update`,
  DESTROY_POINTRETRAIT: `${baseUrl}/point-retrait/destroy`,


  //commande
  LIST_COMMANDE: `${baseUrl}/commande`,
  AFFECTE: `${baseUrl}/commande_etat`,
  COMMANDE_DESTROY: `${baseUrl}/commande/destroy`,
  

  //dashboard
  DASHBOARD: `${baseUrl}/web/dashboard`,


};

export default URL;
