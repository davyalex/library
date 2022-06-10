<template>
  <div class="">
    <!-- Modal pour ajouter un nouveau parametre -->
    <b-modal
      id="modal-add"
      cancel-variant="outline-secondary"
      ok-title="Créer"
      cancel-title="Annuler"
      centered
      :title="'Ajouter un'+ ' '+titleParms[0].title"
      @ok="save"
    >
      <b-form @submit.prevent>
        <!-- si sedec -->

        <!-- si sedec -->
          <div class="text-center">  <span class="text-danger" v-if="msgError"> {{ msgError }} </span></div>

        <b-form-group
          label=""
          label-for="register-libelle"
          v-if="this.titleParms[0].title === 'Sedec'"
        >
          <label> Diocese <span class="p-0 text-danger h6">*</span> </label>
          <validation-provider
            #default="{ errors }"
            name="montant"
            rules="required"
          >
            <v-select
              v-model="selectedDiocese"
              @input="validateSelectedDiocese"
              placeholder="Selectionnez un diocese"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="title"
              :options="diocese"
              :state="errors.length > 0 ? false : null"
            >
            </v-select>
            <small
              :class="valideSelectedDiocese ? 'block' : 'none'"
              class="text-danger"
            >
              Vous devez sélectionner un diocese
            </small>
          </validation-provider>
        </b-form-group>

        <!-- si diocese -->

        <b-form-group
          label=""
          label-for="register-libelle"
          v-if="this.titleParms[0].title === 'Diocese'"
        >
          <label> Commune <span class="p-0 text-danger h6">*</span> </label>
          <validation-provider
            #default="{ errors }"
            name="montant"
            rules="required"
          >
            <v-select
              v-model="selectedCommune"
              @input="validateSelectedCommune"
              placeholder="Selectionnez une commune"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="title"
              :options="commune"
              :state="errors.length > 0 ? false : null"
            >
            </v-select>
            <small
              :class="valideSelectedCommune ? 'block' : 'none'"
              class="text-danger"
            >
              Vous devez sélectionner une commune
            </small>
          </validation-provider>
        </b-form-group>

        <!-- si niveau -->

        <b-form-group
          label=""
          label-for="register-libelle"
          v-if="this.titleParms[0].title === 'Niveau'"
        >
          <label> Cycle <span class="p-0 text-danger h6">*</span> </label>
          <validation-provider
            #default="{ errors }"
            name="montant"
            rules="required"
          >
            <v-select
              v-model="selectedCycle"
              @input="validateSelectedCycle"
              placeholder="Selectionnez un cycle"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="title"
              :options="cycle"
              :state="errors.length > 0 ? false : null"
            >
            </v-select>
            <small
              :class="valideSelectedCycle ? 'block' : 'none'"
              class="text-danger"
            >
              Vous devez sélectionner un cycle
            </small>
          </validation-provider>
        </b-form-group>

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

        <b-form-group label="" label-for="register-nom">
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
        </b-form-group>

        <b-form-group
          label=""
          label-for="register-nom"
          v-if="
            typePara.title === 'diocese' || typePara.title === 'localisation'
          "
        >
          <label for="">Quartier</label>
          <validation-provider #default="{ errors }" name="nom" rules="">
            <b-form-input
              id="register-nom"
              v-model="quartier"
              name="register-nom"
              :state="errors.length > 0 ? false : null"
              placeholder=""
            />
          </validation-provider>
        </b-form-group>

        <b-form-group label="Description" label-for="register-description">
          <b-form-textarea
            id="textarea"
            v-model="description"
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
              Ajouter un {{ titleParms[0].title }}
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
                  v-model="filtreParametre"
                  class="d-inline-block mr-1"
                  placeholder="Rechercher par : title, description, date..."
                />
              </b-input-group>
            </div>
          </b-col>
        </b-row>

        <!-- Le tableau affichant les Parametre -->
        <!-- <span class="text-center text-bold"
          >Parametre pour : {{ titleParms[0].title }}</span
        > -->
        <b-table
          hover
          responsive
          :per-page="perPage"
          :current-page="currentPage"
          :items="Parametre"
          :fields="tableColumns"
          :filter="filtreParametre"
          show-empty
          empty-text=""
          class="bg-white"
        >
          <template #cell(created_at)="data">
            {{ format_date(data.item.created_at) }}
          </template>

          <template #cell(actions)="data">
            <div class="text-nowrap py-1">
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
                    class="align-middle text-body"
                  />
                </template>

                <!-- <b-dropdown-item
                  @click="addParametre(data.item.id)"
                >
                  <feather-icon icon="PlusIcon" />
                  <span class="align-middle ml-50">Ajouter un parametre</span>
                </b-dropdown-item> -->

                <b-dropdown-item
                  v-b-modal.modal-reglement
                  @click="modify(data.item)"
                >
                  <feather-icon icon="EditIcon" />
                  <span class="align-middle ml-50">Editer</span>
                </b-dropdown-item>

                <b-dropdown-item @click="confirmText(data.item.id)">
                  <feather-icon icon="TrashIcon" />
                  <span class="align-middle ml-50"> Supprimer</span>
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
    {{ refresh }}
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
import axios from "axios";
import moment from "moment";
import flatPickr from "vue-flatpickr-component";
import { watch, computed, onBeforeMount } from "@vue/composition-api";
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
  },
  data() {
    return {
      title: "",
      subtitle: "",
      description: "",
      quartier: "",

      selectedCycle: "",
      selectedCommune: "",
      selectedDiocese: "",

      valideTitle: false,
      valideSelectedCycle: false,
      valideSelectedCommune: false,
      valideSelectedDiocese: false,

msgError:"",

      cycle: [],
      commune: [],
      diocese: [],

      typePara: [],

      Parametre: [],

      titleParms: {},
      perPage: 30,
      currentPage: 1,
      pTotal: 0,
      tableColumns: [
        { key: "code", label: "Code", sortable: true },
        { key: "title", sortable: true },
        { key: "slug", sortable: true },
        // { key: "description", label: "motif", sortable: true },
        { key: "created_at", label: "crée le", sortable: true },
        { key: "actions" },
      ],
      filtreParametre: "",
      perPageOptions: [30, 50, 100],
      error: false,
    };
  },

  async mounted() {
    document.title = "parametre";

    console.log("slug", this.$route.params.slug);
    this.typePara = JSON.parse(localStorage.getItem("typeParametre"));
    console.log("tttt", this.typePara);
    this.titleParms = this.typePara.filter(
      (parms) => parms.slug === this.$route.params.slug
    );
    console.log("loca", this.titleParms);
    try {
      await axios.get(URL.PARAMETRE).then((response) => {
        this.Parametre = response.data.parametre;
        console.log("List Parm", this.Parametre);
        const listParametre = this.Parametre.filter(
          (item) => item.slug_type_para === this.$route.params.slug
        );
        this.Parametre = listParametre;
        this.pTotal = this.Parametre.length;
        console.log("All", this.Parametre);
      });

      await axios.get(URL.PARAMETRE_CREATE).then((response) => {
        this.cycle = response.data.cycle;
        this.commune = response.data.commune;
        this.diocese = response.data.diocese;
        console.log('cycle',this.commune);
      });
    } catch (error) {
      console.log(error);
    }
  },
  setup(props, { root }) {
    onBeforeMount(() => {
      localStorage.setItem("path", root.$route.path);
    });

    const refresh = computed(async () => {
      const isPassPath = localStorage.getItem("path");

      console.log("isPassPath", isPassPath);

      if (isPassPath !== root.$route.path) {
        location.assign(`${root.$route.path}`);

        localStorage.removeItem("path");
      }
    });

    return {
      refresh,
    };
  },

  methods: {
    //envoi des infos en localStorage

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

    format_date(value) {
      if (value) {
        return moment(String(value)).format("DD-MM-YYYY");
      }
    },
    //
    validateTitle() {
      if (!this.title) {
        this.valideTitle = true;
        this.error = true;
      } else {
        this.valideTitle = false;
        this.error = false;
      }
    },

    validateSelectedCycle() {
      if (!this.selectedCycle) {
        this.valideSelectedCycle = true;
        this.error = true;
      } else {
        this.valideSelectedCycle = false;
        this.error = false;
      }
    },

    validateSelectedCommune() {
      if (!this.selectedCommune) {
        this.valideSelectedCommune = true;
        this.error = true;
      } else {
        this.valideSelectedCommune = false;
        this.error = false;
      }
    },

    validateSelectedDiocese() {
      if (!this.selectedDiocese) {
        this.valideSelectedDiocese = true;
        this.error = true;
      } else {
        this.valideSelectedDiocese = false;
        this.error = false;
      }
    },

    async save(bvModalEvt) {
     
      try {
        this.validateTitle();
        this.validateSelectedCycle();
        this.validateSelectedCommune();
        this.validateSelectedDiocese();
        const config = {
          headers: {
            Accept: "application/json",
          },
        };

          if (this.error=true) {
             bvModalEvt.preventDefault();
          }
        let selected = "";
        if (this.selectedCycle) {
          selected = this.selectedCycle.id;
        }else if(this.selectedCommune){
            selected = this.selectedCommune.id;
        }else if(this.selectedDiocese){
            selected = this.selectedDiocese.id;
        }

        const data = {
          title: this.title,
          subtitle: this.subtitle,
          quartier: this.quartier,
          parent_id: selected,
          description: this.description,
          slug: this.$route.params.slug,
        };
        console.log("dat", data);
        await axios
          .post(URL.PARAMETRE_STORE, data, this.config)
          .then((response) => {
           
            this.userData = response.data.parametre;
            this.msgError = response.data.error;
            console.log("user", this.msgError);
            if (this.userData) {
                 this.Parametre.push(this.userData);
            this.topEnd();
            this.title = "";
            this.subtitle = "";
            this.description = "";
            this.selectedCycle = "";
            this.selectedCommune = "";
            this.selectedDiocese = "";
            }
         

           else if(this.msgError !==""){
                this.topEndE()
               bvModalEvt.preventDefault();
            }
          });
      } catch (error) {
        console.log(error);
      }
     
    },


    //destroy
      async deleteParametre(indentifiant) {
      const id_delete = {
        id: indentifiant,
      };
      try {
        await axios
          .post(URL.PARAMETRE_DESTROY, id_delete)
          .then((response) => {
            response.data;
           axios.get(URL.PARAMETRE).then((response) => {
        this.Parametre = response.data.parametre;
        console.log("List Parm", this.Parametre);
        const listParametre = this.Parametre.filter(
          (item) => item.slug_type_para === this.$route.params.slug
        );
        this.Parametre = listParametre;
        this.pTotal = this.Parametre.length;
        console.log("All", this.Parametre);
      });
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response.data);
            }
          });
        this.Parametre.splice(index, 1);
      } catch (error) {
        console.log(error.type);
      }
    },

      confirmText(id) {
      this.$swal({
        title: "Êtes vous sûr?",
        text: "Cette prospection sera supprimée définitivement !",
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
          this.deleteParametre(id);
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
<style scoped lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
