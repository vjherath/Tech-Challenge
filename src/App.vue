<template>
  <v-app>
    <v-main>
      <AppBar />
      <ImageUploader />
    </v-main>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar.vue'
import ImageUploader from './views/ImageUploader.vue'

export default {
  name: 'App',

  components: {
    AppBar,
    ImageUploader
},


  data: () => ({
    //
  }),
}
</script>
