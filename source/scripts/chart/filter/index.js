import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import axios from 'axios';
import Awesomplete from 'awesomplete';
import fuzzysort from 'fuzzysort';
// import Vue from 'vue';
import startRange from './noUiSlider';
import { handleChartForm } from './handleChartForm';
import hideNoMatchesAlert from './hideNoMatchesAlert';
import { updateTableInfo } from '../updateTableInfo';
import { handleAxisForm } from './handleAxisForm';
import clearFilters from './clearFilters';
import './vueFilter';
import { highlightPoint } from './highlightPoint';
import config from '../../config';

Exporting(Highcharts);

export default function handleChartFilters() {
  const cityInput = document.querySelector('#js-city');

  function getCities() {
    const url = `${config.api.domain}cities`;

    return axios.get(url)
      .then(response => response.data.cities);
  }

  function removeDiacritics(string) {
    return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  async function populateCitiesList() {
    if (cityInput) {
      // const citiesList = document.getElementById('cities-list');
      const cities = await getCities();
      const cityNames = cities.map(city => ({ label: `${city.name} - ${city.state.uf}`, value: city.id }));

      const awesomplete = new Awesomplete(cityInput, {
        nChars: 1,
        maxItems: 5,
        autoFirst: true,
        filter(text, input) {
          return fuzzysort.single(removeDiacritics(input), removeDiacritics(text.label));
        },
        replace(suggestion) {
          this.input.value = suggestion.label;
        },
      });
      awesomplete.list = cityNames;
    }
  }

  if (cityInput) {
    cityInput.addEventListener('input', () => {
      hideNoMatchesAlert();
    }, false);

    cityInput.addEventListener('awesomplete-selectcomplete', (event) => {
      clearFilters(event.target.id);
      highlightPoint(event.text.value);
      updateTableInfo(event.text.value, window.chartData.xAxis, window.chartData.data);
    }, false);
  }

  populateCitiesList();
  startRange();
  handleChartForm();
  handleAxisForm();
}
