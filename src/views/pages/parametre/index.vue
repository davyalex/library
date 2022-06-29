<template>
  <div class="">
    <!-- Modal pour ajouter un nouveau parametre -->
    <b-modal
      id="modal-add"
      cancel-variant="outline-secondary"
      ok-title="Créer"
      cancel-title="Annuler"
      centered
      :title="'Ajouter un(e)' + ' ' + titleParms[0].title"
      @ok="save"
    >
      <b-form @submit.prevent>
        <!-- si sedec -->

        <!-- si sedec -->
        <!-- <div class="text-center">
          <span class="text-danger" v-if="msgError"> {{ msgError }} </span>
        </div> -->

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

        <!-- <b-form-group
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
        </b-form-group> -->

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
            <small v-if="titleExist.length > 0" class="text-danger">
              {{ title }} existe déjà, veuillez renseigner un autre
            </small>
          </validation-provider>
        </b-form-group>

        <b-form-group
          label=""
          label-for="register-nom"
          v-if="this.titleParms[0].title === 'Commune'"
        >
          <label for=""
            >Frais de livraison <span class="p-0 text-danger h6">*</span></label
          >
          <validation-provider
            #default="{ errors }"
            name="nom"
            rules="required"
          >
            <b-form-input
              type="number"
              id="register-nom"
              v-model="subtitle"
              @input="validateFrais"
              name="register-nom"
              :state="errors.length > 0 ? false : null"
              placeholder=""
            />
            <small :class="valideFrais ? 'block' : 'none'" class="text-danger">
              Vous devez definir les frais de livraison
            </small>
          </validation-provider>
        </b-form-group>

        <b-form-group label="" label-for="register-nom" v-else>
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

    <!-- Modal pour modifier un parametre -->
    <b-modal
      id="modal-update"
      cancel-variant="outline-secondary"
      ok-title="Modifier"
      cancel-title="Annuler"
      centered
      title="Modifier un parametre"
      @ok="edit"
    >
      <b-form @submit.prevent>
        <!-- si sedec -->

        <!-- si sedec -->
        <!-- <div class="text-center">
          <span class="text-danger" v-if="msgError"> {{ msgError }} </span>
        </div> -->

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
              v-model="editSelected"
              @input="evalidateSelectedDiocese"
              placeholder="Selectionnez un diocese"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="title"
              :options="diocese"
              :state="errors.length > 0 ? false : null"
            >
            </v-select>
            <small
              :class="evalideSelectedDiocese ? 'block' : 'none'"
              class="text-danger"
            >
              Vous devez sélectionner un diocese
            </small>
          </validation-provider>
        </b-form-group>

        <!-- si diocese -->

        <!-- <b-form-group
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
              v-model="editSelected"
              @input="evalidateSelectedCommune"
              placeholder="Selectionnez une commune"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="title"
              :options="commune"
              :state="errors.length > 0 ? false : null"
            >
            </v-select>
            <small
              :class="evalideSelectedCommune ? 'block' : 'none'"
              class="text-danger"
            >
              Vous devez sélectionner une commune
            </small>
          </validation-provider>
        </b-form-group> -->

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
              v-model="editSelected"
              @input="evalidateSelectedCycle"
              placeholder="Selectionnez un cycle"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="title"
              :options="cycle"
              :state="errors.length > 0 ? false : null"
            >
            </v-select>
            <small
              :class="evalideSelectedCycle ? 'block' : 'none'"
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
              @input="evalidateTitle"
              v-model="editTitle"
              name="register-nom"
              :state="errors.length > 0 ? false : null"
              placeholder=""
            />
            <small v-if="evalideTitle" class="text-danger">
              Vous devez renseigner le libelle
            </small>
            <small v-if="titleExist.length > 0" class="text-danger">
              {{ title }} existe déjà, veuillez renseigner un autre
            </small>
          </validation-provider>
        </b-form-group>

        <b-form-group
          label=""
          label-for="register-nom"
          v-if="this.titleParms[0].title === 'Commune'"
        >
          <label for=""
            >Frais de livraison <span class="p-0 text-danger h6">*</span></label
          >
          <validation-provider
            #default="{ errors }"
            name="nom"
            rules="required"
          >
            <b-form-input
              type="number"
              id="register-nom"
              v-model="editSubtitle"
              @input="evalidateFrais"
              name="register-nom"
              :state="errors.length > 0 ? false : null"
              placeholder=""
            />
            <small :class="evalideFrais ? 'block' : 'none'" class="text-danger">
              Vous devez definir les frais de livraison
            </small>
          </validation-provider>
        </b-form-group>

        <b-form-group label="" label-for="register-nom" v-else>
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
              v-model="editQuartier"
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

        <div class="text-center" v-if="spinner === true">
          <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
        </div>

        <!-- Le tableau affichant les Parametre -->
        <!-- <span class="text-center text-bold"
          >Parametre pour : {{ titleParms[0].title }}</span
        > -->
        <b-table
          v-if="spinner === false"
          hover
          responsive
          :per-page="perPage"
          :current-page="currentPage"
          :items="Parametre"
          :fields="tableColumns"
          :filter="filtreParametre"
          :sort-by.sync="currentSort"
          :sort-desc.sync="currentSortDir"
          show-empty
          empty-text=""
          class="bg-white"
        >
          <template #cell(created_at)="data">
            {{ format_date(data.item.created_at) }}
          </template>

             <template #cell(title)="data">
            {{ data.item.title }}
            <br><small class="text-primary" v-if="data.item.subtitle"> {{ data.item.subtitle }} </small>
                        <br><small class="text-primary" v-if="data.item.parent"> {{ data.item.parent.title }} </small>

          </template>
          <template #cell(actions)="data">
            <div class="text-nowrap py-1">
              <!-- Dropdown -->
              <b-link v-b-modal.modal-update>
                <feather-icon
                  icon="Edit3Icon"
                  :id="`invoice-row-${data.item.id}-Edit3-icon`"
                  size="16"
                  class="cursor-pointer mr-2"
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
                  @click="confirmText(data.item.id)"
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
    <!-- {{ refresh }} -->
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
  BSpinner,
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
    BSpinner,
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
      quartier: "",

      selectedCycle: "",
      selectedCommune: "",
      selectedDiocese: "",

      //update
      editTitle: "",
      editSubtitle: "",
      editDescription: "",
      editSelected: "",
      // editSelectedCycle: "",
      // editSelectedCommune: "",
      // editSelectedDiocese: "",

      valideTitle: false,
      valideFrais: false,
      valideSelectedCycle: false,
      valideSelectedCommune: false,
      valideSelectedDiocese: false,

      evalideTitle: false,
      evalideFrais: false,
      evalideSelectedCycle: false,
      evalideSelectedCommune: false,
      evalideSelectedDiocese: false,

      titleExist: "",

      msgError: "",

      cycle: [],
      commune: [],
      diocese: [],

      typePara: [],
      getParametre: [],

      Parametre: [],
      paramAll: [],
      slug:[],

      titleParms: {},
      spinner: true,
      perPage: 100,
      currentPage: 1,
      currentSort: "created_at",
      currentSortDir: "asc",
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
      perPageOptions: [100, 200, 300],
      error: false,
    };
  },

  async mounted() {
    document.title = "parametre" + "-" + this.slug;
    console.log("slug", this.slug);
    this.typePara = JSON.parse(localStorage.getItem("typeParametre"));
    console.log("tttt", this.typePara);
    this.slug =JSON.parse(localStorage.getItem("typeParaSlug"));
        console.log("slug tp",   this.slug);

    this.titleParms = this.typePara.filter(
      (parms) => parms.slug === this.slug
    );
    console.log("loca", this.titleParms);
    this.spinner = true;
    try {
      await axios.get(URL.PARAMETRE).then((response) => {
        this.spinner = false;
        this.Parametre = response.data.parametre;
        this.paramAll = response.data.parametre;
        console.log("List Parm", this.Parametre);
        const listParametre = this.Parametre.filter(
          (item) => item.slug_type_para === this.slug
        );
        this.Parametre = listParametre;
        this.pTotal = this.Parametre.length;
        console.log("All", this.paramAll);
      });

      await axios.get(URL.PARAMETRE_CREATE).then((response) => {
        this.cycle = response.data.cycle;
        this.commune = response.data.commune;
        this.diocese = response.data.diocese;
        console.log("cycle", this.commune);
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

    update(data) {
      const Para = data;
      localStorage.setItem("paraUpdate", JSON.stringify(Para));
      this.getParametre = JSON.parse(localStorage.getItem("paraUpdate"));
      console.log("id", this.getParametre.id, data);

      this.editTitle = this.getParametre.title;
      this.editSubtitle = this.getParametre.subtitle;
      this.editDescription = this.getParametre.description;
      if (this.getParametre.parent) {
        this.editSelected = this.getParametre.parent.title;
      }
    },

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

    topEndU() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: "Modifié avec réussi",
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
      this.titleExist = this.paramAll.filter((item) => {
        return item.title === this.title;
      });
      console.log(this.titleExist.length);
    },

    evalidateTitle() {
      if (!this.editTitle) {
        this.evalideTitle = true;
        this.error = true;
      } else {
        this.evalideTitle = false;
        this.error = false;
      }
      this.titleExist = this.paramAll.filter((item) => {
        return item.title === this.title;
      });
      console.log(this.titleExist.length);
    },

    validateFrais() {
      if (this.titleParms[0].title === "Commune") {
        if (!this.subtitle) {
          this.valideFrais = true;
          this.error = true;
        } else {
          this.valideFrais = false;
          this.error = false;
        }
      }
    },

    evalidateFrais() {
      if (this.titleParms[0].title === "Commune") {
        if (!this.editSubtitle) {
          this.evalideFrais = true;
          this.error = true;
        } else {
          this.ealideFrais = false;
          this.error = false;
        }
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

    evalidateSelectedCycle() {
      if (!this.editSelected) {
        this.evalideSelectedCycle = true;
        this.error = true;
      } else {
        this.evalideSelectedCycle = false;
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

    evalidateSelectedCommune() {
      if (!this.editSelected) {
        this.evalideSelectedCommune = true;
        this.error = true;
      } else {
        this.evalideSelectedCommune = false;
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

    evalidateSelectedDiocese() {
      if (!this.editSelected) {
        this.evalideSelectedDiocese = true;
        this.error = true;
      } else {
        this.evalideSelectedDiocese = false;
        this.error = false;
      }
    },

    async save(bvModalEvt) {
      try {
        this.validateTitle();
        this.validateSelectedCycle();
        // this.validateSelectedCommune();
        this.validateSelectedDiocese();
        this.validateFrais();
        const config = {
          headers: {
            Accept: "application/json",
          },
        };

        let selected = "";
        if (this.selectedCycle) {
          selected = this.selectedCycle.id;
        } else if (this.selectedCommune) {
          selected = this.selectedCommune.id;
        } else if (this.selectedDiocese) {
          selected = this.selectedDiocese.id;
        }

        if (
          !this.title ||
          (!this.subtitle && this.titleParms[0].title === "Commune")
        ) {
          bvModalEvt.preventDefault();
        } else if (
          !this.selectedCycle &&
          this.titleParms[0].title === "Niveau"
        ) {
          bvModalEvt.preventDefault();
        } else if (
          !this.selectedDiocese &&
          this.titleParms[0].title === "Sedec"
        ) {
          bvModalEvt.preventDefault();
        } else {
          const data = {
            title: this.title,
            subtitle: this.subtitle,
            quartier: this.quartier,
            parent_id: selected,
            description: this.description,
            slug: this.slug,
          };
          console.log("dat", data);
          await axios
            .post(URL.PARAMETRE_STORE, data, this.config)
            .then((response) => {
              this.userData = response.data.parametre;
              this.msgError = response.data.error;
              console.log("user", this.msgError);
              this.Parametre.unshift(this.userData);
              this.topEnd();
              this.title = "";
              this.subtitle = "";
              this.description = "";
              this.selectedCycle = "";
              this.selectedCommune = "";
              this.selectedDiocese = "";
            });
        }
      } catch (error) {
        console.log(error);
      }
    },

    //update

    async edit(bvModalEvt) {
      console.log(this.titleParms[0].title);
      try {
        this.evalidateTitle();
        this.evalidateSelectedCycle();
        this.evalidateSelectedCommune();
        this.evalidateSelectedDiocese();
        this.evalidateFrais();
        const config = {
          headers: {
            Accept: "application/json",
          },
        };

        let selected = "";
        if (this.getParametre.parent) {
          if (this.editSelected === this.getParametre.parent.title) {
            selected = this.getParametre.parent.id;
          } else {
            selected = this.editSelected.id;
          }
          console.log(selected);
        }
        if (
          !this.editTitle ||
          (!this.editSubtitle && this.titleParms[0].title === "Commune")
        ) {
          bvModalEvt.preventDefault();
        } else if (
          !this.editSelected &&
          this.titleParms[0].title === "Niveau"
        ) {
          bvModalEvt.preventDefault();
        } else if (!this.editSelected && this.titleParms[0].title === "Sedec") {
          bvModalEvt.preventDefault();
        } else {
          const data = {
            id: this.getParametre.id,
            title: this.editTitle,
            subtitle: this.editSubtitle,
            quartier: this.editQuartier,
            parent_id: selected,
            description: this.editDescription,
            slug: this.slug,
          };
          console.log("dat", data);
          await axios
            .post(URL.PARAMETRE_UPDATE + `/${data.id}`, data, this.config)
            .then((response) => {
              this.userData = response.data.parametre;
              axios.get(URL.PARAMETRE).then((response) => {
                this.Parametre = response.data.parametre;
                const listParametre = this.Parametre.filter(
                  (item) => item.slug_type_para === this.slug
                );
                this.Parametre = listParametre;
                this.pTotal = this.Parametre.length;
              });
              this.topEndU();
              this.editTitle = "";
              this.editSubtitle = "";
              this.editDescription = "";
              this.editSelected = "";

              // this.editSelectedCycle = "";
              // this.editSelectedCommune = "";
              // this.editSelectedDiocese = "";
            });
        }
      } catch (error) {
        console.log(error);
      }
    },

    //destroy
    async deleteParametre(indentifiant) {
      const id = {
        id: indentifiant,
      };
      try {
        await axios
          .post(URL.PARAMETRE_DESTROY + `/${id.id}`)
          .then((response) => {
            response.data;
            axios.get(URL.PARAMETRE).then((response) => {
              this.Parametre = response.data.parametre;
              console.log("List Parm", this.Parametre);
              const listParametre = this.Parametre.filter(
                (item) => item.slug_type_para === this.slug
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
        text: "Ce parametre sera supprimée définitivement !",
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
