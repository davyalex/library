<template>
  <div class="">
    <!-- Tableau pour afficher les taxes -->
    <div class="tableau">
      <b-card no-body class="py-1">
        <!-- Le haut du tableau contenant les barre de recherche et bouton d'ajout de nouvelle taxe -->
        <b-row class="px-2 py-2">
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

            <b-button variant="primary">
              <feather-icon icon="PlusIcon" class="mx-auto" />
              <!-- Ajouter un etablissement -->
              <b-link :to="{ name: 'etablissement/create' }">
                <span class="text-white">Ajouter un etablissement</span>
              </b-link>
            </b-button>

            <!-- <b-link :to="{ name: 'register' }">
              <span>&nbsp;Créer un compte</span>
            </b-link> -->
          </b-col>

          <!-- Search -->
          <b-col cols="12" md="6" class="mt-1">
            <div class="d-flex align-items-center justify-content-end">
              <b-input-group class="input-group-merge">
                <!-- <b-input-group-prepend is-text >
                  <feather-icon icon="SearchIcon" />
                </b-input-group-prepend> -->
                <b-form-input
                  v-model="filtreetablissement"
                  class="d-inline-block mr-1"
                  placeholder="Rechercher par : title, categorie..."
                />
              </b-input-group>
            </div>
          </b-col>
        </b-row>

        <!-- Le tableau affichant les typeParametre -->
        <b-table
          hover
          responsive
          primary-key="id"
          :per-page="perPage"
          :current-page="currentPage"
          :items="etablissement"
          :fields="tableColumns"
          :filter="filtreetablissement"
          show-empty
          empty-text="Aucun etablissement enregistré"
          class="bg-white"
        >
          <template #cell(categorie)="data">
            <span>
              {{ data.item.categorie.title }}
            </span>
          </template>

          <template #cell(actions)="data">
            <div class="text-nowrap py-1">
              <!-- <b-link "> -->
              <feather-icon
                icon="Edit3Icon"
                :id="`invoice-row-${data.item.id}-Edit3-icon`"
                size="16"
                class="cursor-pointer mr-1"
                @click="updateEtablissement(data.item.id)"
              />
              <!-- </b-link> -->

              <!-- <b-link :to="{ name: 'create' }">
                <feather-icon
                  icon="EyeIcon"
                  :id="`invoice-row-${data.item.id}-Edit3-icon`"
                  size="16"
                  class="cursor-pointer mr-1"
                  @click="update(data.item)"
                />
              </b-link> -->

              <!-- <b-link :to="{ name: 'create' }"> -->
              <feather-icon
                icon="TrashIcon"
                :id="`invoice-row-${data.item.id}-Edit3-icon`"
                size="16"
                class="cursor-pointer mr-1"
                @click="confirmText(data.item.id)"
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
                :total-rows="totalEtablissement"
                :per-page="perPage"
                first-number
                last-number
                class="mb-0 mt-1 mt-sm-0"
                prev-class="prev-item"
                next-class="next-item"
              >
                <template #cell(title)="data">
                  <div class="py-50">
                    <span
                      variant="info"
                      class="text-uppercase font-weight-bolder"
                    >
                      {{ data.item.title }}
                    </span>
                  </div>
                </template>
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
} from "bootstrap-vue";
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
    BInputGroupAppend,
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
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      etablissement: [],
      perPage: 30,
      currentPage: 1,
      totalEtablissement: 0,
      tableColumns: [
        { key: "code", label: "Code", sortable: true },
        { key: "title", label: "Nom", sortable: true },
        { key: "email", label: "Email", sortable: true },
        { key: "contact", label: "Contact", sortable: true },
        // { key: "prix", label: "prix", sortable: true },
        { key: "actions" },
      ],
      filtreetablissement: "",
      perPageOptions: [30, 50, 100],
      error: [],
    };
  },

   async mounted() {
    try {
      await axios.get(URL.LIST_ETABLISSEMENT).then((response) => {
        this.returnData = response.data;
        this.etablissement = this.returnData.etablissements;
        this.totalEtablissement=response.data.etablissements.length;
        this.niveau = this.returnData.etablissements;
        // this.listEtablissement = this.returnData
      });

      // console.log(this.niveau);
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    // validationForm() {
    //   this.$refs.simpleRules.validate().then((success) => {
    //     if (success) {
    //       // eslint-disable-next-line
    //       alert("login successfully");
    //     }
    //   });
    // },

    topEnd() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: "Etablissement enregistré avec succès",
          icon: "BookIcon",
          variant: "success",
        },
      });
    },

    validateEtablissement() {
      if (!this.etablissement_id) {
        this.valideEtablissement = true;
      } else {
        this.valideEtablissement = false;
      }
    },

 
    updateEtablissement(id) {
      const etat = this.etablissement.filter(
        (item) => item.id === id,
        // console.log(etat)
      );

      localStorage.setItem("etablissement", JSON.stringify(etat[0]));
      this.$router.push({ name: "etablissement/edit" });
    },


    confirmText(id) {
       this.$swal({
        title: "Êtes vous sûr?",
        text: "Cet etablissement sera supprimé définitivement !",
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
          this.destroyEtablisement(id);
        }
      });
    },

    destroyEtablisement(identifiant) {
      try {
        const id = {
          id: identifiant,
        };
        const config = {
          headers: {
            Accept: "application/json",
          },
        };
        axios
          .post(URL.DESTROY_ETABLISSEMENT + `/${id.id}`, config)
          .then((response) => {
            if(response.data){
              response.data;
              topEnd();
              
            }
          })
        this.etablissement.splice(index, 1);
      } catch (error) {
        console.log(error.type);
      }
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
<style scoped lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
