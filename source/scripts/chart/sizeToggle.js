import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';

Exporting(Highcharts);

export default function sizeToggle() {
  // Expand and shrink pt charts
  const expandPtChartButton = document.querySelector('.js-expand-pt-chart');
  const shrinkPtChartButton = document.querySelector('.js-shrink-pt-chart');
  const expandMatChartButton = document.querySelector('.js-expand-mat-chart');
  const shrinkMatChartButton = document.querySelector('.js-shrink-mat-chart');
  const charts = document.querySelectorAll('.chart');

  function expandChart(whichChart) {
    const chartDom = document.getElementById(whichChart);
    const highChart = Highcharts.charts[Highcharts.attr(chartDom, 'data-highcharts-chart')];
    const chartContainer = chartDom.closest('.chart');

    Array.prototype.forEach.call(charts, (chart) => {
      chart.classList.add('hidden');
    });

    chartContainer.classList.add('expanded');
    chartContainer.classList.remove('hidden');

    chartContainer.addEventListener('transitionend', () => {
      highChart.reflow();
    }, false);
  }

  function shrinkChart(whichChart) {
    const chartDom = document.getElementById(whichChart);
    const highChart = Highcharts.charts[Highcharts.attr(chartDom, 'data-highcharts-chart')];

    Array.prototype.forEach.call(charts, (chart) => {
      chart.classList.remove('hidden');
    });

    chartDom.closest('.chart').classList.remove('expanded');
    highChart.reflow();
  }

  if (expandPtChartButton) {
    expandPtChartButton.addEventListener('click', () => {
      expandChart('pt-chart');
    });
  }

  if (shrinkPtChartButton) {
    shrinkPtChartButton.addEventListener('click', () => {
      shrinkChart('pt-chart');
    });
  }


  // Expand and shrink mat charts
  if (expandMatChartButton) {
    expandMatChartButton.addEventListener('click', () => {
      expandChart('mat-chart');
    });
  }

  if (shrinkMatChartButton) {
    document.querySelector('.js-shrink-mat-chart').addEventListener('click', () => {
      shrinkChart('mat-chart');
    });
  }
}
