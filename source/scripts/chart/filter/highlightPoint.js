import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import updateHelperText from '../updateHelperText';

Exporting(Highcharts);

function hideNoMatchesAlert() {
  document.querySelector('.js-no-matches').setAttribute('hidden', true);
}

function showNoMatchesAlert() {
  document.querySelector('.js-no-matches').removeAttribute('hidden');
}

// Highlight city
function highlightPoint(id) {
  const ptChartDom = document.getElementById('pt-chart');
  const matChartDom = document.getElementById('mat-chart');
  const ptChart = Highcharts.charts[Highcharts.attr(ptChartDom, 'data-highcharts-chart')];
  const matChart = Highcharts.charts[Highcharts.attr(matChartDom, 'data-highcharts-chart')];

  const ptPoint = ptChart.get(id);
  const matPoint = matChart.get(id);

  if (ptPoint === undefined || matPoint === undefined) {
    return showNoMatchesAlert();
  }

  ptPoint.graphic.toFront();
  ptPoint.select();

  matPoint.graphic.toFront();
  matPoint.select();

  updateHelperText(id);

  return true;
}

export { hideNoMatchesAlert, highlightPoint };
