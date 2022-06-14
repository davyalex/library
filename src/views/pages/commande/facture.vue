<template>

  <div class="col-md-12">
    <div class="">
 <b-button class="float-right"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="success"
            @click="exportToPDF"
          >
            <feather-icon icon="DownloadIcon" />
            Telecharger 
          </b-button>
  </div>
   <div class="row" ref="document">
    
    <div class="col-md-12" style="background: white">
    <div class="row py-2">
      <div class="col-md-6 float-left">
        <b-img
          fluid
          :src="require('@/assets/images/logo/logo-original.png')"
          width="50%"
        />
        <h5>Library siloe.</h5>
      </div>

      <div class="col-md-6">
        <h5> commande n° #{{ recoverCommande.code }}</h5>
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
        <p>Nom: {{ recoverCommande.client.nom }}</p>
        <p>Prenoms:{{ recoverCommande.client.prenoms }}</p>
        <p>Contact: {{ recoverCommande.client.phone }}</p>
        <p>Email: {{ recoverCommande.client.email }}</p>
      </div>
      <!-- ////// -->

      <!-- //////commande -->
      <div class="col-md-6">
        <h4 class="card-title">
          <feather-icon icon="ShoppingCartIcon" />
          Details Commande
        </h4>
        <hr />
        <p>N°: {{ recoverCommande.code }}</p>
        <p>Nombre de kit: {{ recoverCommande.quantite }}</p>
        <p>Mode de livraison: {{ recoverCommande.livraison_mode.title }}</p>
        <p v-if="recoverCommande.livraison_prevue">
          Date de livraison prevue:
          {{ recoverCommande.livraison_prevue }}
        </p>

        <p v-if="recoverCommande.livraison_exacte">
          Date de livraison exacte
          {{ recoverCommande.livraison_exacte }}
        </p>

        <p v-if="recoverCommande.adresse">
          Adresse de livraison:
          {{ recoverCommande.adresse.title }}
        </p>

        <p v-if="recoverCommande.point_retrait">
          Point de retrait: {{ convert(recoverCommande.point_retrait.title) }}
        </p>
        <p v-if="recoverCommande.mode_paiement">
          Mode de paiement: {{ recoverCommande.mode_paiement.title }}
        </p>
        <p v-if="recoverCommande.livreur">
          Livreur:
          {{ recoverCommande.livreur.nom }}
        </p>
      </div>
      <!-- ////// -->
     

      <!-- ///content/ -->

      <div class="col-md-12">
        <hr>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Code</th>
              <!-- <th>Nbre d'article</th> -->
              <th>Montant</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in recoverCommande.kits" :key="index.id">
              <td>{{ index + 1 }}</td>
              <td>{{ item.code }}</td>
              <td>{{ convert(item.montant) }}</td>
            </tr>

            <tr>
              
              <td colspan="2" class="text-right">
                <p>
                  <strong>Total Ht: </strong>
                </p>
                <p v-if="recoverCommande.total_remise">
                  <strong>Remise: </strong>
                </p>
                <p v-if="recoverCommande.total_livraison">
                  <strong>Livraison: </strong>
                </p>
                  <h2><strong>Total ttc: </strong></h2>
              </td>
              <td>
                <p>
                  <strong><i class="fa fa-inr"></i>  {{ convert(recoverCommande.total_ht) }}</strong>
                </p>
                <p v-if="recoverCommande.total_remise">
                  <strong><i class="fa fa-inr"></i>   {{ convert(recoverCommande.total_remise)}}</strong>
                </p>
                <p v-if="recoverCommande.total_livraison">
                  <strong><i class="fa fa-inr"></i> {{convert(recoverCommande.total_livraison)}}</strong>
                </p>
                 <h2>
                  <strong class="text-danger"><i class="fa fa-inr"></i> {{convert(recoverCommande.total_ttc)}}</strong>
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


