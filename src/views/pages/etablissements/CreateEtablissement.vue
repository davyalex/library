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
                  :state="errors.length > 0 ? false : null"
                  placeholder="EPP - Etablissement "
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col class="3">
            <b-form-group label="" label-for="Commune">
              <label for="Commune"
                >Commune <span class="p-0 text-danger h6"> *</span></label
              >
              <validation-provider
                #default="{ errors }"
                name="commune"
                rules="required"
              >
                <b-form-input
                  id="ommune"
                  type="text"
                  v-model="commune_id"
                  :state="errors.length > 0 ? false : null"
                  placeholder="Cocody"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
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
                  :state="errors.length > 0 ? false : null"
                  placeholder="Abatta"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
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
                <small class="text-danger">{{ errors[0] }}</small>
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
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group></b-col
          >
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
                v-model="enseignement_id"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="name"
                placeholder="Selectionner un sedec"
              />

              <small :class="valideRole ? 'block' : 'none'" class="text-danger">
                Veuillez selectionner l'enseignement
              </small>
            </validation-provider>
          </b-col>
        </b-row>

        <b-row>
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
                v-model="sedec_id"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="name"
                placeholder="Selectionner le diocèse"
              />

              <small :class="valideRole ? 'block' : 'none'" class="text-danger">
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
                v-model="sedec_id"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="name"
                placeholder="Selectionner un sedec"
              />

              <small :class="valideRole ? 'block' : 'none'" class="text-danger">
                Veuillez selectionner le SEDEC
              </small>
            </validation-provider>
          </b-col>
        </b-row>

        <b-row class="mt-2">
          <b-col class="6">
            <label for="niveau"
              >Cycle & niveau<span class="p-0 text-danger h6"> *</span></label
            >
            <b-row>
              <b-form-checkbox
                value="A"
                class="custom-control-primary"
                @change="selected = 'A'"
              >
                Primaire
              </b-form-checkbox>
              <b-form-checkbox
                value="B"
                class="custom-control-primary ml-1"
                @change="selected = 'B'"
              >
                Secondaire
              </b-form-checkbox>
              <b-form-checkbox
                value="C"
                class="custom-control-primary ml-1"
                @change="selected = 'C'"
              >
                Superieur
              </b-form-checkbox>
            </b-row>
            
            
          </b-col>

          <b-col v-if="selected === 'A'" class="6">
            <label for="niveau"
              >Niveau <span class="p-0 text-danger h6"> *</span></label
            >
            <b-row >
              <b-form-checkbox
                v-model="selected"
                value="A"
                class="custom-control-primary ml-1"
              >
                CP1
              </b-form-checkbox>
              <b-form-checkbox
                v-model="selected"
                value="A"
                class="custom-control-primar ml-1"
              >
                CP2
              </b-form-checkbox>
              <b-form-checkbox
                v-model="selected"
                value="A"
                class="custom-control-primary ml-1"
              >
                CE1
              </b-form-checkbox>

              <b-form-checkbox
                v-model="selected"
                value="A"
                class="custom-control-primary ml-1"
              >
                CE2
              </b-form-checkbox>

              <b-form-checkbox
                v-model="selected"
                value="A"
                class="custom-control-primary ml-1"
              >
                CM1
              </b-form-checkbox>

              <b-form-checkbox
                v-model="selected"
                value="A"
                class="custom-control-primary ml-1"
              >
                CM2
              </b-form-checkbox>

            </b-row>
          </b-col>

          <b-col v-if="selected === 'B'" class="6">
            <label for="niveau"
              >Niveau <span class="p-0 text-danger h6"> *</span></label
            >
            <b-row >
              <b-form-checkbox
                v-model="selected"
                value="B"
                class="custom-control-primary ml-1 mt-1"
              >
                6ème
              </b-form-checkbox>

              <b-form-checkbox
                v-model="selected"
                value="B"
                class="custom-control-primary ml-1 mt-1"
              >
                5ème
              </b-form-checkbox>

              <b-form-checkbox
                v-model="selected"
                value="B"
                class="custom-control-primary ml-1 mt-1"
              >
                4ème
              </b-form-checkbox>
              <b-form-checkbox
                v-model="selected"
                value="B"
                class="custom-control-primary ml-1 mt-1"
              >
                3ème
              </b-form-checkbox>
              <b-form-checkbox
                v-model="selected"
                value="B"
                class="custom-control-primary ml-1 mt-1"
              >
                2nde
              </b-form-checkbox>
              <b-form-checkbox
                v-model="selected"
                value="B"
                class="custom-control-primary ml-1 mt-1"
              >
                1ère
              </b-form-checkbox>
              <b-form-checkbox
                v-model="selected"
                value="B"
                class="custom-control-primary ml-1 mt-1"
              >
                Terminale
              </b-form-checkbox>
            </b-row>

          </b-col>
            <b-col v-if="selected === 'C'" class="6">
            <label for="niveau"
              >Niveau <span class="p-0 text-danger h6"> *</span></label
            >
            <b-row >            
              <b-form-checkbox
                v-model="selected"
                value="C"
                class="custom-control-primary ml-1 mt-1"
              >
                1ère année
              </b-form-checkbox>
              <b-form-checkbox
                v-model="selected"
                value="C"
                class="custom-control-primary ml-1 mt-1"
              >
                2ème année
              </b-form-checkbox>
              <b-form-checkbox
                v-model="selected"
                value="C"
                class="custom-control-primary ml-1 mt-1"
              >
                3ème année
              </b-form-checkbox>
              <b-form-checkbox
                v-model="selected"
                value="C"
                class="custom-control-primary ml-1 mt-1"
              >
                4ème année
              </b-form-checkbox>
              <b-form-checkbox
                v-model="selected"
                value="C"
                class="custom-control-primary ml-1 mt-1"
              >
                5ème année
              </b-form-checkbox>
            </b-row>
          </b-col>

          
        </b-row>

        <!-- <b-button id="togg1" variant="primary" type="submit"> text </b-button>
        <div id="d1">
          <p>Ce texte appartient au premier div de ma page</p>
          <p>Ce deuxième paragraphe également</p>
        </div> -->

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
    BCol,
    BButton,
  },
  data() {
    return {
      title: "",
      quartier: "",
      contact: "",
      email: "",
     selected: '',
      // sideImg: require("@/assets/images/pages/register-v2.svg"),
    };
  },

  async mounted() {
    try {
      await axios.get(URL.LIST_ETABLISSEMENT).then((response) => {
        this.returnData = response.data;
      });

      console.log(this.returnData);
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

    primaire(value) {
      if (condition) {
        
      }
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

    async save() {
      try {
        const config = {
          headers: {
            Accept: "application/json",
          },
        };
        const data = {
          title: this.title,
          quartier: this.quartier,
          contact: this.contact,
          email: this.email,
          // code: this.userId,
        };
        console.log(data);
        await axios
          .post(URL.CREATE_ETABLISSEMENT, data, config)
          .then((response) => {
            this.createEtablissement = response.data;

            if (response.data) {
              (this.title = ""),
                (this.quartier = ""),
                (this.contact = ""),
                (this.email = ""),
                this.topEnd();
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
