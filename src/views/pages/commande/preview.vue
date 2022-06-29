<template>
  <div class="row" ref="document">
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
            :disabled="
              recoverCommande.etat.title === 'Affectée'
                ? true
                : false || recoverCommande.etat.title === 'Livrée'
                ? true
                : false || recoverCommande.etat.title === 'Récupérée'
                ? true
                : false|| recoverCommande.etat.title === 'Annulée'
                ? true
                : false
                 ||
                  recoverCommande.livraison_mode.title === 'point de retrait'
                ? true
                : false
            "
          >
            <feather-icon icon="SendIcon" />
            <span v-if="recoverCommande.etat.title === 'Affectée'">
              Déjà affectée</span
            >

            <span
              v-else-if="recoverCommande.etat.title === 'Livrée'"
              class="align-middle ml-50"
              >Déjà livrée</span
            >
            <span
              v-else-if="recoverCommande.etat.title === 'Récupérée'"
              class="align-middle ml-50"
              >En cour de livraison</span
            >
            <span
              v-else-if="recoverCommande.etat.title === 'Annulée'"
              class="align-middle ml-50"
              >Commande annulée</span
            >

             <span
              v-else-if="recoverCommande.livraison_mode.title === 'point de retrait'"
              class="align-middle ml-50"
              >Affectée au point de retrait</span
            >

            <span v-else> Affecter</span>
          </b-button>

             <b-button variant="success"
                  v-if="recoverCommande.livraison_mode.title === 'point de retrait'"
                  @click="delivery(recoverCommande.id)"
                  :disabled="
                   recoverCommande.etat.title === 'Annulée'
                      ? true
                      : false || recoverCommande.etat.title === 'Livrée'
                      ? true
                      : false || recoverCommande.etat.title === 'Récupérée'
                      ? true
                      : false
                  "
                >
                  <feather-icon icon="ThumbsUpIcon" />
                  <span class="align-middle ml-50">Livrer</span>
                </b-button>

                <b-button variant="danger"
                  v-if="recoverCommande.livraison_mode.title === 'point de retrait'"
                  @click="cancel(recoverCommande.id)"
                  :disabled="recoverCommande.etat.title === 'Annulée' ? true : false"
                >
                  <feather-icon icon="ThumbsDownIcon" />
                  <span class="align-middle ml-50">Annuler</span>
                </b-button>
        </div>
      </div>
    </div>

    <div class="col-md-8">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">
            <feather-icon icon="ShoppingCartIcon" />

            Details commandes
          </h4>
          <hr />

          <div class="row">
            <!-- /// -->
            <div class="col-md-6">
              <p class="card-text font-weight-bold">
                N° commande <br /><span class="text-success font-weight-bol">
                  {{ recoverCommande.code }}
                </span>
              </p>

              <p class="card-text font-weight-bold">
                Quantité <br /><span class="text-success font-weight-bol">
                  {{ recoverCommande.quantite }} kits
                </span>
              </p>
              <p class="card-text font-weight-bold">
                Total HT <br /><span class="text-success font-weight-bol">
                  {{ convert(recoverCommande.total_ht) }}
                </span>
              </p>
              <p
                class="card-text font-weight-bold"
                v-if="recoverCommande.total_remise"
              >
                Remise <br /><span class="text-success font-weight-bol">
                  {{ convert(recoverCommande.total_remise) }}
                </span>
              </p>
              <p
                class="card-text font-weight-bold"
                v-if="recoverCommande.total_livraison"
              >
                Montant livraison <br /><span
                  class="text-success font-weight-bol"
                >
                  {{ convert(recoverCommande.total_livraison) }}
                </span>
              </p>
              <p class="card-text font-weight-bold">
                Montant Total<br /><span class="text-success font-weight-bol">
                  {{ convert(recoverCommande.total_ttc) }}
                </span>
              </p>
            </div>

            <!-- /// -->
            <div class="col-md-6">
              <p class="card-text font-weight-bold">
                Mode de livraison<br /><span
                  class="text-success font-weight-bol"
                >
                  {{ recoverCommande.livraison_mode.title }}
                </span>
              </p>
              <p
                class="card-text font-weight-bold"
                v-if="recoverCommande.livraison_prevue"
              >
                Date de livraison prevue<br /><span
                  class="text-success font-weight-bol"
                >
                  {{ recoverCommande.livraison_prevue }}</span
                >
              </p>

              <p
                class="card-text font-weight-bold"
                v-if="recoverCommande.livraison_exacte"
              >
                Date de livraison exacte <br /><span
                  class="text-success font-weight-bol"
                >
                  {{ recoverCommande.livraison_exacte }}</span
                >
              </p>

              <p
                class="card-text font-weight-bold"
                v-if="recoverCommande.adresse"
              >
                Adresse de livraison <br /><span
                  class="text-success font-weight-bol"
                >
                  {{ recoverCommande.adresse.title }}</span
                >
              </p>

              <p
                class="card-text font-weight-bold"
                v-if="recoverCommande.point_retrait"
              >
                Point de retrait <br /><span
                  class="text-success font-weight-bol"
                >
                  {{ convert(recoverCommande.point_retrait.title) }}
                </span>
              </p>

              <p
                class="card-text font-weight-bold"
                v-if="recoverCommande.mode_paiement"
              >
                Mode de paiement <br /><span
                  class="text-success font-weight-bol"
                >
                  {{ recoverCommande.mode_paiement.title }}</span
                >
              </p>

              <p class="card-text font-weight-bold" v-if="recoverCommande.etat">
                Etat <br /><span class="text-success font-weight-bol">
                  {{ recoverCommande.etat.title }}</span
                >
              </p>

              <p
                class="card-text font-weight-bold"
                v-if="recoverCommande.status"
              >
                Statut <br /><span class="text-success font-weight-bol">
                  {{ recoverCommande.status }}</span
                >
              </p>

              <p
                class="card-text font-weight-bold"
                v-if="recoverCommande.livreur"
              >
                Livreur <br /><span class="text-success font-weight-bol">
                  {{ recoverCommande.livreur.nom }}</span
                >
              </p>
            </div>

            <!-- /// -->
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-4">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">
            <feather-icon icon="UserIcon" />

            Details client
          </h4>
          <hr />
          <p class="card-text font-weight-bold">
            Nom <br /><span class="text-success font-weight-bol">
              {{ recoverCommande.client.nom }}</span
            >
          </p>

          <p class="card-text font-weight-bold">
            Prenoms <br /><span class="text-success font-weight-bol">
              {{ recoverCommande.client.prenoms }}</span
            >
          </p>

          <p class="card-text font-weight-bold">
            Contact <br /><span class="text-success font-weight-bol">
              {{ recoverCommande.client.phone }}</span
            >
          </p>

          <p class="card-text font-weight-bold">
            Email <br /><span class="text-success font-weight-bol">
              {{ recoverCommande.client.email }}</span
            >
          </p>
        </div>
      </div>
    </div>

    <div
      class="col-md-6"
      v-for="(item, index) in recoverCommande.kits"
      :key="index.id"
    >
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">
            <feather-icon icon="BookOpenIcon" />

            Details kit {{ index + 1 }}
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="secondary"
              class="float-right"
              @click="facture(item)"
            >
              <feather-icon icon="PrinterIcon" />
              Imprimer
            </b-button>
          </h4>
          <hr />

          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-6">
                  <h3>
                    Code: <span class="text-success"> {{ item.code }}</span>
                  </h3>
                </div>

                <div class="col-md-6">
                  <h3>
                    Montant:
                    <span class="text-success">
                      {{ convert(item.montant) }}</span
                    >
                  </h3>
                </div>
              </div>

              <div class="row py-2">
                <div class="col-md-12">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Art</th>
                        <th scope="col">Qte</th>
                        <th scope="col">Pu</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in item.article_commandes"
                        :key="index.id"
                      >
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ item.title }}</td>
                        <td>{{ item.pivot_quantite }}</td>
                        <td>{{ item.pivot_montant }}</td>
                        <td>{{ item.pivot_total }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- <p class="card-text font-weight-bold">
                Code <br /><span
                  class="text-success font-weight-bol"
                >
                  {{ item.code }}
                </span>
              </p>

               <p class="card-text font-weight-bold">
                Montant <br /><span
                  class="text-success font-weight-bol"
                >
                  {{ item.montant }} 
                </span>
              </p>

               <p  class="card-text font-weight-bold">
                Article du kit <br /><span v-for="(item,index) in item.article_commandes" :key="index.id"
                  class="text-success font-weight-bol"
                >
            <br> {{ item.title }} 
                  <br><span> {{ item.quantite }} </span>
                </span>
              </p> -->
            </div>
          </div>
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
  BTable,
  BInputGroupAppend,
  BImg,
  BPagination,
  BFormTextarea,
  BDropdown,
  BDropdownItem,
  BListGroup,
  BListGroupItem,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import html2pdf from "html2pdf.js";
import Vue from "vue";
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
    html2pdf,
    BRow,
    BCol,
    Vue,
    BFormInput,
    BButton,
    BModal,
    moment,
    BFormGroup,
    VBModal,
    BTable,
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
    BInputGroupAppend,
    BFormTextarea,
    BDropdown,
    BDropdownItem,
    BListGroup,
    BListGroupItem,
  },
  mixins: [togglePasswordVisibility],
  directives: {
    Ripple,
  },
  data() {
    return {
      prenom: "",
      email: "",
      contact: "",
      livreur: "",

      recoverCommande: [],
      users: [],
      recover: "",
      loading: false,
      items: [
        {
          num: 40,
          Article: "Dickerson",
          Quantite: "Macdonald",
        },
      ],
    };
  },

  async mounted() {
    document.title = "Detail de la commande";

    //recuperation du local storage
    this.recoverCommande = JSON.parse(localStorage.getItem("commande"));
    console.log("recover", this.recoverCommande.id);

    try {
      await axios.get(URL.LIST_USER + `?role=livreur`).then((response) => {
        this.users = response.data.liste;
        console.log("livreur", this.users);
      });
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    facture(item) {
      localStorage.setItem("factureKit", JSON.stringify(item));
      this.$router.push({ name: "commande/facture" });
    },

    exportToPDF() {
      html2pdf(this.$refs.document, {
        margin: 0.25,
        filename: "document.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { dpi: 192, letterRendering: true },
        jsPDF: { unit: "in", format: "a4", orientation: "p" },
      });
    },

    // generateReport () {
    //       this.$refs.html2Pdf.generatePdf()
    //   },

    convert(amount) {
      const formatter = new Intl.NumberFormat("ci-CI", {
        style: "currency",
        currency: "XOF",
        minimumFractionDigits: 2,
      }).format(parseInt(amount));
      return formatter;
    },
    topEnd() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: "Commande affectée avec success",
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

        if (this.livreur) {
          const data = {
            id: this.recoverCommande.id,
            livreur_id: this.livreur.id,
            etat: 14,
          };
          this.loading = true;
          console.log(data);
          await axios.post(URL.AFFECTE, data, config).then((response) => {
            if (response.data) {
              this.loading = false;
              this.$refs.modalUser.hide();

              this.livreur = "";
              this.topEnd();
              this.users.unshift(response.data.user);
              console.log(this.users);
              this.$router.push({ name: "commande" });
            }
          });
        }
      } catch (error) {
        this.loading = false;
      }
    },

        //cancel
    async annuler(indentifiant) {
      const id = {
        id: this.recoverCommande.id,
      };
      console.log(id);
      const config = {
        headers: {
          Accept: "application/json",
        },
      };
      try {
        await axios.post(URL.COMMANDE_CANCEL, id, config).then((response) => {
          response.data;
          axios.get(URL.LIST_COMMANDE).then((response) => {
            this.commandes = response.data.commande;
            this.commandesFiltre = this.commandes;
            console.log("commande", this.commandes);
                          this.$router.push({ name: "commande" });

          });
        });
      } catch (error) {
        console.log(error.type);
      }
    },

    cancel(id) {
      this.$swal({
        title: "Êtes vous sûr?",
        text: "Cette commande sera annulée définitivement !",
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
          this.annuler(id);
        }
      });
    },

    //delivery
    async livrer(indentifiant) {
      const id = {
        id: this.recoverCommande.id,
      };
      console.log(id);
      const config = {
        headers: {
          Accept: "application/json",
        },
      };
      try {
        await axios.post(URL.COMMANDE_DELIVERY, id, config).then((response) => {
          response.data;
          axios.get(URL.LIST_COMMANDE).then((response) => {
            this.commandes = response.data.commande;
            const cmd = this.commandes.filter((item)=>{item.id ===this.recoverCommande.id})
            this.commandesFiltre = this.commandes;
            console.log("commande", this.commandes);
                          this.$router.push({ name: "commande" });

          });
        });
      } catch (error) {
        console.log(error.type);
      }
    },

    delivery(id) {
      this.$swal({
        title: "Êtes vous sûr?",
        text: "Cette commande est livrée?",
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
          this.livrer(id);
        }
      });
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
          .post(URL.COMMANDE_DESTROY + `/${id.id}`, config)
          .then((response) => {
            response.data;
            localStorage.removeItem("commande");
            this.$router.push({ name: "commande" });
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
