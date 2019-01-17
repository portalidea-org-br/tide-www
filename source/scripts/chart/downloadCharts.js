import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';

Exporting(Highcharts);

export default function downloadCharts() {
  const ptChartDownloadButton = document.querySelector('.js-download-pt-chart');
  const matChartDownloadButton = document.querySelector('.js-download-mat-chart');

  if (ptChartDownloadButton) {
    ptChartDownloadButton.addEventListener('click', () => {
      const chartDom = document.getElementById('pt-chart');
      const ptChart = Highcharts.charts[Highcharts.attr(chartDom, 'data-highcharts-chart')];
      ptChart.exportChart({
        type: 'application/pdf',
        filename: 'Português',
      });
    });
  }

  if (matChartDownloadButton) {
    matChartDownloadButton.addEventListener('click', () => {
      const chartDom = document.getElementById('mat-chart');
      const matChart = Highcharts.charts[Highcharts.attr(chartDom, 'data-highcharts-chart')];
      matChart.exportChart({
        type: 'application/pdf',
        filename: 'Matemática',
      });
    });
  }
}
