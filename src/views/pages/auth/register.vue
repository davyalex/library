<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <!-- Brand logo-->
      <b-link class="brand-logo">
        <vuexy-logo />

        <h2 class="brand-text text-primary ml-1">Vuexy</h2>
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col lg="8" class="d-none d-lg-flex align-items-center p-5">
        <div
          class="w-100 d-lg-flex align-items-center justify-content-center px-5"
        >
          <b-img fluid :src="imgUrl" alt="Register V2" />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Register-->
      <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-card-title title-tag="h2" class="font-weight-bold mb-1">
            Adventure starts here 🚀
          </b-card-title>
          <b-card-text class="mb-2">
            Make your app management easy and fun!
          </b-card-text>

          <!-- form -->
          <validation-observer ref="registerForm">
            <b-form class="auth-register-form mt-2" @submit.prevent>
              <!-- Nom -->
              <b-form-group label="Nom" label-for="nom">
                <validation-provider
                  #default="{ errors }"
                  name="nom"
                  rules="required"
                >
                  <b-form-input
                    v-model="nom"
                    @input="validateNom"
                    :state="errors.length > 0 ? false : null"
                    placeholder="john"
                  />
                  <small v-if="valideNom"
                    class="text-danger"
                  >
                    Veuillez entrer un nom
                  </small>
                </validation-provider>
              </b-form-group>

              <!-- Prenoms -->
              <b-form-group label="Prenoms" label-for="prenoms">
                <validation-provider
                  #default="{ errors }"
                  name="prenoms"
                  rules="required"
                >
                  <b-form-input
                    id="prenoms"
                    v-model="prenoms"
                    @input="validatePrenom"
                    :state="errors.length > 0 ? false : null"
                    name="prenoms"
                    placeholder="john"
                  />
                  <small
                     v-if="validePrenom"
                    class="text-danger"
                  >
                    Veuillez entrer un prenom
                  </small>
                </validation-provider>
              </b-form-group>

              <!-- contact -->

              <b-form-group label="phone" label-for="phone">
                <validation-provider
                  #default="{ errors }"
                  name="phone"
                  rules="required"
                >
                  <b-form-input
                    id="contact"
                    type="tel"
                    v-model="phone"
                    @input="validatePhone"
                    :state="errors.length > 0 ? false : null"
                    name="contact"
                    placeholder="000 000 000"
                  />
                  <small v-if="validePhone"
                    class="text-danger"
                  >
                    Veuillez entrer un numero de telephone
                  </small>
                </validation-provider>
              </b-form-group>

              <!-- email -->
              <b-form-group label="Email" label-for="register-email">
                <validation-provider
                  #default="{ errors }"
                  name="Email"
                  rules="required"
                >
                  <b-form-input
                    id="register-email"
                    type="email"
                    v-model="email"
                    @input="validateEmail"
                    name="register-email"
                    :state="errors.length > 0 ? false : null"
                    placeholder="xxx@example.com"
                  />
                  <small v-if="valideEmail"
                    class="text-danger"
                  >
                    Veuillez entrer un email valide
                  </small>
                   <small v-if="errorMsg"
                    class="text-danger"
                  >
                   {{ errorMsg }}
                  </small>
                </validation-provider>
              </b-form-group>

              <!-- password -->
              <b-form-group label-for="register-password" label="Password">
                <validation-provider
                  #default="{ errors }"
                  name="Password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <b-form-input
                      id="register-password"
                      v-model="password"
                      class="form-control-merge"
                      @input="validatePassword"
                      :type="passwordFieldType"
                      :state="errors.length > 0 ? false : null"
                      name="register-password"
                      placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        :icon="passwordToggleIcon"
                        class="cursor-pointer"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small
               v-if="validePassword"
                    class="text-danger"
                  >
                    Vous devez renseigner le mot de passe
                  </small>
                </validation-provider>
              </b-form-group>

              <!-- <b-form-group>
                <b-form-checkbox
                  id="register-privacy-policy"
                  v-model="status"
                  name="checkbox-1"
                >
                  I agree to
                  <b-link>privacy policy & terms</b-link>
                </b-form-checkbox>
              </b-form-group> -->

              <b-button
                variant="primary"
                block
                type="submit"
                @click.prevent="save"
                :disabled="loading === true ? true : false"
              >
                <div
                  v-if="loading === true"
                  class="spinner-border text-light"
                ></div>
                <span v-else> Enregistrer</span>
              </b-button>
            </b-form>
          </validation-observer>

          <p class="text-center mt-2">
            <span>Avez-vous déjà un compte?</span>
            <b-link :to="{ name: 'login' }">
              <span>&nbsp;Connectez-vous</span>
            </b-link>
          </p>

          <!-- divider -->
          <div class="divider my-2">
            <div class="divider-text">or</div>
          </div>

          <div class="auth-footer-btn d-flex justify-content-center">
            <b-button variant="facebook" href="javascript:void(0)">
              <feather-icon icon="FacebookIcon" />
            </b-button>
            <b-button variant="twitter" href="javascript:void(0)">
              <feather-icon icon="TwitterIcon" />
            </b-button>
            <b-button variant="google" href="javascript:void(0)">
              <feather-icon icon="MailIcon" />
            </b-button>
            <b-button variant="github" href="javascript:void(0)">
              <feather-icon icon="GithubIcon" />
            </b-button>
          </div>
        </b-col>
      </b-col>
      <!-- /Register-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import VuexyLogo from "@core/layouts/components/Logo.vue";
import {
  BRow,
  BCol,
  BLink,
  BButton,
  BForm,
  BFormCheckbox,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
  BImg,
  BCardTitle,
  BCardText,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import { required, email } from "@validations";
import { ValidationProvider, ValidationObserver } from "vee-validate";

import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import store from "@/store/index";
import axios from "axios";
import setAuthHeader from "../../../auth/jwt/token";
import URL, { APP_HOST } from "@/views/pages/request";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
  components: {
    VuexyLogo,
    BRow,
    BImg,
    BCol,
    BLink,
    BButton,
    BForm,
    BCardText,
    BCardTitle,
    BFormCheckbox,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    // validations
    ValidationProvider,
    ValidationObserver,
    setAuthHeader,
  },
  mixins: [togglePasswordVisibility],
   directives: {
    // "b-modal": VBModal,
    Ripple,
  },
  data() {
    return {
      status: "",
      nom: "",
      prenoms: "",
      email: "",
      phone: "",
      password: "",
      sideImg: require("@/assets/images/pages/register-v2.svg"),
      // validation
      required,
      email,
      valideNom:false,
      validePrenom:false,
      validePhone:false,
      valideEmail:false,
      validePassword:false,
      // valideStatus: false,
      loading: false,
      // email_exist:false,
      errorMsg:""
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require("@/assets/images/pages/register-v2-dark.svg");
        return this.sideImg;
      }
      return this.sideImg;
    },
  },
  methods: {
    //validation
    validateEmail() {
      // valid email regex pattern
      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!this.email.match(emailPattern)) {
        this.valideEmail = true;
      } else {
        this.valideEmail = false;
      }
    },
    validatePassword() {
      if (!this.password) {
        this.validePassword = true;
      } else {
        this.validePassword = false;
      }
    },
    validateNom() {
      if (!this.nom) {
        this.valideNom = true;
      } else {
        this.valideNom = false;
      }
    },
    validatePrenom() {
      if (!this.prenoms) {
        this.validePrenom = true;
      } else {
        this.validePrenom = false;
      }
    },

      validatePhone() {
      if (!this.phone) {
        this.validePhone = true;
      } else {
        this.validePhone = false;
      }
    },
    // validateStatus() {
    //   if (this.status == false || !this.status) {
    //     this.valideStatus = true;
    //     this.erreur = true;
    //     console.log("selectione");
    //   } else {
    //     this.valideStatus = false;
    //     this.erreur = false;
    //   }
    // },

    topEnd() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: "Inscription réussi",
          icon: "UserIcon",
          variant: "success",
        },
      });
    },

    async save() {
      try {
        this.validateEmail();
        this.validateNom();
        this.validatePrenom();
         this.validatePhone();
        this.validatePassword();
        const config = {
          headers: {
            Accept: "application/json",
          },
        };
       
        if (this.nom || this.prenoms || this.phone || this.email || this.password) {
       const data = {
          nom: this.nom,
          prenoms: this.prenoms,
          email: this.email,
          phone: this.phone,
          password: this.password,
        };
          this.loading = true;
        // console.log(data);
           await axios.post(URL.REGISTER+`/superadmin`, data, config).then((response) => {
          if (response.data) {
           
            this.loading = false;
            this.nom = "",
              this.prenoms = "",
              this.phone = "",
              this.email = "",
              this.password = "",
              this.topEnd();
            this.userData = response.data;
            console.log(this.userData);
            setAuthHeader(response.data.token);
            localStorage.setItem("token", this.userData.token);
            if (localStorage.getItem("token")) {
              localStorage.setItem("connected", true);
              this.$router.push({ name: "home" });
            }
          }
        });

        }
       
      
     
      } catch (error) {
        this.loading = false;
        this.errorMsg = error.response.data.message
        console.log(this.errorMsg.message);
      }
    },
  },
};
/* eslint-disable global-require */
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
