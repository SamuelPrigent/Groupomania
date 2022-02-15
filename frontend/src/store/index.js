// Je n'avait pas la ligne suivante :
// Vue.use(Vuex)

import { createStore } from "vuex";

export default createStore({
  state: {
    isConnected: !!localStorage.getItem("token"),
  },

  // Combiner des infos
  getters: {},
  // Mutations - modifie le state
  mutations: {
    connected(state) {
      state.isConnected = true;
    },
    disconnected(state) {
      state.isConnected = false;
    },
  },
  // Actions selon contexte
  actions: {},
  // Modules
  modules: {},
});
