<template>
  <div class="">
    <!-- Modal pour ajouter une nouvelle prospection -->
    <b-modal
      id="modal-add"
      cancel-variant="outline-secondary"
      ok-title="Créer"
      cancel-title="Annuler"
      centered
      title="Nouveau type parametre"
      @ok="save()"
    >
      <b-form >
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
              Nouveau type parametre
            </b-button>
          </b-col>

          <!-- Search -->
          <b-col cols="12" md="6" class="mt-1">
            <div class="d-flex align-items-center justify-content-end">
              <b-input-group class="input-group-merge">
                <b-input-group-prepend is-text>
                  <feather-icon icon="SearchIcon" />
                </b-input-group-prepend>
                <b-form-input
                  v-model="filtreTypeParametre"
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
          :items="typeParametre"
          :fields="tableColumns"
          :filter="filtreTypeParametre"
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

 <b-dropdown-item
                  @click="addParametre(data.item.id, data.item.slug)"
                >
                  <feather-icon icon="PlusIcon" />
                  <span class="align-middle ml-50">Ajouter un parametre</span>
                </b-dropdown-item>

                <b-dropdown-item
                  v-b-modal.modal-reglement
                  @click="modify(data.item)"
                >
                  <feather-icon icon="EditIcon" />
                  <span class="align-middle ml-50">Editer</span>
                </b-dropdown-item>

                <b-dropdown-item @click="destroy(data.item.id)">
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
  BDropdownItem
  
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import { required, email } from "@validations";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import vSelect from "vue-select";
import URL from "@/views/pages/request";
import axios from "axios";
import moment from "moment";
import flatPickr from "vue-flatpickr-component";

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
      BDropdownItem

  },
  directives: {
    Ripple,
  },
  data() {
    return {
      title: "",
      subtitle: "",
      description: "",

      valideTitle: false,

      typeParametre: [],

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
      filtreTypeParametre: "",
      perPageOptions: [30, 50, 100],
    };
  },

  async mounted() {
    document.title = "type-parametre";
    try {
      await axios.get(URL.TYPEPARAMETRE).then((response) => {
        this.typeParametre = response.data.liste;
        console.log('liste',this.typeParametre);
        this.pTotal = this.typeParametre.length;
      });
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
//envoi des infos en localStorage

        addParametre(id,slug){
            	const currectTp = this.typeParametre.filter(
				(item) => item.id === id
			);

			localStorage.setItem('typeParametre', JSON.stringify(currectTp[0]));
			this.$router.push(`/parametre/${slug}`);
        },

       format_date(value) {
      if (value) {
        return moment(String(value)).format("DD-MM-YYYY");
      }
    },
//
validateTitle(){
    if (!this.title) {
        this.valideTitle = true
    } else {
          this.valideTitle = false
    }
},

    async save(bvModalEvt) {
      try {
          this.validateTitle()

        const config = {
          headers: {
            Accept: "application/json",
          },
        };
            if (this.title) {
                const data = {
          title: this.title,
          subtitle: this.subtitle,
          description: this.description,
        };
                console.log(data);
        await axios
          .post(URL.TYPEPARAMETRE_STORE, data, this.config)
          .then((response) => {
              
          this.userData = response.data.type_parametre;
          console.log( this.userData);
              this.typeParametre.unshift( this.userData);
            //
            this.title = "";
            this.subtitle = "";
            this.description = "";
          });  
            }
      
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
