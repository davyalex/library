<template>

  <div class="row">

       <!-- Modal pour affecter une commande au livreur -->
    <b-modal
      id="modal-send"
      ref="modalUser"
      cancel-variant="outline-secondary"
      ok-title="Créer"
      cancel-title="Annuler"
      centered
      hide-footer
    :title="'Affecter la commande N°' + recoverCommande.code"
    >
      <validation-observer ref="registerForm">
        <b-form class="auth-register-form mt-2" @submit.prevent>
          <!-- code de commande -->
          <b-form-group label="" label-for="register-libelle">
            <label for=""
              >Choisir un livreur<span class="p-0 text-danger h6"></span
            ></label>
            <v-select
              v-model="livreur"
              @input="validateLivreur"
              placeholder="Selectionnez un livreur"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              rules="required"
              label="nom"
              :options="users"
            >
              <template v-slot:option="option">
                {{ option.nom }}
                {{ option.prenoms }}
              </template>
            </v-select>
          </b-form-group>

          <b-form-group label="Prenom" label-for="code" v-if="livreur">
            <validation-provider
              #default="{ errors }"
              name="code"
              rules="required"
            >
              <b-form-input
                v-model="prenom"
                :state="errors.length > 0 ? false : null"
                placeholder="ETA009"
                disabled
              />
            </validation-provider>
          </b-form-group>

          <b-form-group label="Contact" label-for="code" v-if="livreur">
            <validation-provider
              #default="{ errors }"
              name="code"
              rules="required"
            >
              <b-form-input
                v-model="contact"
                :state="errors.length > 0 ? false : null"
                placeholder="ETA009"
                disabled
              />
            </validation-provider>
          </b-form-group>

          <b-form-group label="Email" label-for="code" v-if="livreur">
            <validation-provider
              #default="{ errors }"
              name="code"
              rules="required"
            >
              <b-form-input
                v-model="email"
                :state="errors.length > 0 ? false : null"
                placeholder="ETA009"
                disabled
              />
            </validation-provider>
          </b-form-group>
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
            <span v-else> <feather-icon icon="SendIcon" /> Affecter</span>
          </b-button>
        </b-form>
      </validation-observer>
    </b-modal>
    <div class="col-md-12">
    
        <div class="card-body float-right pb-1 pt-0">
            <div class="demo-inline-spacing">
    <b-button
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      variant="primary"
      v-b-modal.v-b-modal.modal-send
    >
     <feather-icon icon="SendIcon" />
     Affecter
    </b-button>

    <b-button
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      variant="danger"
      @click="destroy(recoverCommande.id)"
    >
     <feather-icon icon="TrashIcon" />
     Supprimer
    </b-button>
  </div>
        </div>
   
    </div>

    <div class="col-md-6">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">
            <feather-icon icon="ShoppingCartIcon" />

            Details commandes
          </h4>
          <hr />

          <div class="row">
            <div class="col-md-6">
              <p class="card-text font-weight-bold">
                N° commande <br /><span
                  class="badge badge-light-info badge-pill font-weight-bol"
                >
                  {{ recoverCommande.code }}
                </span>
              </p>
              <p class="card-text font-weight-bold">
                Total HT <br /><span
                  class="badge badge-light-info badge-pill font-weight-bol"
                >
                  {{ recoverCommande.total_ht }} FCFA</span
                >
              </p>
              <p class="card-text font-weight-bold">
                Remise <br /><span
                  class="badge badge-light-info badge-pill font-weight-bol"
                >
                  {{ recoverCommande.total_remise }} FCFA</span
                >
              </p>
              <p class="card-text font-weight-bold">
                Montant livraison <br /><span
                  class="badge badge-light-info badge-pill font-weight-bol"
                >
                  {{ recoverCommande.total_livraison }} FCFA</span
                >
              </p>
              <p class="card-text font-weight-bold">
                Montant Total<br /><span
                  class="badge badge-light-info badge-pill font-weight-bol"
                >
                  {{ recoverCommande.total_ttc }} FCFA</span
                >
              </p>
            </div>

            <div class="col-md-6">
              <p class="card-text font-weight-bold">
                Date de livraison prevue <br /><span
                  class="badge badge-light-info badge-pill font-weight-bol"
                >
                  {{ recoverCommande.livraison_prevue }}
                </span>
              </p>
              <p class="card-text font-weight-bold">
                Date de livraison exacte <br /><span
                  class="badge badge-light-info badge-pill font-weight-bol"
                >
                  {{ recoverCommande.livraison_exacte }}</span
                >
              </p>
              <p class="card-text font-weight-bold">
                Total HT <br /><span
                  class="badge badge-light-info badge-pill font-weight-bol"
                >
                  {{ recoverCommande.total_ht }} FCFA</span
                >
              </p>
              <p class="card-text font-weight-bold">
                Etat <br /><span
                  class="badge badge-light-info badge-pill font-weight-bol"
                >
                  {{ recoverCommande.etat.title }}</span
                >
              </p>

               <p class="card-text font-weight-bold">
                Statut <br /><span
                  class="badge badge-light-info badge-pill font-weight-bol"
                >
                  {{ recoverCommande.status }}</span
                >
              </p>

                <p class="card-text font-weight-bold">
                Livreur <br /><span
                  class="badge badge-light-info badge-pill font-weight-bol"
                >
                  {{ recoverCommande.livreur.nom }}</span
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-6">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">
            <feather-icon icon="UserIcon" />

            Details client
          </h4>
          <hr />
          <p class="card-text font-weight-bold">
            Nom <br /><span
              class="badge badge-light-info badge-pill font-weight-bol"
            >
              {{ recoverCommande.client.nom }}</span
            >
          </p>

          <p class="card-text font-weight-bold">
            Prenoms <br /><span
              class="badge badge-light-info badge-pill font-weight-bol"
            >
              {{ recoverCommande.client.prenoms }}</span
            >
          </p>

          <p class="card-text font-weight-bold">
            Contact <br /><span class="badge badge-light-info font-weight-bol">
              {{ recoverCommande.client.phone }}</span
            >
          </p>

          <p class="card-text font-weight-bold">
            Email <br /><span
              class="badge badge-light-info badge-pill font-weight-bol"
            >
              {{ recoverCommande.client.email }}</span
            >
          </p>
        </div>
      </div>
    </div>

    <div class="col-md-6">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">
            <feather-icon icon="BookOpenIcon" />

            Details kit
          </h4>
          <hr />

          <div class="row">
            <div class="col-md-6">
              <p class="card-text font-weight-bold">
                N° commande <br /><span
                  class="badge badge-light-info badge-pill font-weight-bol"
                >
                  {{ recoverCommande.code }}
                </span>
              </p>
              <p class="card-text font-weight-bold">
                Total HT <br /><span
                  class="badge badge-light-info badge-pill font-weight-bol"
                >
                  {{ recoverCommande.total_ht }} FCFA</span
                >
              </p>
              <p class="card-text font-weight-bold">
                Remise <br /><span
                  class="badge badge-light-info badge-pill font-weight-bol"
                >
                  {{ recoverCommande.total_remise }} FCFA</span
                >
              </p>
              <p class="card-text font-weight-bold">
                Montant livraison <br /><span
                  class="badge badge-light-info badge-pill font-weight-bol"
                >
                  {{ recoverCommande.total_livraison }} FCFA</span
                >
              </p>
              <p class="card-text font-weight-bold">
                Montant Total<br /><span
                  class="badge badge-light-info badge-pill font-weight-bol"
                >
                  {{ recoverCommande.total_ttc }} FCFA</span
                >
              </p>
            </div>

            <div class="col-md-6">
              <p class="card-text font-weight-bold">
                Date de livraison prevue <br /><span
                  class="badge badge-light-info badge-pill font-weight-bol"
                >
                  {{ recoverCommande.livraison_prevue }}
                </span>
              </p>
              <p class="card-text font-weight-bold">
                Date de livraison exacte <br /><span
                  class="badge badge-light-info badge-pill font-weight-bol"
                >
                  {{ recoverCommande.livraison_exacte }}</span
                >
              </p>
              <p class="card-text font-weight-bold">
                Total HT <br /><span
                  class="badge badge-light-info badge-pill font-weight-bol"
                >
                  {{ recoverCommande.total_ht }} FCFA</span
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-6">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">
            <feather-icon icon="BookIcon" />

            Details etablissement
          </h4>
          <hr />
          <p class="card-text font-weight-bold">
            Nom <br /><span
              class="badge badge-light-info badge-pill font-weight-bol"
            >
              {{ recoverCommande.client.nom }}</span
            >
          </p>

          <p class="card-text font-weight-bold">
            Prenoms <br /><span
              class="badge badge-light-info badge-pill font-weight-bol"
            >
              {{ recoverCommande.client.prenoms }}</span
            >
          </p>

          <p class="card-text font-weight-bold">
            Contact <br /><span class="badge badge-light-info font-weight-bol">
              {{ recoverCommande.client.phone }}</span
            >
          </p>

          <p class="card-text font-weight-bold">
            Email <br /><span
              class="badge badge-light-info badge-pill font-weight-bol"
            >
              {{ recoverCommande.client.email }}</span
            >
          </p>
        </div>
      </div>
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
        prenom:"",
        email:"",
        contact:"",
              livreur: "",


      recoverCommande:[],
      users:[],
      recover:"",
      loading: false,
    };
  },

  async mounted() {
    document.title = "Detail de la commande";

    //recuperation du local storage
    this.recoverCommande = JSON.parse(localStorage.getItem("commande"));
    console.log("recover", this.recoverCommande.id);

    try {
         await axios.get(URL.LIST_USER + `/?role=livreur`).then((response) => {
        this.users = response.data.liste;
        console.log('livreur', this.users);
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
          title: "Commande affectée avec avec success",
          icon: "ThumbsUpIcon",
          variant: "success",
        },
      });
    },
    //formatage date
    format_date(value) {
      if (value) {
        return moment(String(value)).format("DD-MM-YYYY");
      }
    },

      validateLivreur() {
      const selectedLivreur = this.livreur;
      localStorage.setItem("livreur", JSON.stringify(selectedLivreur));
      this.recover = JSON.parse(localStorage.getItem("livreur"));

      //affectation
      this.prenom = this.recover.prenoms;
      this.contact = this.recover.phone;
      this.email = this.recover.email;
      console.log(this.recover.id);
    },


        async save() {
      try {
        this.validateLivreur();

        const config = {
          headers: {
            Accept: "application/json",
          },
        };

        if (
          this.livreur 
        ) {
          const data = {
            id:this.recoverCommande.id,
            livreur_id: this.livreur.id,
            etat: 14,
          };
          this.loading = true;
          console.log(data);
          await axios
            .post(URL.AFFECTE, data, config)
            .then((response) => {
              if (response.data) {
                this.loading = false;
                this.$refs.modalUser.hide();

                    this.livreur = ""
                  this.topEnd();
                this.users.unshift(response.data.user);
                console.log(this.users);
              }
            });
        }
      } catch (error) {
        this.loading = false;
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
