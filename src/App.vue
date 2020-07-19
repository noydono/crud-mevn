<template>
   <v-app>
    <v-app-bar color="indigo darken-2" app>
      <v-toolbar-title > <router-link class="link white--text" to="/">Crud MEVN</router-link> </v-toolbar-title>   
      <v-spacer></v-spacer>
      <v-btn @click="$router.push('/create-idea')">add new idea</v-btn>
    </v-app-bar>
    <v-container class="mt-12">
      <router-view />
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
};
</script>

<style >
.link{
  text-decoration: none ;
}
  
</style>