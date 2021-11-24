import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'faSvg',
  },

  

  theme: {
    themes: {
      light: {
        primary: '#1ba9bf',
      },
    },
  },
});
