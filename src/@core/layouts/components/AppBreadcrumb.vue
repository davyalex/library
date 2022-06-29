<template>
  <b-row
    v-if="$route.meta.breadcrumb || $route.meta.pageTitle"
    class="content-header"
  >
    <!-- Content Left -->
    <b-col class="content-header-left mb-2" cols="12" md="9">
      <b-row class="breadcrumbs-top">
        <b-col cols="12">
          <h2 class="content-header-title float-left pr-1 mb-0">
            {{ $route.meta.pageTitle }}
          </h2>
          <div class="breadcrumb-wrapper">
            <b-breadcrumb>
              <b-breadcrumb-item to="/">
                <feather-icon
                  icon="HomeIcon"
                  size="16"
                  class="align-text-top"
                />
              </b-breadcrumb-item>
              <b-breadcrumb-item
                v-for="item in $route.meta.breadcrumb"
                :key="item.text"
                :active="item.active"
                :to="item.to"
              >
                {{ item.text }}
              </b-breadcrumb-item>
            </b-breadcrumb>
          </div>
        </b-col>
      </b-row>
    </b-col>

    <!-- Content Right -->
    <b-col
      class="content-header-right text-md-right d-md-block d-none mb-1"
      md="3"
      cols="12"
    >
      <b-dropdown variant="link" no-caret toggle-class="p-0" right>
        <template #button-content>
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="btn-icon"
          >
            <feather-icon icon="SettingsIcon" />
          </b-button>
        </template>

        <b-dropdown-item
          v-for="(item, index) in typeParametre"
          :key="index.id"
          @click="getTypeParametre(item)"
        >
          <feather-icon icon="SettingsIcon" size="16" />
          <router-link to="/parametre" class="align-middle ml-50">
            {{ item.title }}
          </router-link>
        </b-dropdown-item>

        <!-- <b-dropdown-item >
          <feather-icon
            icon="MessageSquareIcon"
            size="16"
          />
          <span class="align-middle ml-50">Chat</span>
        </b-dropdown-item>

        <b-dropdown-item :to="{ name: 'apps-email' }">
          <feather-icon
            icon="MailIcon"
            size="16"
          />
          <span class="align-middle ml-50">Email</span>
        </b-dropdown-item>

        <b-dropdown-item :to="{ name: 'apps-calendar' }">
          <feather-icon
            icon="CalendarIcon"
            size="16"
          />
          <span class="align-middle ml-50">Calendar</span>
        </b-dropdown-item> -->
      </b-dropdown>
    </b-col>
  </b-row>
</template>

<script>
import {
  BBreadcrumb,
  BBreadcrumbItem,
  BRow,
  BCol,
  BDropdown,
  BDropdownItem,
  BButton,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import URL from "@/views/pages/request";
import axios from "axios";

export default {
  directives: {
    Ripple,
  },
  components: {
    BBreadcrumb,
    BBreadcrumbItem,
    BRow,
    BCol,
    BDropdown,
    BDropdownItem,
    BButton,
    axios,
  },

  data() {
    return {
      typeParaAdmin: "",
      getUser: "",
      userRole: "",
      typeParametre: [],
    };
  },

  async mounted() {
    try {

       await axios.get(URL.TYPEPARAMETRE).then((response) => {
        this.typeParametre = response.data.liste;
          if (this.typeParametre) {
          localStorage.setItem('typeParametre', JSON.stringify(this.typeParametre));
          }
      });
      this.typeParametre = JSON.parse(localStorage.getItem("typeParametre"));

      this.typeParaAdmin = this.typeParametre.filter(
        (item) => item.status === 1
      );

      console.log("typeparametre", this.typeParaAdmin);

      this.getUser = JSON.parse(localStorage.getItem("user"));
      this.userRole = this.getUser.roles[0].name;
      console.log("user", this.userRole);

      if (this.userRole === "admin") {
        this.typeParametre = this.typeParaAdmin;
        console.log("typeparametre", this.typeParaAdmin);
      }

    } catch (error) {}
  },

  // computed:{
  //     refresh(){
  //        this.typeParametre = JSON.parse(localStorage.getItem("typeParametre"));

  //     this.typeParaAdmin = this.typeParametre.filter(
  //       (item) => item.status === 1
  //     );

  //     console.log("typeparametre", this.typeParaAdmin);

  //     this.getUser = JSON.parse(localStorage.getItem("user"));
  //     this.userRole = this.getUser.roles[0].name;
  //     console.log("user", this.userRole);

  //     if (this.userRole === "admin") {
  //       this.typeParametre = this.typeParaAdmin;
  //     }
  //     }
  // },

  // beforeMount() {
  //     try {
  //     this.typeParametre = JSON.parse(localStorage.getItem("typeParametre"));

  //     this.typeParaAdmin = this.typeParametre.filter(
  //       (item) => item.status === 1
  //     );

  //     console.log("typeparametre", this.typeParaAdmin);

  //     this.getUser = JSON.parse(localStorage.getItem("user"));
  //     this.userRole = this.getUser.roles[0].name;
  //     console.log("user", this.userRole);

  //     if (this.userRole === "admin") {
  //       this.typeParametre = this.typeParaAdmin;
  //     }
  //   } catch (error) {}
  //   },

  methods: {
    getTypeParametre(item) {
      localStorage.setItem("typeParaSlug", JSON.stringify(item.slug));

      if (this.$route.path === "/parametre") {
        this.$router.go(0);
        console.log(this.$route.path);
      } else {
        this.$router.push("/parametre");
      }
    },
  },
};
</script>
