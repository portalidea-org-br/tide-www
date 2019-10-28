/* global Vue */
import { submitAxisInfo } from './handleAxisForm';

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
        id: 1,
      },
      {
        name: 'nordeste',
        id: 2,
      },
      {
        name: 'norte',
        id: 3,
      },
      {
        name: 'sudeste',
        id: 4,
      },
      {
        name: 'sul',
        id: 5,
      },
    ],
    states: [
      { id: 1, name: 'Acre' },
      { id: 2, name: 'Alagoas' },
      { id: 3, name: 'Amapá' },
      { id: 4, name: 'Amazonas' },
      { id: 5, name: 'Bahia' },
      { id: 6, name: 'Ceará' },
      { id: 7, name: 'Distrito Federal' },
      { id: 8, name: 'Espírito Santo' },
      { id: 9, name: 'Goiás' },
      { id: 10, name: 'Maranhão' },
      { id: 11, name: 'Minas Gerais' },
      { id: 12, name: 'Mato Grosso do Sul' },
      { id: 13, name: 'Mato Grosso' },
      { id: 14, name: 'Pará' },
      { id: 15, name: 'Paraíba' },
      { id: 16, name: 'Paraná' },
      { id: 17, name: 'Pernambuco' },
      { id: 18, name: 'Piauí' },
      { id: 19, name: 'Rio de Janeiro' },
      { id: 20, name: 'Rio Grande do Norte' },
      { id: 21, name: 'Rio Grande do Sul' },
      { id: 22, name: 'Rondônia' },
      { id: 23, name: 'Roraima' },
      { id: 24, name: 'Santa Catarina' },
      { id: 25, name: 'São Paulo' },
      { id: 26, name: 'Sergipe' },
      { id: 27, name: 'Tocantins' },
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
    showAdvancedFilters: false,
  },
  watch: {
    // whenever question changes, this function will run
    selectedFilters: {
      // eslint-disable-next-line object-shorthand
      handler: function () {
        this.toggleFilterFormLoading();
        this.handleChartFiltersAvailability();
        this.toggleFilterFormLoading();
      },
      deep: true,
    },
  },
  created() {},
  mounted() {
    // this.chartData = window.chartData.data;
  },
  methods: {
    toggleFilterFormLoading() {
      this.filterFormLoading = !this.filterFormLoading;
    },
    toggleAdvancedFilters() {
      this.showAdvancedFilters = !this.showAdvancedFilters;
    },
    clearAllSelectedFilters() {
      Object.keys(this.selectedFilters).forEach((key) => {
        this.selectedFilters[key] = null;
      });
      submitAxisInfo();
    },
    checkRegion() {
      this.regions = this.regions.filter((item) => {
        const itContains = this.chartData.some(city => city.region.id === item.id);
        if (!itContains) {
          item.disabled = true;
        } else {
          item.disabled = false;
        }
        return item;
      });
    },
    checkState() {
      this.states = this.states.filter((item) => {
        const itContains = this.chartData.some(city => city.state.id === item.id);
        if (!itContains) {
          item.disabled = true;
        } else {
          item.disabled = false;
        }
        return item;
      });
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
      this.chartData = window.globalChartData;

      if (this.selectedFilters.selectedState) {
        this.chartData = this.chartData.filter(
          item => item.state.id === this.selectedFilters.selectedState,
        );
      }
      if (this.selectedFilters.selectedRegion) {
        this.chartData = this.chartData.filter(
          item => item.region.id === this.selectedFilters.selectedRegion,
        );
      }
      if (this.selectedFilters.selectedInequality) {
        this.chartData = this.chartData.filter(
          item => item.range_inequality === this.selectedFilters.selectedInequality,
        );
      }
      if (this.selectedFilters.selectedQuality) {
        this.chartData = this.chartData.filter(
          item => item.range_quality === this.selectedFilters.selectedQuality,
        );
      }

      this.checkRegion();
      this.checkQuality();
      this.checkInequality();
      this.checkState();
    },
  },
});
