import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import { updateTableInfo } from './updateTableInfo';
import getChartData from './getChartData';
import clearFilters from './filter/clearFilters';
import { highlightPoint } from './filter/highlightPoint';

Exporting(Highcharts);

let xAxisText;
const ptChartElement = document.getElementById('pt-chart');
const matChartElement = document.getElementById('mat-chart');

Highcharts.setOptions({
  lang: {
    printChart: 'Imprimir gráfico',
    resetZoom: 'Resetar zoom',
  },
  tooltip: {
    formatter() {
      return `${this.point.options.city} - ${this.point.options.state}`;
    },
  },
});

function drawChart(chartData, subject) {
  return Highcharts.chart(`${subject}-chart`, {
    chart: {
      type: 'scatter',
      zoomType: 'xy',
    },
    credits: false,
    legend: {
      enabled: false,
    },
    turboThreshold: 0,
    title: { text: '' },
    subtitle: '',
    xAxis: {
      title: {
        enabled: true,
        text: `${xAxisText} | [Desigualdade]`,
      },
      max: 2,
      min: -2,
      startOnTick: true,
      endOnTick: true,
      showLastLabel: true,
      plotLines: [{
        value: 0,
        color: '#e6e6e6',
        dashStyle: 'solid',
        width: 1,
      }],
    },
    yAxis: {
      title: { text: `${subject === 'pt' ? 'Português' : 'Matemática'} | [Nível de aprendizado]` },
      lineWidth: 1,
      gridZIndex: 0,
      max: 2,
      min: -2,
      // plotLines:[{
      //   value: 0,
      //   color: '#666',
      //   dashStyle: 'solid',
      //   width: 1,
      // }],
    },
    plotOptions: {
      scatter: {
        marker: {
          radius: 5,
          states: {
            hover: {
              enabled: true,
              lineColor: 'rgb(100,100,100)',
            },
          },
        },
        states: {
          hover: {
            marker: {
              enabled: false,
            },
          },
        },
        tooltip: {
          headerFormat: 'Cidade: <b>{point.options.city}</b>',
        },
      },
    },
    series: [{
      turboThreshold: 0,
      cursor: 'pointer',
      point: {
        events: {
          click() {
            clearFilters();
            highlightPoint(this.id);
            updateTableInfo(this.id);
          },
        },
      },
      data: chartData,
    }],
  });
}

function formatItemsToHighCharts(items) {
  return Object.keys(items).map(item => ({
    x: Number(items[item].x),
    y: Number(items[item].y),
    id: Number(items[item].city.id),
    city: items[item].city.name,
    state: items[item].state.uf,
    state_id: items[item].state.id,
    region: items[item].region.id,
    is_big_town: items[item].city.is_big_town,
    is_capital: items[item].city.is_capital,
  }));
}

function toggleLoading() {
  let isLoading = false;
  const ptChartDom = document.getElementById('pt-chart');
  const matChartDom = document.getElementById('mat-chart');
  const ptChart = Highcharts.charts[Highcharts.attr(ptChartDom, 'data-highcharts-chart')];
  const matChart = Highcharts.charts[Highcharts.attr(matChartDom, 'data-highcharts-chart')];

  if (!isLoading) {
    ptChart.showLoading();
    matChart.showLoading();
  } else {
    ptChart.hideLoading();
    matChart.hideLoading();
  }
  isLoading = !isLoading;
}

async function populateChartData(payload) {
  if (ptChartElement && matChartElement) {
    try {
      await getChartData(payload);

      const chartData = window.chartData.data;

      const ptItems = chartData.filter(item => item.subject === 'Português');
      const matItems = chartData.filter(item => item.subject === 'Matemática');

      const formatedPtItems = formatItemsToHighCharts(ptItems);
      const formatedMatItems = formatItemsToHighCharts(matItems);

      if (window.chartData.xAxis === 'racial') {
        xAxisText = 'Raça';
      }

      if (window.chartData.xAxis === 'sex') {
        xAxisText = 'Gênero';
      }

      if (window.chartData.xAxis === 'nse') {
        xAxisText = 'NSE';
      }

      drawChart(formatedPtItems, 'pt');
      drawChart(formatedMatItems, 'mat');
    } catch (err) {
      console.log(err);
      toggleLoading();
    }
  }
}

export { populateChartData, toggleLoading };
