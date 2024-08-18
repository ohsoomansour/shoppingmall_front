<template>
  <v-btn large color="success" @click="submitOrder">
    Submit Order
  </v-btn>
</template>

<script>
import { mapActions } from 'vuex';



export default {
  methods: {
    ...mapActions(['submitOrder'])
  }
}
</script>
