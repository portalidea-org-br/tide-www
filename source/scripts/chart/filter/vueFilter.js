/* global Vue */

const toPercentageFilter = function toPercentageFilter(value) {
  return `${Math.round(parseFloat(value) * 100)}%`;
};

Vue.filter('toPercentage', toPercentageFilter);

window.$vue = new Vue({
  el: '#app',
  data: {
    regions: [
      {
        name: 'centro oeste',
        id: 'centro-oeste',
      },
      {
        name: 'nordeste',
        id: 'nordeste',
      },
      {
        name: 'norte',
        id: 'norte',
      },
      {
        name: 'sudeste',
        id: 'sudeste',
      },
      {
        name: 'sul',
        id: 'sul',
      },
    ],
    selectedRegion: null,
    states: [
      'Selecionar',
      'Acre',
      'Alagoas',
      'Amapá',
      'Amazonas',
      'Bahia',
      'Ceará',
      'Distrito Federal',
      'Espírito Santo',
      'Goiás',
      'Maranhão',
      'Mato Grosso',
      'Mato Grosso do Sul',
      'Minas Gerais',
      'Pará',
      'Paraíba',
      'Paraná',
      'Pernambuco',
      'Piauí',
      'Rio de Janeiro',
      'Rio Grande do Norte',
      'Rio Grande do Sul',
      'Rondônia',
      'Roraima',
      'Santa Catarina',
      'São Paulo',
      'Sergipe',
      'Tocantins',
    ],
    selectedState: null,
  },
  created() {},
  mounted() {
    console.log('mounted');
  },
  methods: {
    clearInput(toClear) {
      console.log(this.toClear);
      this.toClear
    },
  },
});
