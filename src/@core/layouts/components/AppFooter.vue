<template>
  <p class="clearfix mb-0">
    <span class="float-md-left d-block d-md-inline-block mt-25">
      COPYRIGHT  © {{ new Date().getFullYear() }}
      <b-link
        class="ml-25"
      >Siloë-school connect</b-link>
      <span class="d-none d-sm-inline-block">, Tous droits reservés</span>
    </span>

    <span class="float-md-right d-none d-md-block">Developpé par 
     <a :href="'https://www.qenium.com/'" target="_blank"> Qenium </a>
      
     
    </span>
  </p>
</template>

<script>
import { BLink } from 'bootstrap-vue'

export default {
  components: {
    BLink,
  },

  methods:{
    redirect(){
      window.location('https://www.qenium.com/')
    }
  }
}
</script>
