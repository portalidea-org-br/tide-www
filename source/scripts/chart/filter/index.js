import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import axios from 'axios';
import Awesomplete from 'awesomplete';
import { updateTableInfo, clearTableInfo } from '../updateTableInfo';
import { populateChartData, toggleLoading } from '../plotCharts';
import clearFilters from './clearFilters';
import { highlightPoint } from './highlightPoint';

Exporting(Highcharts);

export default function handleChartFilters() {
  const jsChartForm = document.getElementById('js-chart-form');
  const cityInput = document.getElementById('city');
  const highlightInput = document.getElementById('highlight');
  const regionInput = document.getElementById('region');

  function getCities() {
    const url = 'https://dapitide.eokoe.com/api/cities';

    return axios.get(url)
      .then(response => response.data.cities);
  }

  async function populateCitiesList() {
    if (cityInput) {
      // const citiesList = document.getElementById('cities-list');
      const cities = await getCities();
      const cityNames = cities.map(city => ({ label: `${city.name} - ${city.state.name}`, value: city.id }));

      const awesomplete = new Awesomplete(document.querySelector('#city'), {
        nChars: 1,
        maxItems: 5,
        autoFirst: true,
        replace(suggestion) {
          this.input.value = suggestion.label;
        },
      });
      awesomplete.list = cityNames;
    }
  }


  function hideNoMatchesAlert() {
    document.querySelector('.js-no-matches').setAttribute('hidden', true);
  }

  function clearHighlightedPoints() {
    const ptChartDom = document.getElementById('pt-chart');
    const matChartDom = document.getElementById('mat-chart');
    const ptChart = Highcharts.charts[Highcharts.attr(ptChartDom, 'data-highcharts-chart')];
    const matChart = Highcharts.charts[Highcharts.attr(matChartDom, 'data-highcharts-chart')];
    const selectedPtPoints = ptChart.getSelectedPoints();
    const selectedMatPoints = matChart.getSelectedPoints();

    if (selectedPtPoints[0]) {
      selectedPtPoints[0].select();
      selectedMatPoints[0].select();
    }
  }


  if (jsChartForm) {
    jsChartForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const payload = {};

      payload.grade = formData.get('grade');
      payload.xAxis = formData.get('xAxis');

      toggleLoading();
      populateChartData(payload);
      clearFilters();
      clearTableInfo();
      hideNoMatchesAlert();
      toggleLoading();
    });
  }

  function highlightPoints(parameter, value) {
    const ptChartDom = document.getElementById('pt-chart');
    const matChartDom = document.getElementById('mat-chart');
    const ptChart = Highcharts.charts[Highcharts.attr(ptChartDom, 'data-highcharts-chart')];
    const matChart = Highcharts.charts[Highcharts.attr(matChartDom, 'data-highcharts-chart')];

    clearHighlightedPoints();

    if (parameter === 'big-cities') {
      ptChart.series[0].points.forEach((point) => {
        if (point.options.is_big_town === 1) {
          point.select(true, true);
          point.graphic.toFront();
        }
      });

      matChart.series[0].points.forEach((point) => {
        if (point.options.is_big_town === 1) {
          point.select(true, true);
          point.graphic.toFront();
        }
      });
    }

    if (parameter === 'capital') {
      ptChart.series[0].points.forEach((point) => {
        if (point.options.is_capital === 1) {
          point.select(true, true);
          point.graphic.toFront();
        }
      });

      matChart.series[0].points.forEach((point) => {
        if (point.options.is_capital === 1) {
          point.select(true, true);
          point.graphic.toFront();
        }
      });
    }

    if (parameter === 'region') {
      ptChart.series[0].points.forEach((point) => {
        if (point.options.region === Number(value)) {
          point.select(true, true);
          point.graphic.toFront();
        }
      });

      matChart.series[0].points.forEach((point) => {
        if (point.options.region === Number(value)) {
          point.select(true, true);
          point.graphic.toFront();
        }
      });
    }

    if (parameter === 'none') {
      clearHighlightedPoints();
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

  if (highlightInput) {
    highlightInput.addEventListener('change', (event) => {
      clearFilters(event.target.id);
      clearTableInfo();
      highlightPoints(event.target.value);
    }, false);
  }

  if (regionInput) {
    regionInput.addEventListener('change', (event) => {
      clearFilters(event.target.id);
      clearTableInfo();
      highlightPoints('region', event.target.value);
    }, false);
  }

  populateCitiesList();
}
