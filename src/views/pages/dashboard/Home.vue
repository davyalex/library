<template>
  <b-row>
    <b-col cols="6">
      <b-card text-variant="center" class="card card-congratulations">
        <!-- images -->
        <b-img
          :src="require('@/assets/images/elements/decore-left.png')"
          class="congratulations-img-left"
        />
        <b-img
          :src="require('@/assets/images/elements/decore-right.png')"
          class="congratulations-img-right"
        />
        <!--/ images -->

        <b-avatar variant="primary" size="70" class="shadow mb-2">
          <feather-icon size="28" icon="AwardIcon" />
        </b-avatar>
        <h1 class="mb-1 mt-50 text-white">
          Bienvenue, {{ user_connecte.nom }} {{ user_connecte.prenoms }}
        </h1>
        <b-card-text class="m-auto w-75">
          Vvous avez réalisé <strong> {{ dashboard.chiffreAffaire }} </strong>de chiffre
          d'affaire ce mois.
        </b-card-text>
      </b-card>
    </b-col>

    <b-col cols="6">
      <b-card class="card-congratulation-medals">
        <b-card-header>
          <b-card-title>Statistiques</b-card-title>
          <b-card-text class="mr-25 mb-0"> </b-card-text>
        </b-card-header>
        <b-card-body class="statistics-body">
          <b-row>
            <b-col
              v-for="item in statisticsItems"
              :key="item.icon"
              md="6"
              sm="12"
              class="mb-2 mb-md-0"
              :class="item.customClass"
            >
              <b-media no-body>
                <b-media-aside class="mr-2">
                  <b-avatar size="48" :variant="item.color">
                    <feather-icon size="24" :icon="item.icon" />
                  </b-avatar>
                </b-media-aside>
                <b-media-body class="my-auto">
                  <h4 class="font-weight-bolder mb-2">
                    {{ item.title }}
                  </h4>
                  <b-card-text class="font-small-3 mb-3">
                    {{ item.subtitle }}
                  </b-card-text>
                </b-media-body>
              </b-media>
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>
    </b-col>

    <!-- commandes -->

    <b-col v-for="item in commandesItems" :key="item.icon" cols="4">
      <b-card no-body>
        <b-card-body class="d-flex justify-content-between align-items-center">
          <div class="truncate">
            <h2 class="mb-25 font-weight-bolder">
              {{ item.number }}
            </h2>
            <span>{{ item.title }}</span>
          </div>
          <b-avatar size="48" :variant="item.color">
            <feather-icon size="24" :icon="item.icon" />
          </b-avatar>
        </b-card-body>
        <div class="text-center">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            class="mb-2"
            variant="success"
          >
            <b-link :to="{ name: 'commande' }">
              <span class="text-white">Plus de details</span>
            </b-link>
            <feather-icon
              size="16"
              icon="ChevronRightIcon"
              class="cursor-pointer"
            />
          </b-button>
        </div>
      </b-card>
    </b-col>

    <!-- other -->

    <b-col v-for="item in othersItems" :key="item.icon" cols="4">
      <b-card no-body>
        <b-card-body class="d-flex justify-content-between align-items-center">
          <div class="truncate">
            <h2 class="mb-25 font-weight-bolder">
              {{ item.title }}
            </h2>
            <span>{{ item.number }}</span>
          </div>
          <b-avatar size="48" :variant="item.color">
            <feather-icon size="24" :icon="item.icon" />
          </b-avatar>
        </b-card-body>
        <div class="text-center">
          <!-- <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            class="mb-2"
            variant="success"
          >
            <b-link :to="{ name: 'commande' }">
                <span class="text-white">Plus de details</span>
              </b-link>
            <feather-icon
              size="16"
              icon="ChevronRightIcon"
              class="cursor-pointer"
            />
          </b-button> -->
        </div>
      </b-card>
    </b-col>

    <b-col cols="12">
      <recente-commande />
    </b-col>
  </b-row>
</template>

<script>
import {
  BCard,
  BButton,
  BCardText,
  BLink,
  BImg,
  BRow,
  BCardHeader,
  BCardTitle,
  BCardBody,
  BMedia,
  BAvatar,
  BMediaAside,
  BMediaBody,
  BCol,
} from "bootstrap-vue";
import { reactive, ref, computed, onMounted } from "@vue/composition-api";
import StatisticCardVertical from "./composant/StatisticCardVertical.vue";
import RecenteCommande from "./composant/RecenteCommande.vue";

import StatisticCardHorizontal from "./composant/StatisticCardHorizontal.vue";
import moment from "moment";
import URL from "@/views/pages/request";
import axios from "axios";
import { forEach } from "postcss-rtl/lib/affected-props";

export default {
  components: {
    BCard,
    BCardText,
    BLink,
    BLink,
    BImg,
    BButton,
    BRow,
    BCol,
    BRow,
    BCol,
    BCardHeader,
    BCardTitle,
    BCardText,
    BCardBody,
    BMedia,
    BAvatar,
    BMediaAside,
    BMediaBody,
    StatisticCardVertical,
    StatisticCardHorizontal,
    RecenteCommande,
    moment,
  },

  data() {
    return {
      user_connecte: "",
      role: "",
      dashboard: [],
      commandeJour: "",
      commandeAttente: "",
      commandeLivree: "",

      statisticsItems: [
        {
          icon: "UserIcon",
          color: "light-info",
          title: "",
          subtitle: "Clients",
          customClass: "mb-2 mb-xl-0",
        },
        {
          icon: "BookIcon",
          color: "light-danger",
          title: "",
          subtitle: "Etablissements",
          customClass: "mb-2 mb-sm-0",
        },
      ],

      commandesItems: [
        {
          icon: "ShoppingBagIcon",
          color: "light-info",
          number: "",
          title: "Commandes du jour",
          // customClass: "mb-2 mb-xl-0",
        },
        {
          icon: "TruckIcon",
          color: "light-warning",
          number: "",
          title: "Commandes en attentes",
          // customClass: "mb-2 mb-sm-0",
        },
        {
          icon: "TruckIcon",
          color: "light-success",
          number: "",
          title: "Commandes livrées",
          // customClass: "mb-2 mb-sm-0",
        },
      ],

      othersItems: [
        {
          icon: "BookOpenIcon",
          color: "light-info",
          number: "",
          title: "Kits disponibles",
          // customClass: "mb-2 mb-xl-0",
        },
        {
          icon: "BookmarkIcon",
          color: "light-warning",
          number: "",
          title: "Enseignements",
          // customClass: "mb-2 mb-sm-0",
        },
        {
          icon: "HomeIcon",
          color: "light-success",
          number: "",
          title: "Diocèses",
          // customClass: "mb-2 mb-sm-0",
        },
      ],

      transactionData: [
        {
          mode: "Commande #00026",
          types: "livrée",
          avatar: "CheckIcon",
          avatarVariant: "light-success",
          payment: "12000 FCFA",
          deduction: false,
        },

        {
          mode: "Commande #00027",
          types: "livrée",
          avatar: "CheckIcon",
          avatarVariant: "light-success",
          payment: "15000 FCFA",
          deduction: false,
        },

        {
          mode: "Commande #00028",
          types: "livrée",
          avatar: "CheckIcon",
          avatarVariant: "light-success",
          payment: "15000 FCFA",
          deduction: false,
        },
        {
          mode: "Commande #00029",
          types: "livrée",
          avatar: "CheckIcon",
          avatarVariant: "light-success",
          payment: "10000 FCFA",
          deduction: false,
        },
      ],
    };
  },

  async mounted() {
    document.title = "Dashboard";
    await axios.get(URL.TYPEPARAMETRE).then((response) => {
      this.typeParametre = response.data.liste;
      if (this.typeParametre) {
        localStorage.setItem(
          "typeParametre",
          JSON.stringify(this.typeParametre)
        );
      }
    });

    try {
      const config = {
        headers: {
          Accept: "application/json",
        },
      };
      axios.get(URL.USER_CONNECTE, config).then((response) => {
        this.user_connecte = response.data.auth;
        this.role = response.data.role;
        console.log(this.user_connecte);
      });

      axios.get(URL.DASHBOARD + `/?role=client`, config).then((response) => {
        this.dashboard = response.data;
        this.statisticsItems[0].title = this.dashboard.client;
        this.statisticsItems[1].title = this.dashboard.etablissements;

        this.commandesItems[0].number = this.dashboard.dayCommande;
        this.commandesItems[1].number = this.dashboard.commandeAttente;
        this.commandesItems[2].number = this.dashboard.commandeLivree;

        this.othersItems[0].number = this.dashboard.kit;
        this.othersItems[1].number = this.dashboard.enseignements;
        this.othersItems[2].number = this.dashboard.dioceses;





        console.log("dashboard", this.dashboard);
      });
    } catch (error) {
      console.log(error);
    }
  },

  methods: {},
};
</script>

<style></style>
