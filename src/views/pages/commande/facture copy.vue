<template>
<div>

<div class="col-md-12  mb-3">
   <b-button class="float-right"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="success"
            @click="exportToPDF"
          >
            <feather-icon icon="DownloadIcon" />
            Telecharger 
          </b-button>
</div>

  
  
  <div class="row py-2" ref="document" style="background-color:white">

    <div class="col-md-12 py-2">
        <b-img fluid :src="require('@/assets/images/logo/logo-original.png')" width="50%" />
    </div>
 
    <div class="col-md-8">
      <div class="">
        <div class="">
          <h4 class="">
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
      <div class="">
        <div class="">
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
