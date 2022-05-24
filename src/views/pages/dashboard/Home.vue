<template>
  <b-row>
    <b-col cols="6">
      <b-card class="card-congratulation-medal">
        <h5>Bienvenue 🎉 John!</h5>
        <b-card-text class="font-small-3">
         Voiçi votre chiffre d'affaire du mois en cours
     
        </b-card-text>
        <h3 class="mb-0 mt-0">
          <b-link>48.000.000 FCFA</b-link>
        </h3>
        <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" class="mb-1" variant="primary">
        Details
         <feather-icon
                    size="16"
                    icon="ChevronRightIcon"
                    class="cursor-pointer"
                  />
        </b-button>
        <b-img
          :src="require('@/assets/images/illustration/badge.svg')"
          class="congratulation-medal"
          alt="Medal Pic"
        />
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
                  <h4 class="font-weight-bolder mb-0">
                    {{ item.title }}
                  </h4>
                  <b-card-text class="font-small-3 mb-0">
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
 <b-card
    class="card-transaction"
    no-body
  >
    <b-card-header>
      <b-card-title>Commandes recentes</b-card-title>
      <feather-icon
        icon="PlusIcon"
        size="18"
        class="cursor-pointer"
      />
    </b-card-header>

    <b-card-body>
      <div
        v-for="transaction in transactionData"
        :key="transaction.mode"
        class="transaction-item"
      >
        <b-media no-body>
          <b-media-aside>
            <b-avatar
              rounded
              size="42"
              :variant="transaction.avatarVariant"
            >
              <feather-icon
                size="18"
                :icon="transaction.avatar"
              />
            </b-avatar>
          </b-media-aside>
          <b-media-body>
            <h6 class="transaction-title">
              {{ transaction.mode }}
            </h6>
            <small>{{ transaction.types }}</small>
          </b-media-body>
        </b-media>
        <div
          class="font-weight-bolder"
          :class="transaction.deduction ? 'text-danger':'text-success'"
        >
          {{ transaction.payment }}
        </div>
      </div>
    </b-card-body>
  </b-card>
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
import StatisticCardVertical from '../dashboard/StatisticCardVertical.vue';
import StatisticCardHorizontal from '../dashboard/StatisticCardHorizontal.vue';



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
  },

  data() {
    return {
      statisticsItems: [
       
        {
          icon: "UserIcon",
          color: "light-info",
          title: "1000",
          subtitle: "Clients",
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
