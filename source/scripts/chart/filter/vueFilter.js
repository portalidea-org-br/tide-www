/* global Vue */
// import './handleChartFilters';

const toPercentageFilter = function toPercentageFilter(value) {
  return `${Math.round(parseFloat(value) * 100)}%`;
};

Vue.filter('toPercentage', toPercentageFilter);

window.$vue = new Vue({
  el: '#app',
  data: {
    chartData: null,
    selectedFilters: {
      selectedInequality: null,
      selectedRegion: null,
      selectedQuality: null,
    },
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
    inequalityRange: [
      { name: 'equidade', id: 'equidade' },
      { name: 'desigualdade', id: 'desigualdade' },
      { name: 'alta', id: 'desigualdade-alta' },
      { name: 'extrema', id: 'desigualdade-extrema' },
      { name: 'situações atípicas', id: 'situacoes-atipicas' },

    ],
    qualityRange: [
      { name: 'baixa', id: 'baixa' },
      { name: 'media-baixa', id: 'medio-baixa' },
      { name: 'media', id: 'media' },
      { name: 'media-alta', id: 'medio-alta' },
      { name: 'alta', id: 'alta' },

    ],
    filterFormLoading: false,
  },
  watch: {
    // whenever question changes, this function will run
    selectedFilters: {
      // eslint-disable-next-line object-shorthand
      handler: function () {
        console.log('watcheeeer!');
        this.handleChartFiltersAvailability();
      },
      deep: true,
    },
    // selectedFilters: function () {
    // },
    // deep: true,
  },
  created() {},
  mounted() {
    // this.chartData = window.chartData.data;
  },
  methods: {
    // clearInput(toClear) {
    //   console.log(this.toClear);
    //   this.toClear;
    // },
    toggleFilterFormLoading() {
      this.filterFormLoading = !this.toggleFilterFormLoading;
    },
    checkInequality() {
      this.inequalityRange = this.inequalityRange.filter((item) => {
        const itContains = this.chartData.some(city => city.range_inequality === item.id);
        if (!itContains) {
          item.disabled = true;
        } else {
          item.disabled = false;
        }
        return item;
      });
    },
    checkQuality() {
      this.qualityRange = this.qualityRange.filter((item) => {
        console.log('quality?');
        const itContains = this.chartData.some(city => city.range_quality === item.id);
        if (!itContains) {
          item.disabled = true;
        } else {
          item.disabled = false;
        }
        return item;
      });
    },
    handleChartFiltersAvailability() {
      this.toggleFilterFormLoading();
      this.chartData = window.globalChartData;

      // console.log(this.chartData, this.inequalityRange);

      if (this.selectedFilters.selectedState) {
        this.chartData = this.chartData.filter(item => item.state.id === this.selectedFilters.selectedState);
      }
      if (this.selectedFilters.selectedRegion) {
        this.chartData = this.chartData.filter(item => item.region.id === this.selectedFilters.selectedRegion);
      }

      // console.log(this.chartData, this.inequalityRange);

      this.checkInequality();

      this.checkQuality();

      this.toggleFilterFormLoading();
    },
  },
});
