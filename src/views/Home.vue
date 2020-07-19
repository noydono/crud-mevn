<template>
  <v-row>
    <v-col>
      <v-row class="d-flex justify-end mt-5">
        <v-btn ><i  class="fas fa-sort-alpha-down"></i></v-btn>
        <v-btn color="primary" ><i class="fas fa-sort-numeric-up"></i></v-btn>
      </v-row> 

      <v-row col="12" md="12">
        <v-col>
          <v-card class="my-5" v-for="(idea, key) in ideas" :key="key">
            <v-card-title>{{ idea.idea }}</v-card-title>
            <v-card-actions>
              <v-btn @click="upVoteIdea(idea)"> up vote </v-btn>
              <span class="mx-5">{{ idea.votes }}</span>
              <v-btn @click="downVoteIdea(idea)"> down vote </v-btn>
              <v-btn @click="deleteVoteIdea(idea)" class="ml-5" color="red">delete idea</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapState } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      
    };
  },
  created() {
    this.getIdeas();
  },
  components: {},
  methods: {
    ...mapActions(["getIdeas", "upVoteIdea", "downVoteIdea", "deleteVoteIdea"]),
  },

  computed: {
    ...mapState(["ideas"]),
  },
};
</script>
