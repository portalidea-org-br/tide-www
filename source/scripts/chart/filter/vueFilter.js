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
      'Minas Gerais',
      'Mato Grosso do Sul',
      'Mato Grosso',
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
    inequalityRange: [
      { name: 'equidade', id: 'equidade' },
      { name: 'desigualdade', id: 'desigualdade' },
      { name: 'alta', id: 'alta' },
      { name: 'extrema', id: 'extrema' },
      { name: 'situações atípicas', id: 'situações-atipicas' },

    ],
    selectedInequality: null,
    qualityRange: [
      { name: 'baixa', id: 'baixa' },
      { name: 'media-baixa', id: 'media-baixa' },
      { name: 'media', id: 'media' },
      { name: 'media-alta', id: 'media-alta' },
      { name: 'alta', id: 'alta' },

    ],
    selectedQuality: null,
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
