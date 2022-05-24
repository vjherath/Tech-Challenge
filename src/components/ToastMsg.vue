<template>
    <v-snackbar v-model="error">{{errorMsg}}</v-snackbar>
</template>

<script lang="ts">
    export default {
    name: 'ToastMsg',
    props: {
            errorMsg : String
    },
    data() {
        return {
            error: true
        };
    }
    }
</script>

<style scoped>
 /* Scoped CSS here */
</style>