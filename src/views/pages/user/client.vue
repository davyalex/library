<template>
  <div class="">
    <!-- Modal pour ajouter un utilisateur -->
    <b-modal
      id="modal-add"
      ref="modalUser"
      cancel-variant="outline-secondary"
      ok-title="Créer"
      cancel-title="Annuler"
      centered
      hide-footer
      :title="'Ajouter un' + ' ' + userItem"
    >
      <validation-observer ref="registerForm">
        <b-form class="auth-register-form mt-2" @submit.prevent>
          <!-- code de l'etablissement -->
          <b-form-group
            label="code"
            label-for="code"
            v-if="userItem === 'client'"
          >
            <validation-provider
              #default="{ errors }"
              name="code"
              rules="required"
            >
              <b-form-input
                v-model="code"
                @input="validateCode"
                :state="errors.length > 0 ? false : null"
                placeholder="ETA009"
              />
              <small v-if="valideCode" class="text-danger">
                Veuillez entrer le code de l'etablissement'
              </small>
              <small v-if="valideExiste === true" class="text-danger">
                {{ code_exist }}
              </small>
            </validation-provider>
          </b-form-group>
          <!-- Nom -->
          <b-form-group
            label="Nom"
            label-for="nom"
            v-if="userItem !== 'etablissement'"
          >
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
              <small v-if="valideNom" class="text-danger">
                Veuillez entrer un nom
              </small>
            </validation-provider>
          </b-form-group>

          <!-- Prenoms -->
          <b-form-group
            label="Prenoms"
            label-for="prenoms"
            v-if="userItem !== 'etablissement'"
          >
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
              <small v-if="validePrenom" class="text-danger">
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
                type="number"
                v-model="phone"
                @input="validatePhone"
                :state="errors.length > 0 ? false : null"
                name="contact"
                placeholder="000 000 000"
              />
              <small v-if="validePhone" class="text-danger">
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
              <small v-if="valideEmail" class="text-danger">
                Veuillez entrer un email valide
              </small>
              <small v-if="emailList.length > 0" class="text-danger">
                Ce email est déja utilisé, veuillez renseigner un autre
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
              <small v-if="validePassword" class="text-danger">
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
    </b-modal>

    <!-- Modal pour modifier un utilisateur -->
    <b-modal
      id="modal-update"
      ref="modalUser"
      cancel-variant="outline-secondary"
      ok-title="Créer"
      cancel-title="Annuler"
      centered
      hide-footer
      :title="'Modifier un' + ' ' + roleUser"
    >
      <validation-observer ref="registerForm">
        <b-form class="auth-register-form mt-2" @submit.prevent>
          <!-- code de l'etablissement -->
          <b-form-group
            v-if="roleUser === 'client'"
            label="code"
            label-for="code"
          >
            <validation-provider
              #default="{ errors }"
              name="code"
              rules="required"
            >
              <b-form-input
                v-model="editCode"
                @input="validateCode"
                :state="errors.length > 0 ? false : null"
                placeholder="ETA009"
              />
            </validation-provider>
          </b-form-group>
          <!-- Nom -->
          <b-form-group
            label="Nom"
            label-for="nom"
            v-if="roleUser !== 'etablissement'"
          >
            <validation-provider
              #default="{ errors }"
              name="nom"
              rules="required"
            >
              <b-form-input
                v-model="editNom"
                @input="validateNom"
                :state="errors.length > 0 ? false : null"
                placeholder="john"
              />
            </validation-provider>
          </b-form-group>

          <!-- Prenoms -->
          <b-form-group
            label="Prenoms"
            label-for="prenoms"
            v-if="roleUser !== 'etablissement'"
          >
            <validation-provider
              #default="{ errors }"
              name="prenoms"
              rules="required"
            >
              <b-form-input
                id="prenoms"
                v-model="editPrenoms"
                @input="validatePrenom"
                :state="errors.length > 0 ? false : null"
                name="prenoms"
                placeholder="john"
              />
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
                type="number"
                v-model="editPhone"
                @input="validatePhone"
                :state="errors.length > 0 ? false : null"
                name="contact"
                placeholder="000 000 000"
              />
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
                v-model="editEmail"
                @input="validateEmail"
                name="register-email"
                :state="errors.length > 0 ? false : null"
                placeholder="xxx@example.com"
              />
              <small v-if="valideEmail" class="text-danger">
                Veuillez entrer un email valide
              </small>
            </validation-provider>
          </b-form-group>

          <!-- password -->
          <!-- <b-form-group label-for="register-password" label="Password">
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
              <small v-if="validePassword" class="text-danger">
                Vous devez renseigner le mot de passe
              </small>
            </validation-provider>
          </b-form-group> -->
          <b-button
            variant="primary"
            block
            type="submit"
            @click="updateUser"
            :disabled="loading === true ? true : false"
          >
            <div
              v-if="loading === true"
              class="spinner-border text-light"
            ></div>
            <span v-else> Modifier</span>
          </b-button>
        </b-form>
      </validation-observer>
    </b-modal>

    <!-- Tableau pour afficher les users -->
    <div class="tableau">
      <b-card no-body class="py-1">
        <!-- Le haut du tableau contenant les barre de recherche et bouton d'ajout de nouvel user -->
        <b-row class="py-2 px-2">
          <!-- Per Page -->
          <b-col
            cols="12"
            md="6"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0 mt-1"
          >
            <label>Entrées</label>
            <v-select
              v-model="perPage"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="perPageOptions"
              :clearable="false"
              class="per-page-selector d-inline-block ml-50 mr-1"
            />

            <!-- primary -->
            <b-dropdown
              id="dropdown-1"
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              text="+ Ajouter un utilisateur"
              variant="primary"
            >
              <b-dropdown-item
                v-b-modal.v-b-modal.modal-add
                @click="getName('admin')"
              >
                <feather-icon icon="UserIcon" />
                <span class="align-middle ml-50"
                  >Ajouter un administrateur</span
                >
              </b-dropdown-item>

              <b-dropdown-item
                v-b-modal.v-b-modal.modal-add
                @click="getName('etablissement')"
              >
                <feather-icon icon="UserIcon" />
                <span class="align-middle ml-50">Ajouter un etablissement</span>
              </b-dropdown-item>

              <b-dropdown-item
                v-b-modal.v-b-modal.modal-add
                @click="getName('client')"
              >
                <feather-icon icon="UserIcon" />
                <span class="align-middle ml-50">Ajouter un client</span>
              </b-dropdown-item>

              <b-dropdown-item
                v-b-modal.v-b-modal.modal-add
                @click="getName('livreur')"
              >
                <feather-icon icon="UserIcon" />
                <span class="align-middle ml-50">Ajouter un livreur</span>
              </b-dropdown-item>
            </b-dropdown>
          </b-col>

          <!-- Search -->
          <b-col cols="12" md="6" class="mt-1">
            <div class="d-flex align-items-center justify-content-end">
              <b-input-group class="input-group-merge">
                <!-- <b-input-group-prepend is-text  class="px-1">
                  <feather-icon icon="SearchIcon" />
                </b-input-group-prepend> -->
                <b-form-input
                  v-model="filtreusers"
                  class="d-inline-block mr-1"
                  placeholder="Rechercher par : nom, role, date..."
                />
              </b-input-group>
            </div>
          </b-col>
        </b-row>

        <!-- Le tableau affichant les users -->
        <b-table
          hover
          responsive
          :per-page="perPage"
          :current-page="currentPage"
          :items="users"
          :fields="tableColumns"
          :filter="filtreusers"
          show-empty
          empty-text=""
          class="bg-white"
        >
          <template #cell(created_at)="data">
            {{ format_date(data.item.created_at) }}
          </template>

          <template #cell(role)="data">
            <div
              class="badge badge-light-success badge-pill font-weight-bol"
              v-if="data.item.roles.length > 0"
            >
              {{ data.item.roles[0].name }}
            </div>
          </template>

          <template #cell(actions)="data">
            <div class="text-nowrap py-1 text-center">
              <!-- Dropdown -->

              <feather-icon
                v-b-modal.v-b-modal.modal-update
                icon="Edit3Icon"
                :id="`invoice-row-${data.item.id}-Edit3-icon`"
                size="16"
                class="cursor-pointer text-info mr-1"
                @click="update(data.item)"
              />
              <feather-icon
                icon="TrashIcon"
                :id="`invoice-row-${data.item.id}-Trash-icon`"
                size="16"
                class="cursor-pointer text-danger"
                @click="destroy(data.item.id)"
              />
            </div>
          </template>
        </b-table>

        <!-- Les boutons de pagination -->
        <div class="mx-2 mb-2 pb-1">
          <b-row>
            <b-col
              cols="12"
              sm="6"
              class="d-flex align-items-center justify-content-center justify-content-sm-start"
            >
              <span class="text-muted"></span>
            </b-col>
            <!-- Pagination -->
            <b-col
              cols="12"
              sm="6"
              class="d-flex align-items-center justify-content-center justify-content-sm-end"
            >
              <b-pagination
                v-model="currentPage"
                :total-rows="pTotal"
                :per-page="perPage"
                first-number
                last-number
                class="mb-0 mt-1 mt-sm-0"
                prev-class="prev-item"
                next-class="next-item"
              >
                <template #prev-text>
                  <feather-icon icon="ChevronLeftIcon" size="18" />
                </template>
                <template #next-text>
                  <feather-icon icon="ChevronRightIcon" size="18" />
                </template>
              </b-pagination>
            </b-col>
          </b-row>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BModal,
  BFormInput,
  BFormGroup,
  BButton,
  VBModal,
  BForm,
  BLink,
  BCard,
  BFormCheckbox,
  BInputGroup,
  BInputGroupAppend,
  BImg,
  BPagination,
  BTable,
  BFormTextarea,
  BDropdown,
  BDropdownItem,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import { required, email } from "@validations";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import vSelect from "vue-select";
import URL from "@/views/pages/request";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";

import axios from "axios";
import moment from "moment";
import flatPickr from "vue-flatpickr-component";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
  components: {
    flatPickr,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BModal,
    moment,
    BFormGroup,
    VBModal,
    BForm,
    BLink,
    BFormCheckbox,
    BInputGroup,
    BImg,
    required,
    email,
    ValidationProvider,
    ValidationObserver,
    vSelect,
    axios,
    BCard,
    BPagination,
    BTable,
    BInputGroupAppend,
    BFormTextarea,
    BDropdown,
    BDropdownItem,
  },
  mixins: [togglePasswordVisibility],
  directives: {
    Ripple,
  },
  data() {
    return {
      nom: "",
      prenoms: "",
      email: "",
      phone: "",
      password: "",
      code: "",
      required,
      email,
      valideNom: false,
      valideCode: false,
      validePrenom: false,
      validePhone: false,
      valideEmail: false,
      validePassword: false,
      valideExiste: false,
      code_exist: false,
      valideEmailExiste: false,
      email_exist: false,
      // valideStatus: false,

      //edit
      editCode: "",
      editNom: "",
      editPrenoms: "",
      editEmail: "",
      editPhone: "",
      role: "",
      loading: false,
      roleUser: "",

      // errorMsg: "",
      emailList: "",
      users: [],
      etablissements: [],
      userItem: [],
      recoverUserInfos: "",
      perPage: 5,
      currentPage: 1,
      pTotal: 0,
      tableColumns: [
        { key: "code", label: "Code", sortable: true },
        { key: "nom", label: "nom", sortable: true },
        { key: "prenoms", label: "prenom", sortable: true },
        { key: "email", label: "email", sortable: true },
        { key: "phone", label: "contact", sortable: true },
        { key: "role", label: "role", sortable: true },
        { key: "created_at", label: "crée le", sortable: true },
        { key: "actions" },
      ],
      filtreusers: "",
      perPageOptions: [30, 50, 100],
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
  },

  async mounted() {
    document.title = "Utilisateur";

    try {
      await axios.get(URL.LIST_USER).then((response) => {
        this.users = response.data.liste;
        this.pTotal = this.users.length;
      });

      await axios.get(URL.LIST_ETABLISSEMENT).then((response) => {
        this.etablissements = response.data.etablissements;
        console.log("liste", this.etablissements);
      });
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    topEnd() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: "Enregistrement réussi",
          icon: "ThumbsUpIcon",
          variant: "success",
        },
      });
    },

    topEndE() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: "modification reussi avec success",
          icon: "ThumbsUpIcon",
          variant: "success",
        },
      });
    },

    //update
    update(data) {
      const userInfo = data;
      localStorage.setItem("userInfos", JSON.stringify(userInfo));
      this.recoverUserInfos = JSON.parse(localStorage.getItem("userInfos"));

      this.editNom = this.recoverUserInfos.nom;
      this.editPrenoms = this.recoverUserInfos.prenoms;
      this.editEmail = this.recoverUserInfos.email;
      this.editPhone = this.recoverUserInfos.phone;
      const codeEta = this.etablissements.filter((item) => {
        return item.id === this.recoverUserInfos.etablissement_id;
      });
      console.log("eee", codeEta[0].code);
      this.editCode = codeEta[0].code;

      this.roleUser = this.recoverUserInfos.roles[0].name;

      console.log(this.roleUser);
    },

    //formatage date
    format_date(value) {
      if (value) {
        return moment(String(value)).format("DD-MM-YYYY");
      }
    },
    //envoi des item en localStorage
    getName(item) {
      console.log("item", item);
      localStorage.setItem("userItem", item);

      this.userItem = localStorage.getItem("userItem");
      console.log("userItem", this.userItem);
    },
    //validation
    //validation
    validateEmail() {
      // valid email regex pattern
      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!this.email.match(emailPattern)) {
        this.valideEmail = true;
      } else {
        this.valideEmail = false;
      }

      this.emailList = this.users.filter((item) => {
        return item.email === this.email;
      });
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

    validateCode() {
      if (!this.code) {
        this.valideCode = true;
        this.code_exist = "";
      } else {
        this.valideCode = false;
      }
      for (let index = 0; index < this.etablissements.length; index++) {
        if (this.code !== this.etablissements[index].code) {
          this.valideExiste = true;
          this.code_exist =
            "Ce code n'existe pas, veuillez renseigner un autre";
        } else {
          this.valideExiste = false;
          this.code_exist = "";
        }
      }

      if (!this.code) {
        this.valideExiste = false;
        this.code_exist = "";
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

    existEmail() {
      this.emailList = this.users.filter((item) => {
        return item.email === this.email;
      });

      console.log(this.emailList.length);
      if (this.emailList.length > 0) {
        this.valideEmailExiste = true;
      } else {
        this.valideEmailExiste = false;
      }
    },

    async save() {
      try {
        this.validateEmail();
        this.validateNom();
        this.validatePrenom();
        this.validatePhone();

        if (this.userItem === "client") {
          this.validateCode();
        }
        const config = {
          headers: {
            Accept: "application/json",
          },
        };

        if (
          this.nom ||
          this.prenoms ||
          this.phone ||
          this.email ||
          this.password
        ) {
          const data = {
            nom: this.nom,
            prenoms: this.prenoms,
            email: this.email,
            phone: this.phone,
            password: this.password,
            role: this.userItem,
            code: this.code,
          };
          this.loading = true;
          // console.log(data);
          await axios
            .post(URL.USER_STORE + `/${data.role}`, data, config)
            .then((response) => {
              if (response.data) {
                this.loading = false;
                this.$refs.modalUser.hide();

                (this.nom = ""),
                  (this.prenoms = ""),
                  (this.phone = ""),
                  (this.email = ""),
                  (this.password = ""),
                  (this.code = ""),
                  this.topEnd();
                this.users.unshift(response.data.user);
                console.log(this.users);
              }
            });
        }
      } catch (error) {
        this.loading = false;
        // this.errorMsg = error.response.data.message;
        // console.log(this.errorMsg.message);
      }
    },

    async updateUser(bvModalEvt) {
      try {
        //  this.validateEmail();
        // this.validateNom();
        // this.validatePrenom();
        // this.validatePhone();

        // if (this.roleUser === "client") {
        //   this.validateCode();
        // }
        const config = {
          headers: {
            Accept: "application/json",
          },
        };

  
          const data = {
            id: this.recoverUserInfos.id,
            nom: this.editNom,
            prenoms: this.editPrenoms,
            email: this.editEmail,
            phone: this.editPhone,
            // code: this.code,
          };
          this.loading = true;
          console.log(data);
          await axios
            .post(URL.USER_UPDATE + `/${data.id}`, data, config)
            .then((response) => {
              if (response.data) {
                this.loading = false;
                this.$refs.modalUser.hide();
                this.topEnd();
                (this.editNom = ""),
                  (this.editPrenoms = ""),
                  (this.editEmail = ""),
                  (this.editPhone = ""),
                  
                this.users.unshift(data);
                
                console.log(this.users);
                 axios.get(URL.LIST_USER).then((response) => {
              this.users = response.data.liste;
              this.pTotal = this.users.length;
            });
              }
            });
       
      } catch (error) {
        this.loading = false;
        // this.errorMsg = error.response.data.message;
        // console.log(this.errorMsg.message);
              bvModalEvt.preventDefault();

      }
    },

    //destroy
    async deleteusers(indentifiant) {
      const id = {
        id: indentifiant,
      };
      const config = {
        headers: {
          Accept: "application/json",
        },
      };
      try {
        await axios
          .post(URL.USER_DESTROY + `/${id.id}`, config)
          .then((response) => {
            response.data;
            axios.get(URL.LIST_USER).then((response) => {
              this.users = response.data.liste;
              console.log("liste", this.users);
              this.pTotal = this.users.length;
            });
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response.data);
            }
          });
        this.users.splice(index, 1);
      } catch (error) {
        console.log(error.type);
      }
    },

    destroy(id) {
      this.$swal({
        title: "Êtes vous sûr?",
        text: "Ce utilisateur sera supprimé définitivement !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Oui",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-outline-danger ml-1",
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          this.deleteusers(id);
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
@import "@core/scss/vue/libs/vue-flatpicker.scss";
.table-base {
  margin: 30px auto 0;
}

.tableau {
  box-shadow: 0px 6px 46px -21px rgba(0, 0, 0, 0.75);
}

.table-card {
  width: 100%;
  margin: auto;
  border-radius: 13px;
}

.table-card thead tr {
  border-radius: 13px;
  background-color: rgb(68, 68, 68) !important;
}

.table-card thead tr th {
  background-color: rgb(68, 68, 68) !important;
  color: white;
}

.add-btn {
  position: absolute;
  right: 0;
  top: -50px;
  background-color: #450077;
}
.none {
  display: none;
}
.block {
  display: inline-block;
}
</style>
