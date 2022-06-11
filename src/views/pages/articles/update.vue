<template>
  <validation-observer ref="simpleRules">
    <b-form @submit.prevent>
      <b-card>
        <b-row>
          <b-col cols="4">
            <b-form-group label-for="title">
              <label for="title"
                >nom de l'article
                <span class="p-0 text-danger h6"> *</span></label
              >

              <validation-provider
                #default="{ errors }"
                name="title"
                rules="required"
              >
                <b-form-input
                  id="title"
                  @input="validateTitle"
                  type="text"
                  v-model="title"
                  :state="errors.length > 0 ? false : null"
                  placeholder="Cahier"
                />
                <small v-if="valideTitle" class="text-danger">
                  Vous devez preciser un titre
                </small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col cols="4">
            <b-form-group label="" label-for="prix">
              <label for="prix"
                >Prix <span class="p-0 text-danger h6"> *</span></label
              >
              <validation-provider
                #default="{ errors }"
                name="prix"
                rules="required"
              >
                <b-form-input
                  id="prix"
                  type="number"
                  @input="validatePrix"
                  v-model="prix"
                  :state="errors.length > 0 ? false : null"
                  placeholder="1000"
                />
                <small v-if="validePrix" class="text-danger">
                  Vous devez preciser un prix
                </small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- <b-col cols="2">
            <b-form-group label-for="title">
              <label for="title"
                >Quantité <span class="p-0 text-danger h6">*</span
              ></label>

              <validation-provider
                #default="{ errors }"
                name="title"
                rules="required"
              >
                <b-form-input
                  id="title"
                  type="number"
                  v-model="quantite"
                  @input="validateQte"
                  :state="errors.length > 0 ? false : null"
                  placeholder="00 00 00"
                />
                <small v-if="valideQte" class="text-danger">
                  Vous devez preciser une quantité
                </small>
              </validation-provider>
            </b-form-group>
          </b-col> -->

          <b-col cols="4">
            <b-form-group label="" label-for="register-libelle">
              <label>
                Categorie <span class="p-0 text-danger h6">*</span>
              </label>
              <validation-provider
                #default="{ errors }"
                name="montant"
                rules="required"
              >
                <v-select
                  v-model="categorie"
                  @input="validateCategorie"
                  placeholder="Selectionnez une categorie"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="categorieList"
                  label="title"
                  :state="errors.length > 0 ? false : null"
                >
                </v-select>
                <small v-if="valideCategorie" class="text-danger">
                  Vous devez sélectionner une categorie
                </small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="6">
            <b-form-group label="Description" label-for="register-description">
              <b-form-textarea
                id="textarea"
                v-model="description"
                placeholder="Decrivez l'article"
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>
          </b-col>

          <b-col cols="6">
            <b-row>
              <b-col cols="8">
                <div>
                  <label for="">Image du kit</label>

                  <b-form-file
                    class="text-center mt-2"
                    @change="processFile($event)"
                    placeholder="Images du produit"
                    drop-placeholder="Glisser un fichier ici..."
                  />
                </div>
              </b-col>

              <b-col cols="4">
                <img
                  v-if="getArticle.image"
                  style="width: 100px; height: 100px"
                  :src="getArticle.image"
                  alt=""
                />
              </b-col>
            </b-row>
          </b-col>
        </b-row>

        <!-- DUPLICATEUR -->
        <div ref="form" class="repeater-form" :style="{ height: trHeight }">
          <b-row
            v-for="(item, index) in multiJumele"
            :key="index"
            ref="row"
            class="pb-2"
          >
            <!-- Item Form -->
            <!-- ? This will be in loop => So consider below markup for single item -->
            <b-col cols="12">
              <div class="d-flex border rounded">
                <b-row class="flex-grow-1 p-2">
                  <!-- <b-col cols="4">
            <b-form-group label-for="title">
              <label for="title"
                >nom de l'article
                <span class="p-0 text-danger h6"> *</span></label
              >

              <validation-provider
                #default="{ errors }"
                name="title"
                rules="required"
              >
                <b-form-input
                  id="title"
                  type="text"
                  v-model="title"
                  :state="errors.length > 0 ? false : null"
                  placeholder="Cahier"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col> -->

                  <!-- <b-col cols="2">
            <b-form-group label="" label-for="prix">
              <label for="prix"
                >Prix <span class="p-0 text-danger h6"> *</span></label
              >
              <validation-provider
                #default="{ errors }"
                name="prix"
                rules="required"
              >
                <b-form-input
                  id="ommune"
                  type="text"
                  v-model="prix"
                  :state="errors.length > 0 ? false : null"
                  placeholder="1000"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col> -->

                  <!-- <b-col cols="2">
            <b-form-group label-for="title">
              <label for="title"
                >Quantité
                <span class="p-0 text-danger h6"> </span></label
              >

              <validation-provider
                #default="{ errors }"
                name="title"
                rules="required"
              >
                <b-form-input
                  id="title"
                  type="text"
                  v-model="title"
                  :state="errors.length > 0 ? false : null"
                  placeholder="00 00 00"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col> -->
                  <!-- article jumelé -->
                  <b-col cols="4" md="4" class="m-auto">
                    <b-form-group label="" label-for="register-libelle">
                      <label for=""
                        >Choisir un article<span
                          class="p-0 text-danger h6"
                        ></span
                      ></label>
                      <v-select
                        v-model="item.articleJumele"
                        placeholder="Selectionnez un article"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        rules="required"
                        label="title"
                        :options="articleList"
                        @input="(val) => updateItemForm(index, val)"
                      >
                      </v-select>
                    </b-form-group>
                  </b-col>
                </b-row>

                <div
                  class="d-flex flex-column justify-content-between border-left py-50 px-25"
                >
                  <feather-icon
                    size="16"
                    icon="XIcon"
                    class="cursor-pointer"
                    @click="removeItem(index)"
                  />
                </div>
              </div>
            </b-col>
          </b-row>
        </div>
        <b-row>
          <b-col cols="12" class="text-center" style="">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              size="md"
              variant="primary"
              @click="addNewItemInItemForm"
            >
              Jumeler un article
            </b-button>
          </b-col>
        </b-row>

        <!-- login button -->
        <b-col cols="12 mt-2">
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
            <span v-else> Enregistrer</span>
          </b-button>
        </b-col>
      </b-card>
    </b-form>
  </validation-observer>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import vSelect from "vue-select";
import { ref, onUnmounted } from "@vue/composition-api";
import URL, { APP_HOST } from "@/views/pages/request";
import { heightTransition } from "@core/mixins/ui/transition";
import axios from "axios";
import Ripple from "vue-ripple-directive";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

// import { BCard, BCardText } from "bootstrap-vue";

import {
  BFormInput,
  BFormGroup,
  BFormCheckbox,
  BForm,
  BDropdown,
  BDropdownItem,
  BFormTextarea,
  BImg,
  BFormFile,
  BRow,
  BCol,
  BButton,
  BCardText,
  BCard,
} from "bootstrap-vue";
import { required } from "@validations";

export default {
  components: {
    BCard,
    BDropdown,
    BDropdownItem,
    BFormCheckbox,
    vSelect,
    ValidationProvider,
    ValidationObserver,
    BFormInput,
    BFormGroup,
    BCardText,
    BForm,
    BRow,
    BImg,
    BFormFile,
    BCol,
    BButton,
    BFormTextarea,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      title: "",
      prix: "",
      //   quantite: "",
      categorie: "",
      description: "",
      valideTitle: false,
      validePrix: false,
      //   valideQte: false,
      valideCategorie: false,

      file: "",
      categorieList: [],
      getArticle: [],

      multiJumele: [],
      articleJumeler: [],

      jumeleItem: {
        articleJumele: "",
        id: "",
      },
      loading: false,

      // sideImg: require("@/assets/images/pages/register-v2.svg"),
    };
  },

  async mounted() {
    document.title = "Modifier un article";
    this.getArticle = JSON.parse(localStorage.getItem("article"));
    console.log(this.getArticle);

    this.title = this.getArticle.title;
    this.prix = this.getArticle.prix;
    // this.quantite = this.getArticle.quantite
    this.categorie = this.getArticle.categorie.title;
    this.articleJumeler = this.getArticle.jumeler;

    for (let index = 0; index < this.articleJumeler.length; index++) {
      this.multiJumele.push({
        articleJumele: this.articleJumeler[index].title,
        id:this.articleJumeler[index].id
      });
      console.log(this.multiJumele);
    }

    try {
      await axios
        .get(URL.LIST_CATEGORIE + `?type_parametre=categorie`)
        .then((response) => {
          this.categorieList = response.data.parametre;
        });
      await axios.get(URL.LIST_ARTICLE).then((response) => {
        this.articleList = response.data.article;
        console.log("article", this.articleList);
      });
    } catch (error) {
      console.log(error);
    }
  },

  mixins: [heightTransition],
  created() {
    window.addEventListener("resize", this.initTrHeight);
  },
  destroyed() {
    window.removeEventListener("resize", this.initTrHeight);
  },

  methods: {
    processFile(event) {
      this.file = event.target.files[0];

      if (event.target.files.length !== 0) {
        console.log(this.file);
      }
    },

    updateItemForm(index, val) {
      const { id } = val;
      const j = (this.multiJumele[index].articleJumele_id = id);
      console.log("jumele", j);
    },

    //duplicateur
    addNewItemInItemForm() {
      this.$refs.form.style.overflow = "hidden";

      this.multiJumele.push(JSON.parse(JSON.stringify(this.jumeleItem)));
      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight);
        setTimeout(() => {
          this.$refs.form.style.overflow = null;
        }, 350);
      });
    },

    // remove ligne duplique
    removeItem(index) {
      this.multiJumele.splice(index, 1);
      this.trTrimHeight(this.$refs.row[0].offsetHeight);
    },

    //animate duplicateur
    initTrHeight() {
      this.trSetHeight(null);
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form.scrollHeight);
      });
    },

    //message
    topEnd() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: "Article modifié avec succès",
          icon: "BookIcon",
          variant: "success",
        },
      });
    },

    //message validation

    validateTitle() {
      if (!this.title) {
        this.valideTitle = true;
      } else {
        this.valideTitle = false;
      }
    },

    validatePrix() {
      if (!this.prix) {
        this.validePrix = true;
      } else {
        this.validePrix = false;
      }
    },

    // validateQte() {
    //   if (!this.quantite) {
    //     this.valideQte = true;
    //   } else {
    //     this.valideQte = false;
    //   }
    // },

    validateCategorie() {
      if (!this.categorie) {
        this.valideCategorie = true;
      } else {
        this.valideCategorie = false;
      }
    },

    async save(bvModalEvt) {
      try {
        this.validateTitle();
        this.validatePrix();
        // this.validateQte();
        this.validateCategorie();
        const config = {
          headers: {
            Accept: "application/json",
          },
        };
        
        const jumele = this.multiJumele.map((item) => {
          return { jumeler_id: item.articleJumele_id };
        });
        console.log("jumele", jumele);

        const newFormdata = new FormData();

        newFormdata.append("image", this.file);

        newFormdata.append("title", `${this.title}`);

        //   newFormdata.append("quantite", `${this.quantite}`);

        newFormdata.append("prix", this.prix);
        
        if (this.getArticle.categorie) {
          newFormdata.append("categorie_id", this.getArticle.categorie.id);
        } else {
          newFormdata.append("categorie_id", this.categorie.id);
        }

        newFormdata.append("description", this.description);
        for (let index = 0; index < jumele.length; index++) {
          const element = jumele[index];
          newFormdata.append(`jumele[${index}]`, jumele[index].jumeler_id);
        }

        newFormdata.append("count", this.multiJumele.length);

        const data = {
          id: this.getArticle.id,
          title: this.title,
          quantite: this.quantite,
          prix: this.prix,
          description: this.description,
          categorie_id: this.categorie.id,
          count: this.multiJumele.length,
          jumele: this.multiJumele.map((item) => {
            return { jumeler_id: item.articleJumele_id };
          }),
        };

        this.loading = true;
        await axios
          .post(URL.ARTICLE_UPDATE + `/${data.id}`, newFormdata, config)
          .then((response) => {
            if (response.data) {
              this.articleList.unshift(newFormdata);
              this.loading = false;
              (this.title = ""),
                (this.prix = ""),
                (this.categorie = ""),
                this.topEnd();
              this.$router.push("/article");
            }
          });
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
      bvModalEvt.preventDefault();
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
