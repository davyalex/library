<template>
  <validation-observer ref="simpleRules">
    <b-form @submit.prevent>
      <b-card>

    
        <b-row>
          <b-col cols="4">
            <b-form-group label-for="title">
              <label for="title"
                >nom de kit <span class="p-0 text-danger h6"> *</span></label
              >

              <validation-provider
                #default="{ errors }"
                name="title"
                rules="required"
              >
                <b-form-input
                  id="title"
                  @input="validateTitle"
                  type="text"
                  v-model="title"
                  :state="errors.length > 0 ? false : null"
                  placeholder="Cahier"
                />
                <small v-if="valideTitle" class="text-danger">
                  Vous devez preciser un titre
                </small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col cols="4">
            <b-form-group label="" label-for="register-libelle">
              <label>
                Etablissement <span class="p-0 text-danger h6">*</span>
              </label>
              <validation-provider
                #default="{ errors }"
                name="montant"
                rules="required"
              >
                <v-select
                  v-model="etablissement"
                  @input="validateEtablissement"
                  placeholder="Selectionnez un etablissement"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="etablissementList"
                  label="title"
                  :state="errors.length > 0 ? false : null"
                >
                </v-select>
                <small v-if="valideEtablissement" class="text-danger">
                  Vous devez sélectionner un etablissement
                </small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col cols="4">
            <b-form-group label="" label-for="register-libelle">
              <label> Niveau <span class="p-0 text-danger h6">*</span> </label>
              <validation-provider
                #default="{ errors }"
                name="montant"
                rules="required"
              >
                <v-select
                  v-model="niveau"
                  @input="validateNiveau"
                  placeholder="Selectionnez un niveau"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="niveauList"
                  label="title"
                  :state="errors.length > 0 ? false : null"
                >
                </v-select>
                <small v-if="valideNiveau" class="text-danger">
                  Vous devez sélectionner un niveau
                </small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="6">
            <b-form-group label="Description" label-for="register-description">
              <b-form-textarea
                id="textarea"
                v-model="description"
                placeholder="Decrivez l'article"
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>
          </b-col>

          <b-col cols="6">
            <div>
              <label for="">Image du kit</label>
              <b-form-file
                class="text-center mb-1"
                @change="processFile($event)"
                placeholder="Images du produit"
                drop-placeholder="Glisser un fichier ici..."
              />
            </div>
          </b-col>
        </b-row>

        <!-- DUPLICATEUR -->
        <div ref="form" class="repeater-form" :style="{ height: trHeight }">
          <b-row
            v-for="(item, index) in multiArticle"
            :key="index"
            ref="row"
            class="pb-2"
          >
            <!-- Item Form -->
            <!-- ? This will be in loop => So consider below markup for single item -->
            <b-col cols="12" class="m-auto">
              <div class="d-flex border rounded">
                <b-row class="flex-grow-1 p-2">
                  <!-- article jumelé -->
                  <b-col cols="8" md="" class="m-auto">
                    <b-form-group label="" label-for="register-libelle">
                      <label for=""
                        >Choisir un article<span
                          class="p-0 text-danger h6"
                        ></span
                      ></label>
                      <v-select
                        v-model="item.article"
                        placeholder="Selectionnez un article"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        rules="required"
                        label="title"
                        :options="articleList"
                        @input="(val) => updateItemForm(index, val)"
                      >
                      </v-select>
                    </b-form-group>
                  </b-col>

                            <b-col cols="4">
            <b-form-group label-for="title">
              <label for="title"
                >quantite <span class="p-0 text-danger h6"> *</span></label
              >

              <validation-provider
                #default="{ errors }"
                name="title"
                rules="required"
              >
                <b-form-input
                  id="title"
                  @input="validateQte(index)"
                  type="number"
                
                  v-model="item.quantite"
                  :state="errors.length > 0 ? false : null"
                  placeholder="00000"
                />
              </validation-provider>
            </b-form-group>
          </b-col>

                    <b-col cols="4">
            <b-form-group label-for="title">
              <label for="title"
                >prix <span class="p-0 text-danger h6"> *</span></label
              >

              <validation-provider
                #default="{ errors }"
                name="title"
                rules="required"
              >
                <b-form-input
                  id="title"
                  disabled
                  type="number"
                  v-model="item.prix"
                  :state="errors.length > 0 ? false : null"
                  placeholder="00000"
                />
              </validation-provider>
            </b-form-group>
          </b-col>

                </b-row>

                <div
                  class="d-flex flex-column justify-content-between border-left py-50 px-25"
                >
                  <feather-icon
                    size="16"
                    icon="XIcon"
                    class="cursor-pointer"
                    @click="removeItem(index)"
                  />
                </div>
              </div>
            </b-col>
          </b-row>
        </div>
        <b-row>
          <b-col cols="12" class="text-center" style="">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              size="md"
              variant="primary"
              @click="addNewItemInItemForm"
            >
              Ajouter des articles au kit
            </b-button>
          </b-col>
        </b-row>

            <h3 v-if="montant" class="text-right text-success">Montant du kit: <br> {{montant}}FCFA</h3>

        <!-- login button -->
        <b-col cols="12 mt-2">
          <b-button
            variant="primary"
            block
            type="submit"
            @click.prevent="confirmSave()"
            :disabled="loading === true ? true : false"
          >
            <div
              v-if="loading === true"
              class="spinner-border text-light"
            ></div>
            <span v-else> Enregistrer</span>
          </b-button>
        </b-col>
      </b-card>
    </b-form>
  </validation-observer>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import vSelect from "vue-select";
import { ref, onUnmounted } from "@vue/composition-api";
import URL, { APP_HOST } from "@/views/pages/request";
import { heightTransition } from "@core/mixins/ui/transition";
import axios from "axios";
import Ripple from "vue-ripple-directive";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

// import { BCard, BCardText } from "bootstrap-vue";

import {
  BFormInput,
  BFormGroup,
  BFormCheckbox,
  BForm,
  BDropdown,
  BDropdownItem,
  BFormTextarea,
  BImg,
  BFormFile,
  BRow,
  BCol,
  BButton,
  BCardText,
  BCard,
} from "bootstrap-vue";
import { required } from "@validations";

export default {
  components: {
    BCard,
    BDropdown,
    BDropdownItem,
    BFormCheckbox,
    vSelect,
    ValidationProvider,
    ValidationObserver,
    BFormInput,
    BFormGroup,
    BCardText,
    BForm,
    BRow,
    BImg,
    BFormFile,
    BCol,
    BButton,
    BFormTextarea,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      title: "",
      etablissement: "",
   
      niveau: "",
      description: "",
      valideTitle: false,
      valideEtablissement: false,
    
      valideNiveau: false,

      file: "",
      etablissementList: [],
      montant:"",
      pU:"",

      niveauList: [],
      articleList: [],
      niveauListFilter: [],

      multiArticle: [],

     articleItem: {
    //    article:"",
        quantite:1,
        prix:"",
     
      },
      loading: false,

      // sideImg: require("@/assets/images/pages/register-v2.svg"),
    };
  },

  async mounted() {
    document.title = "Ajouter un article";
    this.initTrHeight();

    try {
      await axios
        .get(URL.PARAMETRE + `/?type_parametre=niveau`)
        .then((response) => {
          this.niveauList = response.data.parametre;
          this.niveauListFilter = response.data.parametre;
          console.log('niveau',this.niveauListFilter);
        });

      await axios.get(URL.LIST_ETABLISSEMENT).then((response) => {
        this.etablissementList = response.data.etablissements;
        console.log(  'etablissement',this.etablissementList)
      });

      await axios.get(URL.LIST_ARTICLE).then((response) => {
        this.articleList = response.data.article;
      });
    } catch (error) {
      console.log(error);
    }
  },

  mixins: [heightTransition],
  created() {
    window.addEventListener("resize", this.initTrHeight);
  },
  destroyed() {
    window.removeEventListener("resize", this.initTrHeight);
  },

  computed:{
      
  },

  methods: {
    processFile(event) {
      this.file = event.target.files[0];

      if (event.target.files.length !== 0) {
        console.log(this.file);
      }
    },

    
 

    updateItemForm(index, val) {
        const { prix } = val;
         const { id } = val;

      const price = (this.multiArticle[index].prix = prix); 
       const q = (this.multiArticle[index].id = id);
           this.pU = this.multiArticle[index].article.prix;
       this.prix = price;

   
      console.log("article",price,q,this.pU);
   
      // let mt =0
      // for (let index = 0; index < this.multiArticle.length; index++) {
      //  this.montant= mt += Number(this.multiArticle[index].article.prix);
      // }
      // console.log('montant',this.montant)
    },


validateQte(index){
  let mont = 0
       for (let i = 0; i < this.multiArticle.length; i++) {
         if (i===index && parseInt(this.multiArticle[i].quantite)>0 ||i===index && this.multiArticle[i].quantite.length>0 ) {
             this.multiArticle[i].prix =  this.multiArticle[i].article.prix * this.multiArticle[i].quantite
          //  this.montant =    mont +=Number(this.multiArticle[i].prix)
          //  console.log(this.montant);
     }else if(i===index && parseInt(this.multiArticle[i].quantite)<=1 ||i===index && this.multiArticle[i].quantite.length<=1 ){
         this.multiArticle[i].prix =  this.multiArticle[i].article.prix
      }
}
    },
    

    getMontant(){
      // let mt = 0
      // for (let i = 0; i < multiArticle.length; i++) {
      //   const element = array[i];
        
      // }      
   

    },

    


    //duplicateur
    addNewItemInItemForm() {
   
      this.$refs.form.style.overflow = "hidden";

      this.multiArticle.push(JSON.parse(JSON.stringify(this.articleItem)));
      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight);
        setTimeout(() => {
          this.$refs.form.style.overflow = null;
        }, 350);
      });
    },

    // remove ligne duplique
    removeItem(index) {
      this.multiArticle.splice(index, 1);
      this.trTrimHeight(this.$refs.row[0].offsetHeight);
    },

    //animate duplicateur
    initTrHeight() {
      this.trSetHeight(null);
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form.scrollHeight);
      });
    },

    //message
    topEnd() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: "Kit enregistré avec succès",
          icon: "BookIcon",
          variant: "success",
        },
      });
    },

    //message validation

   
    validateEtablissement() {
    //     let filtre =[]
    //     for (let index = 0; index < this.etablissement.niveaux.length; index++) {
    //         const element = this.etablissement.niveaux[index];
    //         filtre.push(element.id)
    //          console.log(filtre);
    //     }
    //                 // console.log(this.etablissement.niveaux);
    //                 let niveauFilter = []
    //                 this.niveauList.forEach((element,index) => {
    //                     if (element.id === filtre[index]) {
    //                             niveauFilter.push(element)
    //                     }
    //                 });

    //   this.niveauList = niveauFilter
    //     console.log( this.niveauList);

    console.log(this.multiArticle);

      if (!this.etablissement) {
        this.valideEtablissement= true;
      } else {
        this.valideEtablissement= false;
      }
    },

    // console.log(this.sedecs)

    validateTitle() {
      if (!this.title) {
        this.valideTitle = true;
      } else {
        this.valideTitle = false;
      }
    },

    validateNiveau() {
      if (!this.niveau) {
        this.valideNiveau = true;
      } else {
        this.valideNiveau = false;
      }
    },
    getMontant(){
    let ttc = 0
      for (let index = 0; index < this.multiArticle.length; index++) {
       this.montant = ttc+=Number(this.multiArticle[index].prix);
      }
    },

     confirmSave() {
      this.$swal({
        title: "Êtes vous sûr?",
        text: this.getMontant(),
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Oui",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-outline-danger ml-1",
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          this.save();
        }
      });
    },

    async save(bvModalEvt) {
  
      try {
             this.getMontant()
        this.validateTitle();
        this.validateEtablissement();
        this.validateNiveau();
        const config = {
          headers: {
            Accept: "application/json",
          },
        };
        // const jumele = this.multiArticle.map((item) => {
        //   return { jumeler_id: item.articleJumele_id };
        // });

        // const newFormdata = new FormData();

        // newFormdata.append("image", this.file);

        // newFormdata.append("title", `${this.title}`);

        // newFormdata.append("quantite", `${this.quantite}`);

        // newFormdata.append("prix", this.prix);

        // newFormdata.append("categorie_id", this.categorie.id);

        // newFormdata.append("description", this.description);

        // for (let index = 0; index < jumele.length; index++) {
        //   const element = jumele[index];
        //   newFormdata.append(`jumele[${index}]`, jumele[index].jumeler_id);
        // }

        // newFormdata.append("count", this.multiArticle.length);

        const data = {
          title: this.title,
          etablissement_id: this.etablissement.id,
          niveau_id: this.niveau.id,
          description: this.description,
          count: this.multiArticle.length,
        //   articles:this.multiArticle,
          articles: this.multiArticle.map((item) => {
            return { id:item.id, quantite:item.quantite,montant:this.pU};
          }),

        //    quantite: this.multiArticle.map((item) => {
        //     return { quantite: item.quantite, };
        //   }),
        };
        console.log(data);
        this.loading = true;
        await axios
          .post(URL.KIT_STORE, data, config)
          .then((response) => {
            this.topEnd();
                        this.title=""
this.etablissement =""
this.niveau =""
this.description =""
this.prix = ""
this.quantite = "",
this.articleItem = ""
            if (response.data) {
             
              this.kitList.unshift(data);
              this.loading = false;

                
              // this.$router.push("/article");
            }
          });
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
      bvModalEvt.preventDefault();
    },
  },
};

// let togg1 = document.getElementById("togg1");
// let d1 = document.getElementById("d1");
// togg1.addEventListener("click", () => {
//   if(getComputedStyle(d1).display != "none"){
//     d1.style.display = "none";
//   } else {
//     d1.style.display = "block";
//   }
// })
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
