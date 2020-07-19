import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import axios from "axios";
import router from "../router";
import { Object } from "core-js";

export default new Vuex.Store({
  state: {
    form: {},
    ideas: [],
  },

  mutations: {
    SET_FORM(state, { key, value }) {
      state.form[key] = value;
    },
    SET_IDEAS(state, ideas) {
      ideas.sort(function(b,a) {
        let aId = a.votes,
            bId = b.votes;

        if (aId < bId) {
          return -1;
        } else if (aId > bId) {
          return 1;
        } else if (aId === bId) {
          return 0;
        }
      });
      state.ideas = ideas;
    },
    SET_IDEA(state, updateIdea) {
      Object.assign(
        state.ideas.find((idea) => idea._id === updateIdea._id),
        updateIdea
      );
      state.ideas.sort(function(b,a) {
        let aId = a.votes,
            bId = b.votes;

        if (aId < bId) {
          return -1;
        } else if (aId > bId) {
          return 1;
        } else if (aId === bId) {
          return 0;
        }
      });
      

    },
    DEL_IDEA(state, idea) {
      const result = state.ideas.filter((word) => word._id != idea.value._id);
      state.ideas = result;
    }
    
  },
  actions: {
    async createIdea(context) {
      await axios.post("http://localhost:5000/ideas", context.state.form);
      router.push("/");
    },
    async getIdeas(context) {
      const { data: ideas } = await axios.get("http://localhost:5000/ideas");
      context.commit("SET_IDEAS", ideas);
    },
    async upVoteIdea(context, idea) {
      const { data: updateIdea } = await axios.post(
        `http://localhost:5000/ideas/${idea._id}/votes`
      );
      context.commit("SET_IDEA", updateIdea);
    },
    async downVoteIdea(context, idea) {
      const { data: updateIdea } = await axios.delete(
        `http://localhost:5000/ideas/${idea._id}/votes`
      );
      context.commit("SET_IDEA", updateIdea);
    },
    async deleteVoteIdea(context, idea) {
      const { data: ideaDelete } = await axios.delete(
        `http://localhost:5000/ideas/${idea._id}/delete`
      );
      context.commit("DEL_IDEA", ideaDelete);
    },
  },
  modules: {},
});
