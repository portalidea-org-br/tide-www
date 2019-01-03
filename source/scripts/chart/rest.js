import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import axios from 'axios';

export default function rest() {
  let data;
  let xAxis;
  let xAxisText;
  let url;

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

  populateCitiesList();

  async function populateCitiesList() {
    const citiesList = document.getElementById('cities-list');
    const cities = await getCities();
    const cityNames = cities.map(city => ({ label: `${city.name} - ${city.state.name}`, value: city.id }));

    const awesomplete = new Awesomplete(document.querySelector('#city'), {
      nChars: 1,
      maxItems: 5,
      autoFirst: true,
      replace(suggestion) {
        this.input.value = suggestion.label;
      },
    });
    awesomplete.list = cityNames;
  }

  document.getElementById('city').addEventListener('input', (event) => {
    hideNoMatchesAlert();
  }, false);

  document.getElementById('city').addEventListener('awesomplete-selectcomplete', (event) => {
    clearFilters(event.target.id);
    highlightPoint(event.text.value);
    updateTableInfo(event.text.value);
  }, false);

  document.getElementById('highlight').addEventListener('change', (event) => {
    clearFilters(event.target.id);
    highlightPoints(event.target.value);
  }, false);

  document.getElementById('region').addEventListener('change', (event) => {
    clearFilters(event.target.id);
    highlightPoints('region', event.target.value);
  }, false);

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
  }

  // Filter charts
  document.getElementById('js-chart-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const payload = {};

    payload.grade = formData.get('grade');
    payload.xAxis = formData.get('xAxis');

    toggleLoading();
    populateChartData(payload);
    clearFilters();
    hideNoMatchesAlert();
    toggleLoading();
  });

  function clearFilters(exception) {
    const formContainer = document.querySelector('.js-form-filter');
    formContainer.querySelectorAll('select').forEach((select) => {
      if (select.id !== exception) {
        select.selectedIndex = 0;
      }
    });
    formContainer.querySelectorAll('input[type="text"]').forEach((input) => {
      if (input.id !== exception) {
        input.value = '';
      }
    });
  }

  function highlightPoints(parameter, value) {
    const ptChartDom = document.getElementById('pt-chart');
    const matChartDom = document.getElementById('mat-chart');
    const ptChart = Highcharts.charts[Highcharts.attr(ptChartDom, 'data-highcharts-chart')];
    const matChart = Highcharts.charts[Highcharts.attr(matChartDom, 'data-highcharts-chart')];

    clearHighlightedPoints();

    if (parameter === 'big-cities') {
      ptChart.series[0].points.forEach((point) => {
        if (point.options.is_big_town === 1) {
          point.select(true, true);
          point.graphic.toFront();
        }
      });

      matChart.series[0].points.forEach((point) => {
        if (point.options.is_big_town === 1) {
          point.select(true, true);
          point.graphic.toFront();
        }
      });
    }

    if (parameter === 'capital') {
      ptChart.series[0].points.forEach((point) => {
        if (point.options.is_capital === 1) {
          point.select(true, true);
          point.graphic.toFront();
        }
      });

      matChart.series[0].points.forEach((point) => {
        if (point.options.is_capital === 1) {
          point.select(true, true);
          point.graphic.toFront();
        }
      });
    }

    if (parameter === 'region') {
      ptChart.series[0].points.forEach((point) => {
        if (point.options.region === Number(value)) {
          point.select(true, true);
          point.graphic.toFront();
        }
      });

      matChart.series[0].points.forEach((point) => {
        if (point.options.region === Number(value)) {
          point.select(true, true);
          point.graphic.toFront();
        }
      });
    }

    if (parameter === 'none') {
      clearHighlightedPoints();
    }
  }

  function clearHighlightedPoints() {
    const ptChartDom = document.getElementById('pt-chart');
    const matChartDom = document.getElementById('mat-chart');
    const ptChart = Highcharts.charts[Highcharts.attr(ptChartDom, 'data-highcharts-chart')];
    const matChart = Highcharts.charts[Highcharts.attr(matChartDom, 'data-highcharts-chart')];
    const selectedPtPoints = ptChart.getSelectedPoints();
    const selectedMatPoints = matChart.getSelectedPoints();

    if (selectedPtPoints[0]) {
      selectedPtPoints[0].select();
      selectedMatPoints[0].select();
    }
  }

  // Download charts
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

  function drawPtChart(data) {
    return Highcharts.chart('pt-chart', {
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
        // max: 2,
        // min: -2,
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
        title: { text: 'Português | [Nível de aprendizado]' },
        lineWidth: 1,
        gridZIndex: 0,
        // max: 2,
        // min: -2,
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
        data,
      }],
    });
  }

  function drawMatChart(data) {
    Highcharts.chart('mat-chart', {
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
        // max: 2,
        // min: -2,
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
        title: { text: 'Matemática | [Nível de aprendizado]' },
        lineWidth: 1,
        gridZIndex: 0,
        // max: 2,
        // min: -2,
        plotLines: [{
          value: 0,
          color: '#666',
          dashStyle: 'solid',
          width: 1,
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
        data,
      }],
    });
  }

  function updateTableInfo(id) {
    const newInfo = getCityInfo(id);
    setCityInfo(newInfo);
  }

  function getCityInfo(id) {
    return data.filter(item => item.city.id === id);
  }

  function setCityInfo(info) {
    const ptTable = document.querySelector('.js-pt-table');
    const matTable = document.querySelector('.js-mat-table');
    const ptInfo = info.find(item => item.subject === 'Português');
    const matInfo = info.find(item => item.subject === 'Matemática');

    if (ptInfo === undefined || matInfo === undefined) {
      return;
    }

    ptTable.getElementsByTagName('h2')[0].textContent = `${ptInfo.city.name} - ${ptInfo.state.uf}`;
    matTable.getElementsByTagName('h2')[0].textContent = `${matInfo.city.name} - ${matInfo.state.uf}`;


    if (xAxis === 'racial') {
      ptTable.querySelector('.js-unprivileged-title').textContent = 'Npretos';
      ptTable.querySelector('.js-unprivileged-value').textContent = ptInfo.count_first_group;

      ptTable.querySelector('.js-privileged-title').textContent = 'Nbrancos';
      ptTable.querySelector('.js-privileged-value').textContent = ptInfo.count_second_group;

      document.querySelectorAll('.js-xAxis-text').forEach(span => span.textContent = 'Raça');
    }

    if (xAxis === 'sex') {
      ptTable.querySelector('.js-unprivileged-title').textContent = 'Nmulheres';
      ptTable.querySelector('.js-unprivileged-value').textContent = ptInfo.count_first_group;

      ptTable.querySelector('.js-privileged-title').textContent = 'Nhomens';
      ptTable.querySelector('.js-privileged-value').textContent = ptInfo.count_second_group;

      document.querySelectorAll('.js-xAxis-text').forEach(span => span.textContent = 'Sexo');
    }

    if (xAxis === 'nse') {
      ptTable.querySelector('.js-unprivileged-title').textContent = 'nNSE1';
      ptTable.querySelector('.js-unprivileged-value').textContent = ptInfo.count_first_group;

      ptTable.querySelector('.js-privileged-title').textContent = 'nNSE5';
      ptTable.querySelector('.js-privileged-value').textContent = ptInfo.count_second_group;

      document.querySelectorAll('.js-xAxis-text').forEach(span => span.textContent = 'NSE');
    }

    ptTable.querySelector('.js-total-students').textContent = ptInfo.count_total;

    ptTable.querySelector('.js-xAxis').textContent = Number(ptInfo.x).toFixed(2);
    ptTable.querySelector('.js-yAxis').textContent = Number(ptInfo.y).toFixed(2);

    if (xAxis === 'racial') {
      matTable.querySelector('.js-unprivileged-title').textContent = 'Npretos';
      matTable.querySelector('.js-unprivileged-value').textContent = matInfo.count_first_group;

      matTable.querySelector('.js-privileged-title').textContent = 'Nbrancos';
      matTable.querySelector('.js-privileged-value').textContent = matInfo.count_second_group;

      matTable.querySelector('.js-xAxis-text').textContent = 'Raça';
    }

    if (xAxis === 'sex') {
      matTable.querySelector('.js-unprivileged-title').textContent = 'Nmulheres';
      matTable.querySelector('.js-unprivileged-value').textContent = matInfo.count_first_group;

      matTable.querySelector('.js-privileged-title').textContent = 'Nhomens';
      matTable.querySelector('.js-privileged-value').textContent = matInfo.count_second_group;

      matTable.querySelector('.js-xAxis-text').textContent = 'Sexo';
    }

    if (xAxis === 'nse') {
      matTable.querySelector('.js-unprivileged-title').textContent = 'nNSE1';
      matTable.querySelector('.js-unprivileged-value').textContent = matInfo.count_first_group;

      matTable.querySelector('.js-privileged-title').textContent = 'nNSE5';
      matTable.querySelector('.js-privileged-value').textContent = matInfo.count_second_group;

      matTable.querySelector('.js-xAxis-text').textContent = 'NSE';
    }

    matTable.querySelector('.js-total-students').textContent = matInfo.count_total;

    matTable.querySelector('.js-xAxis').textContent = Number(matInfo.x).toFixed(2);
    matTable.querySelector('.js-yAxis').textContent = Number(matInfo.y).toFixed(2);
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
    try {
      const chartData = await getChartData(payload);
      const ptItems = chartData.filter(item => item.subject === 'Português');
      const matItems = chartData.filter(item => item.subject === 'Matemática');

      formatedPtItems = Object.keys(ptItems).map(item => ({
        x: Number(ptItems[item].x),
        y: Number(ptItems[item].y),
        id: Number(ptItems[item].city.id),
        city: ptItems[item].city.name,
        state: ptItems[item].state.uf,
        state_id: ptItems[item].state.id,
        region: ptItems[item].region.id,
        is_big_town: ptItems[item].city.is_big_town,
        is_capital: ptItems[item].city.is_capital,
      }));

      formatedMatItems = Object.keys(matItems).map(item => ({
        x: Number(matItems[item].x),
        y: Number(matItems[item].y),
        id: Number(matItems[item].city.id),
        city: matItems[item].city.name,
        state: matItems[item].state.uf,
        state_id: matItems[item].state.id,
        region: matItems[item].region.id,
        is_big_town: matItems[item].city.is_big_town,
        is_capital: matItems[item].city.is_capital,
      }));

      if (xAxis === 'racial') {
        xAxisText = 'Raça';
      }

      if (xAxis === 'sex') {
        xAxisText = 'Sexo';
      }

      if (xAxis === 'nse') {
        xAxisText = 'NSE';
      }

      drawPtChart(formatedPtItems);
      drawMatChart(formatedMatItems);
    } catch (err) {
      console.log(err);
      toggleLoading();
    }
  }

  function getChartData(payload) {
    if (payload === undefined) {
      payload = {
        grade: 5,
        xAxis: 'racial',
      };
    }

    url = `https:\/\/dapitide.eokoe.com/api/data?school_grade=${payload.grade}&x=${payload.xAxis}`;
    xAxis = payload.xAxis;

    return axios.get(url)
      .then((response) => {
        data = response.data.data;
        return data;
      });
  }

  function getCities() {
    const url = 'https:\/\/dapitide.eokoe.com/api/cities';

    return axios.get(url)
      .then((response) => {
        data = response.data.cities;
        return data;
      });
  }
}
