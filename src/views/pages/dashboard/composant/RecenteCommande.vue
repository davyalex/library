<template>
  <div class="">
    <!-- Modal pour affecter une commande au livreur -->
    <b-modal
      id="modal-add"
      ref="modalUser"
      cancel-variant="outline-secondary"
      ok-title="Créer"
      cancel-title="Annuler"
      centered
      hide-footer
      :title="'Affecter la commande N°' + commande_code"
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

    <!-- Tableau pour afficher les taxes -->
    <div class="tableau">
      <b-card no-body class="py-1">
        <!-- Le haut du tableau contenant les barre de recherche et bouton d'ajout de nouvelle taxe -->
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

  <b-col md="8">
             <b-button variant="primary">
              <feather-icon icon="EyeIcon" class="mx-auto" />
              <b-link :to="{ name: 'commande' }">
                <span class="text-white">Voir toutes les commandes</span>
              </b-link>
            </b-button>
          </b-col>

            <!-- primary -->
            <!-- <b-dropdown
              id="dropdown-1"
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              :text="titre ? titre : 'Filtrer'"
              variant="primary"
            >

              <b-dropdown-item @click="getName('livre')">
                <feather-icon icon="ShoppingCartIcon" />
                <span class="align-middle ml-50 text-success font-weight-bold"
                  >Commandes livrées</span
                >
              </b-dropdown-item>

              <b-dropdown-item @click="getName('attente')">
                <feather-icon icon="ShoppingCartIcon" />
                <span class="align-middle ml-50 text-warning font-weight-bold"
                  >Commandes en attentes</span
                >
              </b-dropdown-item>

              <b-dropdown-item @click="getName('affecte')">
                <feather-icon icon="ShoppingCartIcon" />
                <span class="align-middle ml-50 text-primary font-weight-bold"
                  >Commandes affectées</span
                >
              </b-dropdown-item>

                <b-dropdown-item @click="getName('all')">
                <feather-icon icon="ShoppingCartIcon" />
                <span class="align-middle ml-50 text-dark font-weight-bold"
                  >Toutes les commandes</span
                >
              </b-dropdown-item>
            </b-dropdown> -->
          </b-col>

        

          <!-- Search -->
          <b-col cols="12" md="4" class="mt-1">
            <div class="d-flex align-items-center justify-content-end">
              <b-input-group class="input-group-merge">
                <!-- <b-input-group-prepend is-text  class="px-1">
                  <feather-icon icon="SearchIcon" />
                </b-input-group-prepend> -->
                <b-form-input
                  v-model="filtrecommandes"
                  class="d-inline-block mr-1"
                  placeholder="Rechercher par : N°, statut, date..."
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
          :items="commandesFiltre"
          :fields="tableColumns"
          :filter="filtrecommandes"
          show-empty
          empty-text=""
          class="bg-white"
        >
          <template #cell(created_at)="data">
            {{ format_date(data.item.created_at) }}
          </template>

             <template #cell(total_ttc)="data">
              <span class="text-success font-weight-bold"> {{ data.item.total_ttc }} FCFA</span>
             </template>


          <template #cell(client)="data">
                            <feather-icon size="20" icon="UserIcon" class="cursor-pointer" />

            {{ data.item.client.nom }}
          </template>


 <template #cell(code)="data">

         <span class="text-primary font-weight-bold">   {{ data.item.code }}</span>
          </template>
          <template #cell(etat)="data">
            <span v-if=" data.item.etat.title==='En attente'" class="badge badge-light-warning badge-pill font-weight-bold">
              <feather-icon size="20" icon="ArrowDownIcon" class="cursor-pointer" />
               {{ data.item.etat.title }}</span
            >

              <span v-if=" data.item.etat.title==='Affectée'" class="badge badge-light-primary badge-pill font-weight-bold">
              <feather-icon size="20" icon="TruckIcon" class="cursor-pointer" />
               {{ data.item.etat.title }}</span
            >

                <span v-if=" data.item.etat.title==='Livrée'" class="badge badge-light-success badge-pill font-weight-bold">
              <feather-icon size="20" icon="CheckIcon" class="cursor-pointer" />
               {{ data.item.etat.title }}</span
            >

          </template>

           
        
          
          <template #cell(actions)="data">
            <div class="text-nowrap text-center">
              <!-- Dropdown -->
              <b-dropdown
                variant="link"
                toggle-class="p-0"
                no-caret
                :right="$store.state.appConfig.isRTL"
              >
                <template #button-content>
                  <feather-icon
                    icon="MoreVerticalIcon"
                    size="16"
                    class="align-middle text-body text-center"
                  />
                </template>
                <b-dropdown-item
                  @click="affecte(data.item.id, data.item.code)"
                  v-b-modal.v-b-modal.modal-add
                  :disabled="data.item.etat.title === 'Affectée' ? true : false"
                >
                  <feather-icon icon="SendIcon" />
                  <span
                    v-if="data.item.etat.title === 'Affectée'"
                    class="align-middle ml-50"
                    >Déjà affectée</span
                  >
                  <span v-else class="align-middle ml-50">Affecter</span>
                </b-dropdown-item>

                <b-dropdown-item @click="preview(data.item.id)">
                  <feather-icon icon="EyeIcon" />
                  <span class="align-middle ml-50">Details</span>
                </b-dropdown-item>

                <b-dropdown-item @click="destroy(data.item.id)">
                  <feather-icon icon="TrashIcon" />
                  <span class="align-middle ml-50">Supprimer</span>
                </b-dropdown-item>
              </b-dropdown>
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
                :total-rows="commandesFiltre.length"
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
      livreur: "",
      prenom: "",
      contact: "",
      email: "",

      //
      commande_id: "",
      commande_code: "",

      titre:"",

      role: "",
      loading: false,

      // errorMsg: "",
      users: [],
      commandes: [],
      recoverCommande: "",
      recover: "",
      recoverItem: "",
      commandesFiltre:[],

      perPage: 30,
      currentPage: 1,
      pTotal: 0,
      tableColumns: [
        { key: "code", label: "Code", sortable: true },
        { key: "client", label: "client", sortable: true },
        { key: "created_at", label: "date", sortable: true },
        { key: "total_ttc", label: "montant", sortable: true },
        // { key: "quantite", label: "quantite", sortable: true },
        // { key: "status", label: "statut", sortable: true },
        { key: "etat", label: "etat", sortable: true },

        // { key: "phone", label: "contact", sortable: true },
        // { key: "role", label: "role", sortable: true },
        { key: "actions" },
      ],
      filtrecommandes: "",
      perPageOptions: [30, 50, 100],
    };
  },

  async mounted() {
    document.title = "Commande";

    try {
      await axios.get(URL.LIST_COMMANDE + `?filter_field=created_at&filter_value=DESC&limit=10`).then((response) => {
        this.commandes = response.data.commande;
        this.commandesFiltre = this.commandes
        // this.pTotal = this.commandes.length;
        console.log("commande", this.commandes);
      });
      await axios.get(URL.LIST_USER + `?role=livreur`).then((response) => {
        this.users = response.data.liste;
        this.pTotal = this.users.length;
        console.log("livreur", this.users);
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
    //envoi des item en localStorage
    getName(item) {

      localStorage.setItem("Item", item);

      this.recoverItem = localStorage.getItem("Item");

      //   filtrage
      if (this.recoverItem === "livre") {
        const filterLivre = this.commandes.filter((item) => {
          return item.etat_id === 16;
        });
        this.commandesFiltre = filterLivre;
                this.titre = "Liste des commandes livrées"

        console.log(this.commandesFiltre,this.titre);
      }
      
      else if (this.recoverItem === "affecte") {
       const filterAffecte = this.commandes.filter((item) => {
          return item.etat_id === 14;
        });
        this.commandesFiltre = filterAffecte;
                        this.titre = "Liste des commandes affectées"

                console.log(this.commandesFiltre,this.titre);

      }
      
      else if (this.recoverItem === "attente") {
        const filterAttente = this.commandes.filter((item) => {
          return item.etat_id === 13;
        });
        this.commandesFiltre = filterAttente;
             this.titre = "Liste des commandes en attentes"
            console.log(this.commandesFiltre,this.titre);

      }else if (this.recoverItem === "all") {
                      this.commandesFiltre = this.commandes;
            this.titre =""
      }
    },

    //envoi des details commande en localstorage
    preview(id) {
      const previewCmd = this.commandesFiltre.filter((item) => {
        return item.id === id;
      });
      //insertion dans le localstorage
      localStorage.setItem("commande", JSON.stringify(previewCmd[0]));

      //recuperation du local storage
      this.recoverCommande = JSON.parse(localStorage.getItem("commande"));
      console.log("recover", this.recoverCommande);

      this.$router.push({ name: "detail" });
    },

    affecte(id, code) {
      this.commande_id = id;
      this.commande_code = code;
      console.log(this.commande_id, this.commande_code);
    },

    //validation

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

        if (this.livreur) {
          const data = {
            id: this.commande_id,
            livreur_id: this.livreur.id,
            etat: 14,
          };
          this.loading = true;
          console.log(data);
          await axios.post(URL.AFFECTE, data, config).then((response) => {
            if (response.data) {
              this.loading = false;
              this.commandes.push(response.data.commande);
              this.$refs.modalUser.hide();
              axios.get(URL.LIST_COMMANDE).then((response) => {
                this.commandesFiltre = response.data.commande;
                this.pTotal = this.commandes.length;
                console.log("commande", this.commandes);
              });
              this.livreur = "";
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
    async deletecmd(indentifiant) {
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
          .post(URL.COMMANDE_DESTROY + `/${id.id}`, config)
          .then((response) => {
            response.data;
            axios.get(URL.LIST_USER).then((response) => {
              this.commandes = response.data.commande;
              this.pTotal = this.commandes.length;
            });
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response.data);
            }
          });
        this.commandes.splice(index, 1);
      } catch (error) {
        console.log(error.type);
      }
    },

    destroy(id) {
      this.$swal({
        title: "Êtes vous sûr?",
        text: "Cette commande sera supprimé définitivement !",
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
          this.deletecmd(id);
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
