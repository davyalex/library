<template>
  <div class="">
    <!-- Modal pour ajouter un nouveaucode promo -->
    <b-modal
      id="modal-add"
      cancel-variant="outline-secondary"
      ok-title="Créer"
      cancel-title="Annuler"
      centered
      title="Créer un code promo"
      @ok="save"
    >
      <b-form>
        <div class="text-center"></div>
        <!-- title -->
        <b-form-group label="" label-for="register-nom">
          <label for="">Title <span class="p-0 text-danger h6">*</span></label>
          <validation-provider
            #default="{ errors }"
            name="nom"
            rules="required"
          >
            <b-form-input
              id="register-nom"
              @input="validateTitle"
              v-model="title"
              name="register-nom"
              :state="errors.length > 0 ? false : null"
              placeholder=""
            />
            <small v-if="valideTitle" class="text-danger">
              Vous devez renseigner le libelle
            </small>
          </validation-provider>
        </b-form-group>
        <!-- subtitle -->

        <!-- <b-form-group label="" label-for="register-nom">
          <label for="">Subtitle</label>
          <validation-provider #default="{ errors }" name="nom" rules="">
            <b-form-input
              id="register-nom"
              v-model="subtitle"
              name="register-nom"
              :state="errors.length > 0 ? false : null"
              placeholder=""
            />
          </validation-provider>
        </b-form-group> -->

        <!-- pourcentage -->
        <b-form-group label="" label-for="register-nom">
          <label for=""
            >Pourcentage <span class="p-0 text-danger h6">*</span></label
          >
          <validation-provider
            #default="{ errors }"
            name="pourcentage"
            rules="required"
          >
            <b-form-input
              id="register-pourcentage"
              type="number"
              @input="validatePourcentage"
              v-model="pourcentage"
              name="register-pourcentage"
              :state="errors.length > 0 ? false : null"
              placeholder=""
            />
            <small v-if="validePourcentage" class="text-danger">
              Vous devez renseigner le pourcentage
            </small>
          </validation-provider>
        </b-form-group>
        <!-- coût -->

        <!-- <b-form-group label="" label-for="register-Coût">
          <label for="">Coût <span class="p-0 text-danger h6">*</span></label>
          <validation-provider
            #default="{ errors }"
            name="Coût"
            rules="required"
          >
            <b-form-input
              id="register-Coût"
              type="number"
              @input="validateCoût;"
              v-model="Coût"
              name="register-Coût"
              :state="errors.length > 0 ? false : null"
              placeholder=""
            />
            <small v-if="validePourcentage" class="text-danger">
              Vous devez renseigner le Coût
            </small>
          </validation-provider>
        </b-form-group> -->
        <!-- commande minimum -->
        <!-- <b-form-group label="" label-for="commande">
          <label for=""
            >Commande minimum <span class="p-0 text-danger h6">*</span></label
          >
          <validation-provider
            #default="{ errors }"
            name="minimum"
            rules="required"
          >
            <b-form-input
              id="register-minimum"
              type="number"
              @input="validateCoût;"
              v-model="Coût"
              name="register-minimum"
              :state="errors.length > 0 ? false : null"
              placeholder=""
            />
            <small v-if="valideCommandeMin" class="text-danger">
              Vous devez renseigner la commande minimum
            </small>
          </validation-provider>
        </b-form-group> -->

        <!-- etablissement -->
        <b-form-group label="" label-for="register-libelle">
          <label>
            Etablissement <span class="p-0 text-danger h6">*</span>
          </label>
          <validation-provider
            #default="{ errors }"
            name="etablissement"
            rules="required"
          >
            <v-select
              v-model="etablissement"
              @input="validateEtablissement"
              placeholder="Selectionnez un etablissement"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="etablissementList"
              label="title"
              :state="errors.length > 0 ? false : null"
            >
            </v-select>
            <small v-if="valideEtablissement" class="text-danger">
              Vous devez sélectionner un etablissement
            </small>
          </validation-provider>
        </b-form-group>
        <!-- date d'expiration' -->
        <b-form-group>
          <label>
            Date d'expiration<span class="p-0 text-danger h6">*</span>
          </label>
          <validation-provider>
            <flat-pickr
              v-model="date_expiration"
              class="form-control"
              rules="required"
              @input="validateDateExpiration"
            />
            <small v-if="valideDateExpiration" class="text-danger">
              Vous devez renseigner la date d'expiration
            </small>
          </validation-provider>
        </b-form-group>
        <!-- description -->
        <b-form-group label="Description" label-for="register-description">
          <b-form-textarea
            id="textarea"
            v-model="description"
            placeholder="Saisissez une description"
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>
        <!-- client -->
        <!-- <b-form-group label="" label-for="register-client">
          <label> Client <span class="p-0 text-danger h6">*</span> </label>
          <validation-provider
            #default="{ errors }"
            name="client"
            rules="required"
          >
            <v-select
              v-model="client"
              @input="validateClient"
              placeholder="Selectionnez un client"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="clientList"
              label="title"
              :state="errors.length > 0 ? false : null"
            >
            </v-select>
            <small v-if="valideClient" class="text-danger">
              Vous devez sélectionner un client
            </small>
          </validation-provider>
        </b-form-group> -->
        <!-- niveau -->
        <!-- <b-form-group label="" label-for="register-niveau">
          <label> Niveau <span class="p-0 text-danger h6">*</span> </label>
          <validation-provider
            #default="{ errors }"
            name="client"
            rules="required"
          >
            <v-select
              v-model="niveau"
              @input="validateNiveau"
              placeholder="Selectionnez un niveau"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="niveauList"
              label="title"
              :state="errors.length > 0 ? false : null"
            >
            </v-select>
            <small v-if="valideClient" class="text-danger">
              Vous devez sélectionner un niveau
            </small>
          </validation-provider>
        </b-form-group> -->
      </b-form>
    </b-modal>

    <!-- Modal pour modifier un code promo -->
    <b-modal
      id="modal-update"
      cancel-variant="outline-secondary"
      ok-title="Modifier"
      cancel-title="Annuler"
      centered
      title="Modifier un  type parametre"
      @ok="edit"
    >
      <b-form>
        <div class="text-center">
          <span class="text-danger" v-if="msgError"> {{ msgError }} </span>
        </div>
        <b-form-group label="" label-for="register-nom">
          <label for="">Title <span class="p-0 text-danger h6">*</span></label>
          <validation-provider
            #default="{ errors }"
            name="nom"
            rules="required"
          >
            <b-form-input
              id="register-nom"
              @input="validateTitle"
              v-model="editTitle"
              name="register-nom"
              :state="errors.length > 0 ? false : null"
              placeholder=""
            />
            <small v-if="valideTitle" class="text-danger">
              Vous devez renseigner le libelle
            </small>
          </validation-provider>
        </b-form-group>

        <b-form-group label="" label-for="register-nom">
          <label for="">Subtitle</label>
          <validation-provider #default="{ errors }" name="nom" rules="">
            <b-form-input
              id="register-nom"
              v-model="editSubtitle"
              name="register-nom"
              :state="errors.length > 0 ? false : null"
              placeholder=""
            />
          </validation-provider>
        </b-form-group>

        <b-form-group label="Description" label-for="register-description">
          <b-form-textarea
            id="textarea"
            v-model="editDescription"
            placeholder="Saisissez une description"
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>
      </b-form>
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

            <b-button variant="primary" v-b-modal.v-b-modal.modal-add>
              <feather-icon icon="PlusIcon" class="mx-auto" />
              Nouveau code promo
            </b-button>
          </b-col>

          <!-- Search -->
          <b-col cols="12" md="6" class="mt-1">
            <div class="d-flex align-items-center justify-content-end">
              <b-input-group class="input-group-merge">
                <!-- <b-input-group-prepend is-text>
                  <feather-icon icon="SearchIcon" />
                </b-input-group-prepend> -->
                <b-form-input
                  v-model="filtrePromotion"
                  class="d-inline-block mr-1"
                  placeholder="Rechercher par : title, description, date..."
                />
              </b-input-group>
            </div>
          </b-col>
        </b-row>

        <!-- Le tableau affichant les typeParametre -->
        <b-table
          hover
          responsive
          :per-page="perPage"
          :current-page="currentPage"
          :items="promotion"
          :fields="tableColumns"
          :filter="filtrePromotion"
          show-empty
          empty-text=""
          class="bg-white"
        >
          <template #cell(created_at)="data">
            {{ format_date(data.item.created_at) }}
          </template>

          <template #cell(pourcentage)="data">
            {{ data.item.pourcentage }} %
          </template>

          <template #cell(code)="data">
            <span class="text-primary font-weight-bold">
              {{ data.item.code }}</span
            >
          </template>

          <template #cell(etablissement)="data">
            <span class=""> {{ data.item.etablissement.title }}</span>
          </template>

          <template #cell(actions)="data">
            <div class="text-nowrap py-1">
              <!-- Dropdown -->
              <b-link v-b-modal.modal-update disabled>
                <feather-icon
                  icon="Edit3Icon"
                  :id="`invoice-row-${data.item.id}-Edit3-icon`"
                  size="16"
                  class="cursor-pointer mr-1"
                  @click="update(data.item)"
                  v-b-tooltip.hover.v-primary
                  title="Modifier"
                />
              </b-link>

              <b-link>
                <feather-icon
                  icon="TrashIcon"
                  :id="`invoice-row-${data.item.id}-Trash-icon`"
                  size="16"
                  class="cursor-pointer text-danger"
                  @click="destroy(data.item.id)"
                  v-b-tooltip.hover.v-danger
                  title="Supprimer"
                />
              </b-link>
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
  // BButton,
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

import { VBTooltip, BButton } from "bootstrap-vue";

import Ripple from "vue-ripple-directive";
import { required, email } from "@validations";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import vSelect from "vue-select";
import URL from "@/views/pages/request";
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
  directives: {
    Ripple,
    "b-tooltip": VBTooltip,
  },
  data() {
    return {
      title: "",
      subtitle: "",
      description: "",
      pourcentage: "",
      date_expiration: "",
      etablissement: "",

      editDescription: "",
      editTitle: "",
      editSubtitle: "",

      valideTitle: false,
      validePourcentage: false,
      valideDateExpiration: false,
      valideEtablissement: false,
      etablissementList: [],
      promotion: [],
      perPage: 30,
      currentPage: 1,
      pTotal: 0,
      tableColumns: [
        { key: "code", label: "Code", sortable: true },
        { key: "title", sortable: true },
        { key: "slug", sortable: true },
        { key: "description", label: "motif", sortable: true },
        // { key: "created_at", label: "crée le", sortable: true },
        { key: "pourcentage", label: "pourcentage", sortable: true },
        { key: "etablissement", label: "etablissement", sortable: true },

        { key: "expiration", label: "Date expiration", sortable: true },

        { key: "actions" },
      ],
      filtrePromotion: "",
      perPageOptions: [30, 50, 100],
    };
  },

  async mounted() {
    document.title = "Code promo";
    try {
      await axios.get(URL.LIST_ETABLISSEMENT).then((response) => {
        this.etablissementList = response.data.etablissements;
        console.log("etablissement", this.etablissementList);
      });

      await axios.get(URL.PROMOTION_LIST).then((response) => {
        this.promotion = response.data.promotions;
        this.pTotal = this.promotion.length;
        console.log(this.promotion);
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
          title: "Erreur",
          icon: "ThumbsDownIcon",
          variant: "danger",
        },
      });
    },
    //envoi des infos en localStorage

    update(data) {
      const typePara = data;
      localStorage.setItem("typeParametre", JSON.stringify(typePara));
      const getTypeParametre = JSON.parse(
        localStorage.getItem("typeParametre")
      );
      console.log(getTypeParametre);

      this.editTitle = getTypeParametre.title;
      this.editSubtitle = getTypeParametre.subtitle;
      this.editDescription = getTypeParametre.description;
    },

    addParametre(id, slug) {
      const currectTp = this.typeParametre.filter((item) => item.id === id);

      localStorage.setItem("typeParametre", JSON.stringify(currectTp[0]));
      this.$router.push(`/parametre/${slug}`);
    },

    format_date(value) {
      if (value) {
        return moment(String(value)).format("DD-MM-YYYY");
      }
    },
    //
    validateTitle() {
      if (!this.title) {
        this.valideTitle = true;
      } else {
        this.valideTitle = false;
      }
    },

    validatePourcentage() {
      if (!this.pourcentage) {
        this.validePourcentage = true;
      } else {
        this.validePourcentage = false;
      }
    },

    validateDateExpiration() {
      if (!this.date_expiration) {
        this.valideDateExpiration = true;
      } else {
        this.valideDateExpiration = false;
      }
    },

    validateEtablissement() {
      if (!this.etablissement) {
        this.valideEtablissement = true;
      } else {
        this.valideEtablissement = false;
      }
    },

    async save(bvModalEvt) {
      try {
        this.validateTitle();
        this.validatePourcentage();
        this.validateDateExpiration();
        this.validateEtablissement();
        const config = {
          headers: {
            Accept: "application/json",
          },
        };
        if (this.title) {
          const data = {
            title: this.title,
            pourcentage: this.pourcentage,
            etablissement_id: this.etablissement.id,
            expiration: this.date_expiration,
            description: this.description,
          };
          console.log(data);
          await axios
            .post(URL.PROMOTION_STORE, data, this.config)
            .then((response) => {
              this.userData = response.data.promotion;
              this.topEnd();
              this.promotion.unshift(this.userData);
              console.log(this.userData);
              this.title = "";
              this.pourcentage = "";
              this.description = "";
              this.etablissement = "";
              this.date_expiration = "";
            });
        }
      } catch (error) {
        console.log(error);
      }
      bvModalEvt.preventDefault();
    },

    //destroy
    async deletePromotion(indentifiant) {
      const id = {
        id: indentifiant,
      };
      try {
        const config = {
          headers: {
            Accept: "application/json",
          },
        };
        await axios
          .post(URL.PROMOTION_DESTROY + `/${id.id}`, config)
          .then((response) => {
            response.data;
            axios.get(URL.PROMOTION_LIST).then((response) => {
              this.promotion = response.data.promotions;
              this.pTotal = this.promotion.length;
            });
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response.data);
            }
          });
        this.promotion.splice(index, 1);
      } catch (error) {
        console.log(error.type);
      }
    },

    destroy(id) {
      this.$swal({
        title: "Êtes vous sûr?",
        text: "Ce code sera supprimée définitivement !",
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
          this.deletePromotion(id);
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
