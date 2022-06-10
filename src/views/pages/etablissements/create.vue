<template>
  <validation-observer ref="simpleRules">
    <b-form @submit.prevent>
      <b-card>
        <b-row>
          <b-col class="3">
            <b-form-group label-for="title">
              <label for="title"
                >Nom de l'etablissement
                <span class="p-0 text-danger h6"> *</span></label
              >

              <validation-provider
                #default="{ errors }"
                name="title"
                rules="required"
              >
                <b-form-input
                  id="title"
                  type="text"
                  v-model="title"
                  @input="obligatoryTitle"
                  :state="errors.length > 0 ? false : null"
                  placeholder="EPP - Etablissement "
                />

                <small
                  :class="valideTitle ? 'block' : 'none'"
                  class="text-danger"
                >
                  Veuillez saisir nom de l'etablissement
                </small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col class="3">
            <label for=""
              >Commune<span class="p-0 text-danger h6"> *</span></label
            >
            <validation-provider
              #default="{ errors }"
              label="title"
              rules="required"
              placeholder="Selectionner une commune"
            >
              <v-select
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="title"
                placeholder="Selectionner une commune"
                id="commune"
                :options="communes"
                type="text"
                v-model="selectedCommune"
                :state="errors.length > 0 ? false : null"
              />

              <small
                :class="valideCommune ? 'block' : 'none'"
                class="text-danger"
              >
                Veuillez selectionner la commune
              </small>
            </validation-provider>
          </b-col>

          <b-col class="3">
            <b-form-group label="" label-for="quartier">
              <label for="quartier"
                >Quartier <span class="p-0 text-danger h6"> *</span></label
              >

              <validation-provider
                #default="{ errors }"
                name="quartier"
                rules="required"
              >
                <b-form-input
                  id="quartier"
                  v-model="quartier"
                  @input="obligatoryQuartier"
                  :state="errors.length > 0 ? false : null"
                  placeholder="Abatta"
                />

                <small
                  :class="valideQuartier ? 'block' : 'none'"
                  class="text-danger"
                >
                  Veuillez saisir le quartier
                </small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="3">
            <label for=""
              >Type d'enseignement<span class="p-0 text-danger h6">
                *</span
              ></label
            >
            <validation-provider
              #default="{}"
              name="enseignement_id"
              rules="required"
            >
              <v-select
                @input="getEnseignements()"
                v-model="selectedEnseignement"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="title"
                :options="enseignements"
                placeholder="Selectionner un enseignement"
              />

              <small
                :class="valideEnseignement ? 'block' : 'none'"
                class="text-danger"
              >
                Veuillez selectionner l'enseignement
              </small>
            </validation-provider>
          </b-col>
          <b-col class="3">
            <label for=""
              >Diocèse <span class="p-0 text-danger h6"> *</span></label
            >
            <validation-provider
              #default="{}"
              name="diocese_id"
              rules="required"
            >
              <v-select
                @input="getSedec()"
                v-model="selectedDiocese"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="title"
                :options="dioceses"
                placeholder="Selectionner le diocèse"
              />

              <small
                :class="valideDiocese ? 'block' : 'none'"
                class="text-danger"
              >
                Veuillez selectionner le diocèse
              </small>
            </validation-provider>
          </b-col>
          <b-col class="3">
            <label for=""
              >Sedec <span class="p-0 text-danger h6"> *</span></label
            >
            <validation-provider #default="{}" name="sedec_id" rules="required">
              <v-select
                v-model="selectedSedec"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="title"
                :options="sedecs"
                placeholder="Selectionner un sedec"
              />

              <small
                :class="valideSedec ? 'block' : 'none'"
                class="text-danger"
              >
                Veuillez selectionner le SEDEC
              </small>
            </validation-provider>
          </b-col>
        </b-row>

        <b-row class="mt-1">
          <b-col class="3"
            ><b-form-group label="" label-for="contact">
              <label for="contact"
                >Contact <span class="p-0 text-danger h6"> *</span></label
              >

              <validation-provider
                #default="{ errors }"
                name="contact"
                rules="required"
              >
                <b-form-input
                  id="contact"
                  type="text"
                  v-model="contact"
                  :state="errors.length > 0 ? false : null"
                  placeholder="000 0000 000"
                />

                <small
                  :class="valideContact ? 'block' : 'none'"
                  class="text-danger"
                >
                  Veuillez saisir le contact
                </small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col class="3"
            ><b-form-group label="" label-for="email">
              <label for="email"
                >Email <span class="p-0 text-danger h6"> *</span></label
              >
              <validation-provider
                #default="{ errors }"
                name="email"
                rules="required"
              >
                <b-form-input
                  id="email"
                  type="email"
                  v-model="email"
                  :state="errors.length > 0 ? false : null"
                  placeholder="exemple@gmail.com"
                />
                <small
                  :class="valideEmail ? 'block' : 'none'"
                  class="text-danger"
                >
                  Veuillez saisir l'email
                </small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col class="3">
            <label for="">Logo de l'etablissement</label>
            <b-form-file
              @change="processFile($event)"
              :state="Boolean(image)"
              no-drop
              placeholder="Logo de l'etablissement"
              drop-placeholder="Glisser un fichier ici..."
              multiple
              class="text-center"
            />
          </b-col>
        </b-row>

        <label for="niveau"
          >Cycle & Niveaux<span class="p-0 text-danger h6"> *</span></label
        >
        <b-row>
          <b-col class="mt-1 4" v-for="(cycles, index) in cycle" :key="index">
            <b-form-checkbox
              :value="cycles.id"
              class="custom-control-primary"
              v-model="selectedCycle"
            >
              {{ cycles.title }}
            </b-form-checkbox>

            <b-col class="6" v-for="(niveaux, index) in niveau" :key="index">
              <b-row v-if="cycles.id === niveaux.parent_id">
                <b-form-checkbox
                  :value="niveaux.id"
                  v-model="selectedNiveau"
                  class="custom-control-primary ml-1 mb-1"
                >
                  {{ niveaux.title }}
                </b-form-checkbox>
              </b-row>
            </b-col>
          </b-col>
        </b-row>
        <!-- login button -->
        <b-col cols="12 mt-2">
          <b-button variant="primary" type="submit" @click="save">
            Enregistrer
          </b-button>
        </b-col>
      </b-card>
    </b-form>
  </validation-observer>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import vSelect from "vue-select";
import URL, { APP_HOST } from "@/views/pages/request";
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
  BRow,
  BCol,
  BButton,
  BCardText,
  BCard,
  BFormFile,
} from "bootstrap-vue";
import { required } from "@validations";

export default {
  components: {
    BCard,
    BFormFile,
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
    BCol,
    BButton,
  },
  data() {
    return {
      selectedCommune: "Votre commune",
      selectedEnseignement: "Votre enseignement",
      selectedDiocese: "Votre diocèse",
      selectedSedec: "Votre sedec ",
      communes: [],
      typeEnseignement: [],
      enseignements: [],
      dioceses: [],
      diocesesCache: [],
      sedecs: [],
      title: "",
      quartier: "",
      contact: "",
      email: "",
      selected: "",
      selectedB: "",
      image: "",

      valideTitle: false,
      valideCommune: false,
      valideQuartier: false,
      valideEnseignement: false,
      valideDiocese: false,
      valideSedec: false,
      valideContact: false,
      valideEmail: false,

      // file:null,
      selectedC: "",
      sedecsCache: [],
      niveaux: [],
      cycle: [],
      niveau: [],
      niveauCy: [],
      datas: [],
      selectedCycle: [],
      selectedNiveau: [],
      // sideImg: require("@/assets/images/pages/register-v2.svg"),
    };
  },

  async mounted() {
            document.title = "Créer un etablissement";

    try {
      // await axios.get(URL.LIST_ETABLISSEMENT).then((response) => {
      //   this.returnData = response.data;
      //   this.communes = response.data.commune;
      //   this.enseignements = response.data.enseignement;
      //   this.dioceses = response.data.diocese;
      //   this.diocesesCache = response.data.diocese;
      //   this.sedecs = response.data.sedec;
      //   this.sedecsCache = response.data.sedec;
      //   this.niveaux = response.data;
      // });

       await axios
        .get(URL.PARAMETRE + `?type_parametre=commune`)
        .then((response) => {
          this.returnDatas = response.data.parametre;
          this.communes = this.returnDatas;

        });


         await axios
        .get(URL.PARAMETRE + `?type_parametre=enseignement`)
        .then((response) => {
          this.returnDatas = response.data.parametre;
          this.enseignements = this.returnDatas;

          // console.log(this.enseignements);
        });

         await axios
        .get(URL.PARAMETRE + `?type_parametre=diocese`)
        .then((response) => {
          this.returnDatas = response.data.parametre;
          this.dioceses = this.returnDatas;
          this.diocesesCache = this.returnDatas;
          console.log(this.dioceses);
        });
        
         await axios
        .get(URL.PARAMETRE + `?type_parametre=sedec`)
        .then((response) => {
          this.returnDatas = response.data.parametre;
          this.sedecs = this.returnDatas;
          this.sedecsCache = this.returnDatas;
          // console.log(this.sedecs);
        });
        

      const __Niveau = [];

      await axios
        .get(URL.PARAMETRE + `?type_parametre=cycle`)
        .then((response) => {
          this.returnDatas = response.data.parametre;
          this.cycle = this.returnDatas;
          this.datas = this.returnDatas;

          console.log(this.returnDatas);

          for (let index = 0; index < this.datas.length; index++) {
            let element = this.datas[index];

            for (let s = 0; s < element.childrens.length; s++) {
              const elementS = element.childrens[s];

              this.niveau.push(elementS);
            }

            // console.log(this.datas.childrens[index].title)
          }

          console.log(this.niveau);
        });

      // console.log(this.datas)

      //  await axios.get( URL.PARAMETRE + `?type_parametre=niveau`).then((response) => {
      //   this.returnDatas = response.data;
      //   this.niveau = this.returnDatas

      // });
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    // validationForm() {
    //   this.$refs.simpleRules.validate().then((success) => {
    //     if (success) {
    //       // eslint-disable-next-line
    //       alert("login successfully");
    //     }
    //   });
    // },

    processFile(event) {
      this.image = event.target.files[0];

      if (event.target.files.length !== 0) {
        // const picturePath = URL.createObjectURL(this.image)

        // const image = document.querySelector('#profil_picture')

        // image.src = picturePath

        console.log(this.image);
      } else {
        // const image = document.querySelector('#profil_picture')
        // picture.src = ''
      }
    },

    /**
     * Filter By sedec
     */

    getCycle() {
      // console.log(this.niveau);
      this.niveau = filter((niveau) => {
        return niveau.parent_id === this.selectedCycle.id;
      });

      // console.log(this.sedecs)
    },

    /**
     * Filter By sedec
     */

    getSedec() {
      // console.log(this.sedecs, this.sedecsCache);
      this.sedecs = this.sedecsCache.filter((sedec) => {
        return sedec.parent_id === this.selectedDiocese.id;
      });

      // console.log(this.sedecs)
    },

    /**
     * Filter By Diocese
     */

    getEnseignements() {
      this.dioceses = this.diocesesCache.filter((enseignement) => {
        return enseignement.parent_id === this.selectedEnseignement.id;
      });
    },

    topEnd() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: "Etablissemnt enregistré avec succès",
          icon: "BookIcon",
          variant: "success",
        },
      });
    },

    obligatoryTitle() {
      if (!this.title) {
        this.valideTitle = true;

        this.erreur = true;
      } else {
        this.valideTitle = false;

        this.erreur = false;
      }
    },

     obligatoryContact() {
      if (!this.contact) {
        this.valideContact = true;

        this.erreur = true;
      } else {
        this.valideContact = false;

        this.erreur = false;
      }
    },

     obligatoryEmail() {
      if (!this.email) {
        this.valideEmail = true;

        this.erreur = true;
      } else {
        this.valideEmail = false;

        this.erreur = false;
      }
    },

    obligatoryCommune() {
      if (this.selectedCommune == "Votre commune" || !this.selectedCommune) {
        this.valideCommune = true;

        this.erreur = true;
      } else {
        this.valideCommune = false;

        this.erreur = false;
      }
    },

    obligatoryEnseignement() {
      if (
        this.selectedEnseignement == "Votre enseignement" ||
        !this.selectedEnseignement
      ) {
        this.valideEnseignement = true;

        this.erreur = true;
      } else {
        this.valideEnseignement = false;

        this.erreur = false;
      }
    },

    obligatoryDiocese() {
      if (this.selectedDiocese == "Votre diocèse" || !this.selectedDiocese) {
        this.valideDiocese = true;

        this.erreur = true;
      } else {
        this.valideDiocese = false;

        this.erreur = false;
      }
    },

    obligatorySedec() {
      if (this.selectedSedec == "Votre sedec " || !this.selectedSedec) {
        this.valideSedec = true;

        this.erreur = true;
      } else {
        this.valideSedec = false;

        this.erreur = false;
      }
    },

    obligatoryQuartier() {
      if (!this.quartier) {
        this.valideQuartier = true;

        this.erreur = true;
      } else {
        this.valideQuartier = false;

        this.erreur = false;
      }
    },

    async save() {
      try {
        this.obligatoryTitle();
        this.obligatoryCommune();
        this.obligatoryQuartier();
        this.obligatoryEnseignement();
        this.obligatoryDiocese();
        this.obligatorySedec();
        this.obligatoryContact();
        this.obligatoryEmail();

        const config = {
          headers: {
            Accept: "application/json",
          },
        };
        const data = new FormData();

        data.append("title", this.title);
        data.append("quartier", this.quartier);
        data.append("contact", this.contact);
        data.append("email", this.email);
        data.append("commune_id", this.selectedCommune.id);
        data.append("enseignement_id", this.selectedEnseignement.id);
        data.append("diocese_id", this.selectedSedec.id);
        data.append("sedec_id", this.selectedSedec.id);
        data.append("image", this.image);

        for (let index = 0; index < this.selectedCycle.length; index++) {
          const element = this.selectedCycle[index];
          data.append(`cycles[${index}]`, this.selectedCycle[index]);
        }

        for (let index = 0; index < this.selectedNiveau.length; index++) {
          const element = this.selectedNiveau[index];
          data.append(`niveaux[${index}]`, this.selectedNiveau[index]);
        }

        // console.log(this.selectedNiveau);

        // const newDataEtablissement = {
        //   title: this.title,
        //   quartier: this.quartier,
        //   contact: this.contact,
        //   email: this.email,
        //   commune_id: this.selectedCommune.id,
        //   enseignement_id: this.selectedEnseignement.id,
        //   diocese_id: this.selectedDiocese.id,
        //   sedec_id: this.selectedSedec.id,
        //   niveaux: this.selectedNiveau,
        //   cycles: this.selectedCycle,
        //   image: this.image,
        // };

        await axios
          .post(URL.CREATE_ETABLISSEMENT, data, config)
          .then((response) => {
            this.createEtablissement = response.data;

            if (response.data) {
              (this.title = ""),
              (this.quartier = ""),
              (this.contact = ""),
              (this.email = ""),
              (this.selectedCommune = ""),
              (this.SelectedEnseignement = ""),
              (this.selectedDiocese = ""),
              (this.selectedSedec = ""),
              this.topEnd();
              this.$router.push("/etablissement");

              // console.log(this.selectedCommune);
            }
          });
      } catch (error) {
        console.log(error);
      }
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
