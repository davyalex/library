<template>
  <validation-observer ref="simpleRules">
    <b-form @submit.prevent>
      <b-card>
        <b-row>
          <b-col cols="4">
            <b-form-group label-for="title">
              <label for="title"
                >nom de l'article
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
                  placeholder="Cahier"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col cols="2">
            <b-form-group label="" label-for="prix">
              <label for="prix"
                >Prix <span class="p-0 text-danger h6"> *</span></label
              >
              <validation-provider
                #default="{ errors }"
                name="prix"
                rules="required"
              >
                <b-form-input
                  id="ommune"
                  type="text"
                  v-model="prix"
                  :state="errors.length > 0 ? false : null"
                  placeholder="1000"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

            <b-col cols="2">
            <b-form-group label-for="title">
              <label for="title"
                >Quantité
                <span class="p-0 text-danger h6"> </span></label
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
                  placeholder="00 00 00"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

            <b-col cols="4">
              <b-form-group label="">
                  <label for="title"
                >Catégorie de l'article
                <span class="p-0 text-danger h6"> *</span></label
              >
            <v-select
              v-model="categorie"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="libelle"
              placeholder="Choisir la catégorie du produit"
            >
            </v-select>
  
            <div class="row d-flex mb-1" v-if="addNewCategorie === true">
              <div class="col-11 mr-0 pr-0">
                <validation-provider
                  #default="{ errors }"
                  name="newcategorieValue"
                >
                  <b-form-input
                    id="register-nom"
                    v-model="categorieNewValue"
                    name="categorieNewValue"
                    :state="errors.length > 0 ? false : null"
                    placeholder="Ajouter un article"
                  />
                </validation-provider>
                <span
                  class="text-danger"
                  style="font-size: 12px"
                  v-if="errorInput.path === 'categories'"
                >
                  {{ errorInput.message }}
                </span>
              </div>
  
              <div class="col-1 m-auto pl-1">
                <feather-icon
                  @click="addNewCategorie = false"
                  icon="XCircleIcon"
                  class="caticon"
                  style="font-size: 38px;"
                />
              </div>
            </div>
          </b-form-group>
          </b-col>
        </b-row>


            <!-- DUPLICATEUR -->
      <div ref="form" class="repeater-form" :style="{ height: trHeight }">
        <b-row
          v-for="(item, index) in multiProspects"
          :key="index"
          ref="row"
          class="pb-2"
        >
          <!-- Item Form -->
          <!-- ? This will be in loop => So consider below markup for single item -->
          <b-col cols="12">
            <div class="d-flex border rounded">
              <b-row class="flex-grow-1 p-2">
          <b-col cols="4">
            <b-form-group label-for="title">
              <label for="title"
                >nom de l'article
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
                  placeholder="Cahier"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col cols="2">
            <b-form-group label="" label-for="prix">
              <label for="prix"
                >Prix <span class="p-0 text-danger h6"> *</span></label
              >
              <validation-provider
                #default="{ errors }"
                name="prix"
                rules="required"
              >
                <b-form-input
                  id="ommune"
                  type="text"
                  v-model="prix"
                  :state="errors.length > 0 ? false : null"
                  placeholder="1000"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

            <b-col cols="2">
            <b-form-group label-for="title">
              <label for="title"
                >Quantité
                <span class="p-0 text-danger h6"> </span></label
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
                  placeholder="00 00 00"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
                <!-- article jumelé -->
                <b-col cols="4" md="4" class="m-auto">
                  <b-form-group label="" label-for="register-libelle">
                    <label for=""
                      >Categorie de l'article<span class="p-0 text-danger h6"></span></label
                    >
                    <v-select
                      v-model="item.selectedProspect"
                      placeholder="Selectionnez une categorie"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      rules="required"
                      label="nom"
                      :options="prospectList"
                      @input="(val) => updateItemForm(index, val)"
                    >
                    </v-select>
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
            Jumeler un article
          </b-button>
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
import { ref, onUnmounted } from '@vue/composition-api'
import URL, { APP_HOST } from "@/views/pages/request";
import { heightTransition } from '@core/mixins/ui/transition'

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

       multiProspects: [],

      multiProspectItem: {
        selectedProspect: "",
        selectedProspectId: "",
      },
      // sideImg: require("@/assets/images/pages/register-v2.svg"),
    };
  },

  async mounted() {
        this.initTrHeight()

    try {
      await axios.get(URL.LIST_ETABLISSEMENT).then((response) => {
        this.returnData = response.data;
      });

      console.log(this.returnData);
    } catch (error) {
      console.log(error);
    }
  },

 mixins: [heightTransition],
  created() {
    window.addEventListener('resize', this.initTrHeight)
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },

  methods: {
  
    updateItemForm(index, val) {
      const { id } = val;
      this.multiProspects[index].selectedProspectId = id;
      console.log(this.multiProspects[0].selectedProspect.nom);
      // console.log('aaa:',this.multiProspects[0].selectedProspect)
    },

    addNewItemInItemForm() {
            this.$refs.form.style.overflow = 'hidden'

      this.multiProspects.push(
        JSON.parse(JSON.stringify(this.multiProspectItem))
      )
       this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight)
        setTimeout(() => {
          this.$refs.form.style.overflow = null
        }, 350)
      })
    },

    removeItem(index) {
      this.multiProspects.splice(index, 1);
      this.trTrimHeight(this.$refs.row[0].offsetHeight);
    },

     
 initTrHeight() {
      this.trSetHeight(null)
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form.scrollHeight)
      })
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
