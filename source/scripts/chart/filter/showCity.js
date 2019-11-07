import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import axios from 'axios';
import updateHelperText from '../updateHelperText';
import { showNoMatchesAlert, hideNoMatchesAlert } from './handleNoMatchesAlert';
import { updateTableInfo } from '../updateTableInfo';
import addTableDestak from '../addTableDestak';
import formatItemsToHighCharts from '../formatItemsToHighCharts';
import config from '../../config';

Exporting(Highcharts);

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
  const formatedItems = formatItemsToHighCharts(city);
  const ptCity = formatedItems[0];
  const matCity = formatedItems[1];
  ptChart.series[0].addPoint(ptCity);
  matChart.series[0].addPoint(matCity);

  const ptPoint = ptChart.get(id);
  const matPoint = matChart.get(id);
  // debugger;

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
  updateTableInfo(id);
  updateHelperText(id);
  addTableDestak(id);

  return true;
}

function clearCity(city) {
  if (document.querySelector('#js-city').value !== '') {
    city.remove();
  }
}

function clearCityInput() {
  document.querySelector('#js-city').value = '';
}

export { showCity, clearCity, clearCityInput };
