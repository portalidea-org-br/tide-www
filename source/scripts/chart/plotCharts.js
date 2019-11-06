import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import { updateTableInfo } from './updateTableInfo';
import updateHelperText from './updateHelperText';
import addTableDestak from './addTableDestak';
import getChartData from './getChartData';
import formatItemsToHighCharts from './formatItemsToHighCharts';
import { showNoMatchesAlert } from './filter/handleNoMatchesAlert';
import { clearCity } from './filter/showCity';
import { highlightPoint } from './filter/highlightPoint';

Exporting(Highcharts);

let xAxisText;
let isLoading = false;
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
      tickInterval: 1,
      max: 3.5,
      min: -3.5,
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
      title: { text: `${subject === 'pt' ? 'Português' : 'Matemática'} | [Nível de aprendizagem]` },
      lineWidth: 1,
      gridZIndex: 0,
      max: 10,
      min: 0,
      plotLines: [{
        color: 'red',
        width: 2,
        value: 2,
        dashStyle: 'Dot',
        zIndex: 3,
        label: {
          text: 'Baixa',
          align: 'left',
          y: 16,
        },
      },
      {
        color: 'red',
        width: 2,
        value: 2.9,
        dashStyle: 'Dot',
        zIndex: 3,
        label: {
          text: 'Médio-baixa',
          align: 'left',
          y: 16,
        },
      },
      {
        color: 'red',
        width: 2,
        value: 3.8,
        dashStyle: 'Dot',
        zIndex: 3,
        label: {
          text: 'Média',
          align: 'left',
          y: 16,
        },
      },
      {
        color: 'red',
        width: 2,
        value: 4.8,
        dashStyle: 'Dot',
        zIndex: 3,
        label: {
          text: 'Médio-alta',
          align: 'left',
          y: 16,
        },
      },
      {
        // this last line is a fake one, just to display the label on the graphic
        width: 0,
        value: 6.8,
        dashStyle: 'Dot',
        zIndex: 3,
        label: {
          text: 'Alta',
          align: 'left',
          y: 16,
        },
      }],
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
      color: '#b49ae6',
      className: 'stringSince',
      point: {
        events: {
          click() {
            // clearFilters();
            highlightPoint(this.id);
            updateTableInfo(this.id);
            updateHelperText(this.id);
            addTableDestak(this.id);
          },
        },
      },
      data: chartData,
    }],
  });
}

function toggleLoading() {
  const ptChartDom = document.getElementById('pt-chart');
  const matChartDom = document.getElementById('mat-chart');
  const ptChart = Highcharts.charts[Highcharts.attr(ptChartDom, 'data-highcharts-chart')];
  const matChart = Highcharts.charts[Highcharts.attr(matChartDom, 'data-highcharts-chart')];

  if (!ptChart || !matChart) {
    return;
  }

  ptChart.showLoading();
  matChart.showLoading();
}

async function populateChartData(payload) {
  if (ptChartElement && matChartElement) {
    try {
      if (payload && payload.grade === null) {
        payload.grade = window.chartData.grade;
      }

      if (payload && payload.xAxis === null) {
        payload.xAxis = window.chartData.xAxis;
      }

      clearCity();
      await getChartData(payload);
      updateHelperText();
      addTableDestak();
      updateTableInfo();

      // let chartData = window.$vue.filteredChartData || window.chartData.data;
      let chartData = window.chartData.data;
      chartData = chartData.filter(item => item.x !== null);

      let ptItems = chartData.filter(item => item.subject === 'Português');
      let matItems = chartData.filter(item => item.subject === 'Matemática');

      if (payload && payload.inequality) {
        ptItems = ptItems.filter(item => item.range_inequality === payload.inequality);
        matItems = matItems.filter(item => item.range_inequality === payload.inequality);
      }

      if (payload && payload.quality) {
        ptItems = ptItems.filter(item => item.range_quality === payload.quality);
        matItems = matItems.filter(item => item.range_quality === payload.quality);
      }

      if (payload && payload.inhabitants) {
        const minHabitants = payload.inhabitants[0];
        const maxHabitants = payload.inhabitants[1];

        ptItems = ptItems.filter(
          item => item.city.inhabitants >= minHabitants && item.city.inhabitants <= maxHabitants,
        );
        matItems = matItems.filter(
          item => item.city.inhabitants >= minHabitants && item.city.inhabitants <= maxHabitants,
        );
      }

      if (ptItems.length === 0) {
        showNoMatchesAlert('pt');
      }

      if (matItems.length === 0) {
        showNoMatchesAlert('mat');
      }

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
      window.console.log(err);
    }
  }
}

export { populateChartData, toggleLoading };
