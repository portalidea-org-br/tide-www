import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import axios from 'axios';
import updateHelperText from '../updateHelperText';
import config from '../../config';

Exporting(Highcharts);

function hideNoMatchesAlert() {
  document.querySelector('.js-no-matches').setAttribute('hidden', true);
  document.querySelector('.js-pt-no-matches').setAttribute('hidden', true);
  document.querySelector('.js-mat-no-matches').setAttribute('hidden', true);
}

function showNoMatchesAlert(where) {
  if (where === 'pt') {
    return document.querySelector('.js-pt-no-matches').removeAttribute('hidden');
  }
  if (where === 'mat') {
    return document.querySelector('.js-mat-no-matches').removeAttribute('hidden');
  }
  return document.querySelector('.js-no-matches').removeAttribute('hidden');
}

async function getCity(cityId) {
  const city = await axios.get(`${config.api.domain}data?school_grade=${
    window.chartData.grade}&x=${window.chartData.xAxis}&city_id=${cityId}`);
  return city.data.data;
}

// Highlight city
async function showCity(id) {
  const ptChartDom = document.getElementById('pt-chart');
  const matChartDom = document.getElementById('mat-chart');
  const ptChart = Highcharts.charts[Highcharts.attr(ptChartDom, 'data-highcharts-chart')];
  const matChart = Highcharts.charts[Highcharts.attr(matChartDom, 'data-highcharts-chart')];
  const selectedPtPoints = ptChart.getSelectedPoints();
  const selectedMatPoints = matChart.getSelectedPoints();

  if (selectedPtPoints.length > 0) {
    selectedPtPoints[0].select();
  }

  if (selectedMatPoints.length > 0) {
    selectedMatPoints[0].select();
  }

  const city = await getCity(id);
  debugger;

  const ptPoint = ptChart.get(id);
  const matPoint = matChart.get(id);

  hideNoMatchesAlert();

  if (ptPoint === undefined) {
    showNoMatchesAlert('pt');
  } else {
    ptPoint.graphic.toFront();
    ptPoint.select();
  }

  if (matPoint === undefined) {
    showNoMatchesAlert('mat');
  } else {
    matPoint.graphic.toFront();
    matPoint.select();
  }

  updateHelperText(id);

  return true;
}

export { showCity };
