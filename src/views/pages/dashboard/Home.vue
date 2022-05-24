<template>
  <b-row>
    <b-col cols="6">
       <b-card
   
    text-variant="center"
    class="card card-congratulations"
  >
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

    <b-avatar
      variant="primary"
      size="70"
      class="shadow mb-2"
    >
      <feather-icon
        size="28"
        icon="AwardIcon"
      />
    </b-avatar>
    <h1 class="mb-1 mt-50 text-white">
     Bienvenue, Admin
    </h1>
    <b-card-text class="m-auto w-75">
      Vvous avez réalisé <strong>500.000.000 FCFA</strong>de chiffre d'affaire ce mois.
    </b-card-text>
  </b-card>
    </b-col>

    <b-col cols="6">
      <b-card  class="card-congratulation-medals">
        <b-card-header>
          <b-card-title>Statistiques</b-card-title>
          <b-card-text class="mr-25 mb-0">  </b-card-text>
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

    <b-col
       cols="6"
      >
        <statistic-card-vertical
          color="primary"
          icon="ShoppingBagIcon"
          statistic="100"
          statistic-title="Commandes du jour"
        />
      </b-col>

       <b-col
       cols="6"
      >
        <statistic-card-vertical
          color="success"
          icon="TruckIcon"
          statistic="70"
          statistic-title="Commandes livrées"
        />
      </b-col>

       <b-col
       cols="4"
      >
        <statistic-card-horizontal
          icon="BookOpenIcon"
          statistic="Kits disponibles"
          statistic-title="200"
          
        />
        
      </b-col>
        <b-col
       cols="4"
      >
        <statistic-card-horizontal
          icon="BookmarkIcon"
          statistic="Enseignements"
          statistic-title="5"
        />
      </b-col>

        <b-col
       cols="4"
      >
        <statistic-card-horizontal
          icon="HomeIcon"
          statistic="Diocèse"
          statistic-title="20"
        />
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
import StatisticCardVertical from './composant/StatisticCardVertical.vue';
import RecenteCommande from './composant/RecenteCommande.vue';

import StatisticCardHorizontal from './composant/StatisticCardHorizontal.vue';
import moment from "moment";


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
       moment
  },


  data() {
    return {
      statisticsItems: [
       
        {
          icon: "UserIcon",
          color: "light-info",
          title: "1000",
          subtitle: "title",
          customClass: "mb-2 mb-xl-0",
        },
        {
          icon: "BookIcon",
          color: "light-danger",
          title: "50",
          subtitle: "Etablissements",
          customClass: "mb-2 mb-sm-0",
        },
      ],

       transactionData: [
      
        {
          mode: 'Commande #00026',
          types: 'livrée',
          avatar: 'CheckIcon',
          avatarVariant: 'light-success',
          payment: '12000 FCFA',
          deduction: false,
        },


           {
          mode: 'Commande #00027',
          types: 'livrée',
          avatar: 'CheckIcon',
          avatarVariant: 'light-success',
          payment: '15000 FCFA',
          deduction: false,
        },

           {
          mode: 'Commande #00028',
          types: 'livrée',
          avatar: 'CheckIcon',
          avatarVariant: 'light-success',
          payment: '15000 FCFA',
          deduction: false,
        },
           {
          mode: 'Commande #00029',
          types: 'livrée',
          avatar: 'CheckIcon',
          avatarVariant: 'light-success',
          payment: '10000 FCFA',
          deduction: false,
        },
       
      
      ],

    
    };
  },

  methods: {},
};
</script>

<style></style>
