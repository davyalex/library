<template>
  <validation-observer ref="simpleRules">
    <b-form  @submit.prevent>
      <b-card>
        <b-row>
          <b-col class="3">
            <b-form-group label-for="title">
            <label for="title">Nom de l'etablissement <span class="p-0 text-danger h6"> *</span></label>

              <validation-provider
                #default="{ errors }"
                name="tilte"
                rules="required"
              >
                <b-form-input
                  id="tilte"
                  type="text"
                  v-model="tilte"
                  :state="errors.length > 0 ? false : null"
                  placeholder="EPP - Etablissement "
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- <b-col class="3">
            <b-form-group label="" label-for="Commune">
              <label for="Commune">Commune <span class="p-0 text-danger h6"> *</span></label>
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
          </b-col> -->
          <b-col class="3">
            <b-form-group label="" label-for="quartier">
              <label for="quartier">Quartier <span class="p-0 text-danger h6"> *</span></label>

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
            ><b-form-group label="" label-for="phone">
              <label for="phone">Contact <span class="p-0 text-danger h6"> *</span></label>

              <validation-provider
                #default="{ errors }"
                name="phone"
                rules="required"
              >
                <b-form-input
                  id="phone"
                  type="text"
                  v-model="phone"
                  :state="errors.length > 0 ? false : null"
                  placeholder="000 0000 000"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col class="3"
            ><b-form-group label="" label-for="email">
              <label for="email">Email <span class="p-0 text-danger h6"> *</span></label>
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
          <!-- <b-col class="3">
            <label for="">Type d'enseignement<span class="p-0 text-danger h6"> *</span></label>
            <validation-provider #default="{}" name="enseignement_id" rules="required">
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
          </b-col> -->
        </b-row>

        <!-- <b-row>
          <b-col class="6">
            <label for="">Diocèse <span class="p-0 text-danger h6"> *</span></label>
            <validation-provider #default="{}" name="diocese_id" rules="required">
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
          <b-col class="6">
            <label for="">Sedec <span class="p-0 text-danger h6"> *</span></label>
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
        </b-row> -->
        <!-- login button -->
        <b-col cols="12 mt-2">
          <b-button
            variant="primary"
            type="submit"
            @click="save"
          >
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
// import { BCard, BCardText } from "bootstrap-vue";

import {
  BFormInput,
  BFormGroup,
  BForm,
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
      phone: "",
      email: "",
      // sideImg: require("@/assets/images/pages/register-v2.svg"),
    };
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
        quarier: this.quartier,
        phone: this.contact,
        email: this.email,
        // code: this.userId,
      };
      await axios.post(URL.CREATE_ETABLISSEMENT, data, config).then((response) => {
        this.createEtablissement = response.data
      
      });
    } catch (error) {
      console.log(error);
    }
  },


  methods: {
    validationForm() {
      this.$refs.simpleRules.validate().then((success) => {
        if (success) {
          // eslint-disable-next-line
          alert("login successfully");
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
