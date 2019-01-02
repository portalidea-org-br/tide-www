import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';

Exporting(Highcharts);

export default function sizeToggle() {
  // Expand and shrink pt charts
  const expandPtChartButton = document.querySelector('.js-expand-pt-chart');
  const shrinkPtChartButton = document.querySelector('.js-shrink-pt-chart');

  if (expandPtChartButton) {
    expandPtChartButton.addEventListener('click', () => {
      console.log()
      const chartDom = document.getElementById('pt-chart');
      const ptChart = Highcharts.charts[Highcharts.attr(chartDom, 'data-highcharts-chart')];
      const charts = document.querySelectorAll('.chart');
      const chartContainer = chartDom.closest('.chart');

      console.log(Highcharts)
      console.log('ptChart: ', ptChart);

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


  // Expand and shrink mat charts
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

    chartContainer.addEventListener('transitionend', (event) => {
      matChart.reflow();
    }, false);
  });

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
