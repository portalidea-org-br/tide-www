import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import updateHelperText from '../updateHelperText';
import { clearCity, clearCityInput } from './showCity';
import { showNoMatchesAlert, hideNoMatchesAlert } from './handleNoMatchesAlert';

Exporting(Highcharts);

// Highlight city
function highlightPoint(id) {
  const ptChartDom = document.getElementById('pt-chart');
  const matChartDom = document.getElementById('mat-chart');
  const ptChart = Highcharts.charts[Highcharts.attr(ptChartDom, 'data-highcharts-chart')];
  const matChart = Highcharts.charts[Highcharts.attr(matChartDom, 'data-highcharts-chart')];
  const selectedPtPoints = ptChart.getSelectedPoints();
  const selectedMatPoints = matChart.getSelectedPoints();

  if (selectedPtPoints.length > 0) {
    clearCity(selectedPtPoints[0]);
    // selectedPtPoints[0].select();
  }

  if (selectedMatPoints.length > 0) {
    clearCity(selectedMatPoints[0]);
    // selectedMatPoints[0].select();
  }

  clearCityInput();
  window.$vue.selectedCity = id;

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

  updateHelperText(window.$vue.selectedCity);

  return true;
}

export { highlightPoint };
