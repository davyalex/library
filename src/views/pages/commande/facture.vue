<template>
  <div class="col-md-12">
    <div class="row">
      <div class="col-md-12">
        <b-button
          class="float-right"
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="success"
          @click="exportToPDF"
        >
          <feather-icon icon="DownloadIcon" />
          Telecharger
        </b-button>
        <b-button
          class="float-right mr-2"
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
          @click="$router.go(-1)"
        >
          <feather-icon icon="ArrowLeftIcon" />
          Retour
        </b-button>
      </div>
    </div>
    <br />

    <div class="row" ref="document">
      <div class="col-md-12" style="background: white">
        <div class="row py-2">
          <div class="col-md-6 float-left">
            <b-img
              fluid
              :src="require('@/assets/images/logo/logo-original.png')"
              width="50%"
            />
            <h5>Siloë-connect school.</h5>
          </div>

          <div class="col-md-6">
            <h5>commande n° #{{ recoverCommande.code }}</h5>
            <p>Date: {{ format_date(recoverCommande.created_at) }}</p>
          </div>
        </div>
        <div class="row">
          <!-- ////// client -->
          <div class="col-md-6">
            <h4 class="card-title">
              <feather-icon icon="UserIcon" />
              Details client
            </h4>
            <hr />
            <p>
              Nom:
              <span class="font-weight-bold">{{
                recoverCommande.client.nom
              }}</span>
            </p>
            <p>
              Prenoms:<span class="font-weight-bold">{{
                recoverCommande.client.prenoms
              }}</span>
            </p>
            <p>
              Contact:
              <span class="font-weight-bold">{{
                recoverCommande.client.phone
              }}</span>
            </p>
            <p>
              Email:
              <span class="font-weight-bold">{{
                recoverCommande.client.email
              }}</span>
            </p>
          </div>
          <!-- ////// -->

          <!-- //////commande -->
          <div class="col-md-6">
            <h4 class="card-title">
              <feather-icon icon="ShoppingCartIcon" />
              Details Commande
            </h4>
            <hr />
            <p>
              N°:
              <span class="font-weight-bold">{{ kitFacture.code }}</span>
            </p>
            <p>
            Quantité:
              <span class="font-weight-bold">{{
                kitFacture.pivot_quantite
              }}</span>
            </p>
               <p>
            Prix unitaire:
              <span class="font-weight-bold">{{
               convert( kitFacture.pivot_montant)
              }}</span>
            </p>

              <p>
           Montant total:
              <span class="font-weight-bold">{{
               convert( kitFacture.pivot_total)
              }}</span>
            </p>
            <p>
              Mode de livraison:
              <span class="font-weight-bold">{{
                recoverCommande.livraison_mode.title
              }}</span>
            </p>
            <!-- <p v-if="recoverCommande.livraison_prevue">
          Date de livraison prevue:
          <span class="font-weight-bold">{{ recoverCommande.livraison_prevue }}</span>
        </p> -->

            <!-- <p v-if="recoverCommande.livraison_exacte">
          Date de livraison exacte
          <span class="font-weight-bold">{{ recoverCommande.livraison_exacte }}</span>
        </p> -->

            <p v-if="recoverCommande.adresse">
              Adresse de livraison:
              <span class="font-weight-bold">{{
                recoverCommande.adresse.title
              }}</span>
            </p>

            <p v-if="recoverCommande.point_retrait">
              Point de retrait:
              <span class="font-weight-bold">{{
                convert(recoverCommande.point_retrait.title)
              }}</span>
            </p>
            <p v-if="recoverCommande.mode_paiement">
              Mode de paiement:
              <span class="font-weight-bold">{{
                recoverCommande.mode_paiement.title
              }}</span>
            </p>
            <p v-if="recoverCommande.livreur">
              Livreur:
              <span class="font-weight-bold">{{
                recoverCommande.livreur.nom
              }}</span>
            </p>
          </div>
          <!-- ////// -->

          <!-- ///content/ -->

          <div class="col-md-12">
            <hr />
            <table class="table table-responsive text-center">
              <thead>
                <tr class="">
                  <th scope="col" class="col-md-1">#</th>
                  <th scope="col" class="col-md-4">Art</th>
                  <th scope="col" class="col-md-1">Qte</th>
                  <th scope="col" class="col-md-3">Pu</th>
                  <th scope="col" class="col-md-3">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr class=""
                  v-for="(item, index) in kitFacture.article_commandes"
                  :key="index.id"
                >
                  <th scope="col" class="col-md-1">{{ index + 1 }}</th>
                  <td scope="col" class="col-md-4">{{ item.title }}</td>
                  <td scope="col" class="col-md-1">{{ item.pivot_quantite }}</td>
                  <td scope="col" class="col-md-3">{{ convert(item.pivot_montant) }}</td>
                  <td scope="col" class="col-md-3">{{ convert(item.pivot_total) }}</td>
                </tr>

                <tr>
                  <td colspan="4" class="text-right">
                    <p>
                      <strong>TOTAL HT: </strong>
                    </p>
                    <!-- <p v-if="recoverCommande.total_remise">
                      <strong>Remise: </strong>
                    </p>
                    <p v-if="recoverCommande.total_livraison">
                      <strong>Livraison: </strong>
                    </p> -->
                    <h2><strong>TOTAL TTC: </strong></h2>
                  </td>
                  <td>
                    <p>
                      <strong
                        ><i class="fa fa-inr"></i>
                        {{ convert(recoverCommande.total_ht) }}</strong
                      >
                    </p>
                    <!-- <p v-if="recoverCommande.total_remise">
                      <strong
                        ><i class="fa fa-inr"></i>
                        {{ convert(recoverCommande.total_remise) }}</strong
                      >
                    </p> -->
                    <!-- <p v-if="recoverCommande.total_livraison">
                      <strong
                        ><i class="fa fa-inr"></i>
                        {{ convert(recoverCommande.total_livraison) }}</strong
                      >
                    </p> -->
                    <h2>
                      <strong class="text-danger"
                        ><i class="fa fa-inr"></i>
                        {{ convert(recoverCommande.total_ttc) }}</strong
                      >
                    </h2>
                  </td>
                </tr>
                <!-- <tr>
              <td colspan="2" class="text-right">
                <h2><strong>Total ttc: </strong></h2>
              </td>
              <td class="text-left text-danger">
                <h2>
                  <strong><i class="fa fa-inr"></i> {{convert(recoverCommande.total_ttc)}}</strong>
                </h2>
              </td>
            </tr> -->
              </tbody>
            </table>
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
      kitFacture: "",
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

    //recuperation de facture kit
    this.kitFacture = JSON.parse(localStorage.getItem("factureKit"));

    console.log("kitFacture", this.kitFacture);

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
