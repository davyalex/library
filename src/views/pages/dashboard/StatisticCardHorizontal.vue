<template>
  <b-card no-body>
    <b-card-body class="d-flex justify-content-between align-items-center">
      <div class="truncate">
        <h2 class="mb-25 font-weight-bolder">
          {{ statistic }}
        </h2>
        <span>{{ statisticTitle }}</span>
      </div>
      <b-avatar
        :variant="`light-${color}`"
        size="45"
      >
        <feather-icon
          size="21"
          :icon="icon"
        />
      </b-avatar>
    </b-card-body>
      <div class="text-center">
        <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" class="m-auto" variant="primary">
        Plus de details
         <feather-icon
                    size="16"
                    icon="ChevronRightIcon"
                    class="cursor-pointer"
                  />
        </b-button>
      </div>
  </b-card>
</template>

<script>
import { BCard, BCardBody, BAvatar,BButton } from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BCardBody,
    BAvatar,
    BButton
  },
  props: {
    icon: {
      type: String,
      required: true,
    },
    statistic: {
      type: [Number, String],
      required: true,
    },
    statisticTitle: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'primary',
    },
  },
}
</script>
