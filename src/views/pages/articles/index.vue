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
              <!-- Ajouter un article -->
              <b-link :to="{ name: 'article/create' }">
                <span class="text-white">Ajouter un article </span>
              </b-link>
            </b-button>

            <div class="demo-inline-spacing m-auto">
              <feather-icon
                icon="BookOpenIcon"
                size="30"
                class="text-primary"
                :badge="pTotal"
              />
            </div>

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
                  v-model="filtreArticle"
                  class="d-inline-block mr-1"
                  placeholder="Rechercher par : title, categorie..."
                />
              </b-input-group>
            </div>
          </b-col>
        </b-row>
        <div class="text-center" v-if="spinner === true">
          <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
        </div>
        <!-- Le tableau affichant les typeParametre -->
        <b-table
          v-if="spinner === false"
          hover
          responsive
          primary-key="id"
          :per-page="perPage"
          :current-page="currentPage"
          :items="articleList"
          :fields="tableColumns"
          :filter="filtreArticle"
          :sort-by.sync="currentSort"
          :sort-desc.sync="currentSortDir"
          show-empty
          empty-text=""
          class="bg-white"
        >
          <template #cell(categorie)="data">
            <span>
              {{ data.item.categorie.title }}
            </span>
          </template>

          <template #cell(prix)="data">
            <span> {{ convert(data.item.prix) }} </span>
          </template>

          <template #cell(created_at)="data">
            <span
             v-b-tooltip.hover.v-primary
                :title="`${ format_dateB(data.item.created_at) }`"
            >
              {{ format_date(data.item.created_at) }}
            </span>
          </template>

          <template #cell(image)="data">
            <img
              v-if="data.item.image"
              style="width: 32px; height: 32px"
              :src="data.item.image"
              alt=""
            />
          </template>

          <template #cell(title)="data">
            <div class="py-50">
              <span variant="info" class="text-uppercase font-weight-bolder">
                {{ data.item.title }}
                <small>
                  <div
                    class="py-50"
                    v-for="(item, index) in data.item.jumeler"
                    :key="index"
                  >
                    <span
                      variant="info"
                      class="text-capitalize text-secondary"
                      v-if="data.item.jumeler.length > 0"
                    >
                      {{ item.title + " " + "(jumelé)" }}
                    </span>
                  </div>
                </small>
              </span>
            </div>
          </template>

          <template #cell(jumeler)="data">
            <div
              class="py-50"
              v-for="(item, index) in data.item.jumeler"
              :key="index"
            >
              <span
                variant="info"
                class="text-uppercase font-weight-bolder"
                v-if="data.item.jumeler.length > 0"
              >
                {{ item.title }}
              </span>
            </div>
          </template>

          <template #cell(actions)="data">
            <div class="text-nowrap py-1">
              <!-- <b-link "> -->
              <feather-icon
                icon="Edit3Icon"
                :id="`invoice-row-${data.item.id}-Edit3-icon`"
                size="16"
                class="cursor-pointer mr-2 text-primary"
                @click="update(data.item)"
                v-b-tooltip.hover.v-primary
                title="Modifier"
              />

              <!-- <b-link :to="{ name: 'create' }"> -->
              <feather-icon
                icon="TrashIcon"
                :id="`invoice-row-${data.item.id}-Trash-icon`"
                size="16"
                class="cursor-pointer text-danger"
                @click="confirmText(data.item.id)"
                v-b-tooltip.hover.v-danger
                title="Supprimer"
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
  BSpinner,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import { VBTooltip, BButton } from "bootstrap-vue";

import { required, email } from "@validations";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import vSelect from "vue-select";
import URL from "@/views/pages/request";
import axios from "axios";
import moment from "moment";
import flatPickr from "vue-flatpickr-component";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import "moment/locale/fr";
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
    BSpinner,
  },
  directives: {
    Ripple,
    "b-tooltip": VBTooltip,
  },
  data() {
    return {
      articleList: [],
      spinner: true,
      perPage: 100,
      currentPage: 1,
      currentSort: "created_at",
      currentSortDir: "asc",
      pTotal: 0,
      tableColumns: [
        { key: "code", label: "Code", sortable: true },
        { key: "image", label: "image", sortable: true },
        { key: "title", label: "Nom", sortable: true },
        { key: "categorie", label: "categorie", sortable: true },
        { key: "quantite", label: "Qte", sortable: true },
        { key: "prix", label: "prix", sortable: true },
        { key: "created_at", label: "crée", sortable: true },

        { key: "actions" },
      ],
      filtreArticle: "",
      perPageOptions: [100, 200, 300],
      error: [],
    };
  },

  async mounted() {
    document.title = "Liste des articles";
    this.spinner = true;

    try {
      await axios.get(URL.LIST_ARTICLE).then((response) => {
        this.spinner = false;
        this.articleList = response.data.article;
        //  this.articleList =  this.returnData.article
        this.pTotal = this.articleList.length;
        console.log(this.articleList);
      });
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    //formatage date(il y'a xxxx)
    format_date(value) {
      if (value) {
        moment.locale("fr");
        return moment(String(value)).fromNow();
      }
    },

    //formatage data_brute(23-32-20)
    format_dateB(value) {
      if (value) {
        moment.locale("fr");
        return moment(String(value)).format("dddd, Do MMMM YYYY");
      }
    },

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
          title: "Etablissement enregistré avec succès",
          icon: "BookIcon",
          variant: "success",
        },
      });
    },

    update(data) {
      localStorage.setItem("article", JSON.stringify(data));
      this.$router.push({ name: "article/update" });
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
          this.delete(id);
        }
      });
    },

    delete(identifiant) {
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
          .post(URL.ARTICLE_DESTROY + `/${id.id}`, config)
          .then((response) => {
            if (response.data) {
              axios.get(URL.LIST_ARTICLE).then((response) => {
                this.spinner = false;
                this.articleList = response.data.article;
                this.pTotal = this.articleList.length;
              });
            }
          });
        this.articleList.splice(index, 1);
      } catch (error) {
        console.log(error);
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
