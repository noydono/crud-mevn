<template>
  <v-row>
    <v-col>
      <h1>Create idea</h1>
      <form @submit="submitIdea">
        <v-textarea
          solo
          name="input-7-4"
          label="Votre idea"
          @change="_setForm"
        ></v-textarea>
       
        <v-btn type="submit">submit</v-btn>
      </form>
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
export default {
  methods: {
    ...mapMutations(["SET_FORM"]),
    ...mapActions(["createIdea"]),

    _setForm(value) {
      this.SET_FORM({ key: "idea", value: value });
    },

    submitIdea(event) {
      event.preventDefault();
      this.createIdea();
    },
  },
};
</script>

<style scoped>
textarea {
  width: 400px;
  height: 200px;
  font-size: 24px;
}
</style>
