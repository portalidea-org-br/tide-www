import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';

Exporting(Highcharts);

export default function sizeToggle() {
  // Expand and shrink pt charts
  const expandPtChartButton = document.querySelector('.js-expand-pt-chart');
  const shrinkPtChartButton = document.querySelector('.js-shrink-pt-chart');
  const expandMatChartButton = document.querySelector('.js-expand-mat-chart');
  const shrinkMatChartButton = document.querySelector('.js-shrink-mat-chart');

  if (expandPtChartButton) {
    expandPtChartButton.addEventListener('click', () => {
      const chartDom = document.getElementById('pt-chart');
      const ptChart = Highcharts.charts[Highcharts.attr(chartDom, 'data-highcharts-chart')];
      const charts = document.querySelectorAll('.chart');
      const chartContainer = chartDom.closest('.chart');

      Array.prototype.forEach.call(charts, (chart) => {
        chart.classList.add('hidden');
      });

      chartContainer.classList.add('expanded');
      chartContainer.classList.remove('hidden');

      chartContainer.addEventListener('transitionend', () => {
        ptChart.reflow();
      }, false);
    });
  }

  if (shrinkPtChartButton) {
    shrinkPtChartButton.addEventListener('click', () => {
      const chartDom = document.getElementById('pt-chart');
      const ptChart = Highcharts.charts[Highcharts.attr(chartDom, 'data-highcharts-chart')];
      const charts = document.querySelectorAll('.chart');

      Array.prototype.forEach.call(charts, (chart) => {
        chart.classList.remove('hidden');
      });

      chartDom.closest('.chart').classList.remove('expanded');
      ptChart.reflow();
    });
  }


  // Expand and shrink mat charts
  if (expandMatChartButton) {
    document.querySelector('.js-expand-mat-chart').addEventListener('click', () => {
      const chartDom = document.getElementById('mat-chart');
      const matChart = Highcharts.charts[Highcharts.attr(chartDom, 'data-highcharts-chart')];
      const charts = document.querySelectorAll('.chart');
      const chartContainer = chartDom.closest('.chart');

      Array.prototype.forEach.call(charts, (chart) => {
        chart.classList.add('hidden');
      });

      chartContainer.classList.add('expanded');
      chartContainer.classList.remove('hidden');

      chartContainer.addEventListener('transitionend', () => {
        matChart.reflow();
      }, false);
    });
  }

  if (shrinkMatChartButton) {
    document.querySelector('.js-shrink-mat-chart').addEventListener('click', () => {
      const chartDom = document.getElementById('mat-chart');
      const matChart = Highcharts.charts[Highcharts.attr(chartDom, 'data-highcharts-chart')];
      const charts = document.querySelectorAll('.chart');

      Array.prototype.forEach.call(charts, (chart) => {
        chart.classList.remove('hidden');
      });

      chartDom.closest('.chart').classList.remove('expanded');
      matChart.reflow();
    });
  }
}
