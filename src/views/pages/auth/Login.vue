<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <!-- Brand logo-->
      <b-link class="brand-logo">
        <vuexy-logo />
        <h2 class="brand-text text-success ml-1">Librairie siloe</h2>
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col lg="8" class="d-none d-lg-flex align-items-center p-5">
        <div
          class="w-100 d-lg-flex align-items-center justify-content-center px-5"
        >
          <b-img fluid :src="imgUrl" alt="Login V2" />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-card-title title-tag="h2" class="font-weight-bold mb-1">
            Welcome to Vuexy! 👋
          </b-card-title>
          <b-card-text class="mb-2 text-center" v-if="error_login">
            <span class="text-danger"> {{ msg_error }}</span>
          </b-card-text>

          <!-- form -->
          <validation-observer ref="loginValidation">
            <b-form class="auth-login-form mt-2" @submit.prevent>
              <!-- email -->

              <b-form-group label="Email" label-for="login-email">
                <validation-provider
                  #default="{ errors }"
                  name="Email"
                  rules="required|email"
                >
                  <b-form-input
                    id="login-email"
                    v-model="email"
                    :state="errors.length > 0 ? false : null"
                    name="login-email"
                    placeholder="john@example.com"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- forgot password -->
              <b-form-group>
                <div class="d-flex justify-content-between">
                  <label for="login-password">Password</label>
                  <b-link :to="{ name: 'auth-forgot-password-v2' }">
                    <small>Forgot Password?</small>
                  </b-link>
                </div>
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
                      id="login-password"
                      v-model="password"
                      :state="errors.length > 0 ? false : null"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      name="login-password"
                      placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- checkbox -->
              <b-form-group>
                <b-form-checkbox
                  id="remember-me"
                  v-model="status"
                  name="checkbox-1"
                >
                  Se souvenir de moi
                </b-form-checkbox>
              </b-form-group>

              <!-- submit buttons -->
              <b-button type="submit" variant="primary" block @click="save">
                Connexion
              </b-button>
            </b-form>
          </validation-observer>

          <b-card-text class="text-center mt-2">
            <span>Etre vous nouveau? </span>
            <b-link :to="{ name: 'register' }">
              <span>&nbsp;Créer un compte</span>
            </b-link>
          </b-card-text>

          <!-- divider -->
          <div class="divider my-2">
            <div class="divider-text">or</div>
          </div>

          <!-- social buttons -->
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
      <!-- /Login-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VuexyLogo from "@core/layouts/components/Logo.vue";
import {
  BRow,
  BCol,
  BLink,
  BFormGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroup,
  BFormCheckbox,
  BCardText,
  BCardTitle,
  BImg,
  BForm,
  BButton,
} from "bootstrap-vue";
import { required, email } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import store from "@/store/index";
import URL, { APP_HOST } from "@/views/pages/request";
import setAuthHeader from "../../../auth/jwt/token";
import axios from "axios";
// import axios from "axios";
// import URL from "@/views/pages/request";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    VuexyLogo,
    axios,
    ValidationProvider,
    ValidationObserver,
    setAuthHeader,
  },
  mixins: [togglePasswordVisibility],

  data() {
    return {
      status: "",
      password: "",
      email: "",
      sideImg: require("@/assets/images/pages/login-v2.svg"),
      // validation rulesimport store from '@/store/index'
      required,
      email,
      error_login: false,
      msg_error: "",
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require("@/assets/images/pages/login-v2-dark.svg");
        return this.sideImg;
      }
      return this.sideImg;
    },
  },
  methods: {
    topEnd() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: "Connexion réussi",
          icon: "UserIcon",
          variant: "success",
        },
      });
    },

    topEndError() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: "Erreur de connexion",
          icon: "UserIcon",
          variant: "danger",
        },
      });
    },

    async save() {
      try {
        // e.preventDefault();
        // this.marche = true;
        const data = {
          email: this.email,
          password: this.password,
          // code: this.userId,
        };
        const config = {
          headers: {
            Accept: "application/json",
          },
        };
        // this.bouton = "";
        // this.validateEmail();
        // this.validatePassword();
        await axios.post(URL.LOGIN, data, config).then((response) => {
          this.userData = response.data;
          console.log("userConnect", this.userData[3]);
          localStorage.clear()
          if (this.userData[3] !== "superadmin") {
            this.$router.push({ name: "404" });
          }

          if (this.userData[3] !== "admin") {
            this.$router.push({ name: "404" });
          }
          if (
            this.userData[3] === "superadmin" ||
            this.userData[3] === "admin"
          ) {
            setAuthHeader(response.data[1]);
            localStorage.setItem("token", this.userData[1]);
            localStorage.setItem("user", JSON.stringify(this.userData[2]));
          }
          if (localStorage.getItem("token")) {
            localStorage.setItem("connected", true);
            localStorage.setItem("user", JSON.stringify(this.userData[2]));

            // this.$router.push({ name: "home" });
            location.assign('/')
          }
          if (this.userData === "mauvaises informations entrées") {
            this.error_login = true;
            this.topEndError();
            this.msg_error = "Email ou mot de passe incorrect";
            localStorage.setItem("connected", false);
            this.$router.push({ name: "login" });
          } else {
            this.error_login = false;
            this.topEnd();
          }
        });
      } catch (error) {
        console.log(error);
      }
      // this.$route.push('/register')
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
