import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';

Exporting(Highcharts);

export default function downloadCharts() {
  document.querySelector('.js-download-pt-chart').addEventListener('click', () => {
    const chartDom = document.getElementById('pt-chart');
    const ptChart = Highcharts.charts[Highcharts.attr(chartDom, 'data-highcharts-chart')];
    ptChart.exportChart({
      type: 'application/pdf',
      filename: 'Português',
    });
  });

  document.querySelector('.js-download-mat-chart').addEventListener('click', () => {
    const chartDom = document.getElementById('mat-chart');
    const matChart = Highcharts.charts[Highcharts.attr(chartDom, 'data-highcharts-chart')];
    matChart.exportChart({
      type: 'application/pdf',
      filename: 'Matemática',
    });
  });
}
