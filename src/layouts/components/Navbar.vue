<template>
  <div class="navbar-container d-flex content align-items-center">

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link
          class="nav-link"
          @click="toggleVerticalMenuActive"
        >
          <feather-icon
            icon="MenuIcon"
            size="21"
          />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">
      <dark-Toggler class="d-none d-lg-block" />
    </div>

    <b-navbar-nav class="nav align-items-center ml-auto">
      <b-nav-item-dropdown
        right
        toggle-class="d-flex align-items-center dropdown-user-link"
        class="dropdown-user"
      >
        <template #button-content>
          <div class="d-sm-flex d-none user-nav">
            <p class="user-name font-weight-bolder mb-0">
             {{ user_connecte.nom }}  {{ user_connecte.prenoms }}
            </p>
            <span class="user-status">{{role.name}}</span>
          </div>
          <b-avatar
            size="40"
            variant="light-primary"
            badge
            :src="require('@/assets/images/avatars/219983.png')"
            class="badge-minimal"
            badge-variant="success"
          />
        </template>

        <!-- <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon
            size="16"
            icon="UserIcon"
            class="mr-50"
          />
          <span>Profile</span>
        </b-dropdown-item> -->

        <!-- <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon
            size="16"
            icon="MailIcon"
            class="mr-50"
          />
          <span>Inbox</span>
        </b-dropdown-item>

        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon
            size="16"
            icon="CheckSquareIcon"
            class="mr-50"
          />
          <span>Task</span>
        </b-dropdown-item>

        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon
            size="16"
            icon="MessageSquareIcon"
            class="mr-50"
          />
          <span>Chat</span>
        </b-dropdown-item>

        <b-dropdown-divider /> -->

        <b-dropdown-item link-class="d-flex align-items-center" @click="deconnecter">
          <feather-icon
            size="16"
            icon="LogOutIcon"
            class="mr-50"
          />
          <span>Deconnexion</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </div>
</template>

<script>
import {
  BLink, BNavbarNav, BNavItemDropdown, BDropdownItem, BDropdownDivider, BAvatar,
} from 'bootstrap-vue'
import DarkToggler from '@core/layouts/components/app-navbar/components/DarkToggler.vue'
import axios from "axios";
import URL from "@/views/pages/request";
export default {
  components: {
    BLink,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,
    axios,
    // Navbar Components
    DarkToggler,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },

  data(){
    return{
       user_connecte: "",
       role:"",
    }
  },

  mounted(){

      try {
         const config = {
        headers: {
          Accept: "application/json",
        },
      };
       axios.get(URL.USER_CONNECTE, config).then((response) => {
        this.user_connecte = response.data.auth
           this.role = response.data.role
           localStorage.setItem('user',JSON.stringify(this.user_connecte))
        console.log(this.user_connecte);
      });
      } catch (error) {
        console.log(error);
      }
  },

  methods:{
      deconnecter() {
      localStorage.clear();
      this.$router.push("/login");
    },
  }
}
</script>
