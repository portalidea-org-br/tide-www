import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';

Exporting(Highcharts);

const ptTable = document.querySelector('.js-pt-table');
const matTable = document.querySelector('.js-mat-table');

function updateTableInfo(id) {
  const { xAxis, data } = window.chartData;

  function setCityInfo(info) {
    const ptInfo = info.find(item => item.subject === 'Português');
    const matInfo = info.find(item => item.subject === 'Matemática');

    if (ptInfo === undefined || matInfo === undefined) {
      return;
    }

    ptTable.removeAttribute('hidden');
    matTable.removeAttribute('hidden');

    ptTable.getElementsByTagName('h2')[0].textContent = `${ptInfo.city.name} - ${ptInfo.state.uf}`;
    matTable.getElementsByTagName('h2')[0].textContent = `${matInfo.city.name} - ${matInfo.state.uf}`;


    if (xAxis === 'racial') {
      ptTable.querySelector('.js-unprivileged-title').textContent = 'Número de alunos pretos';
      ptTable.querySelector('.js-unprivileged-value').textContent = ptInfo.count_second_group;

      ptTable.querySelector('.js-privileged-title').textContent = 'Número de alunos brancos';
      ptTable.querySelector('.js-privileged-value').textContent = ptInfo.count_first_group;

      // document.querySelectorAll('.js-xAxis-text').forEach((span) => {
      //   const domSpan = span;
      //   domSpan.textContent = 'Raça';
      // });
    }

    if (xAxis === 'sex') {
      ptTable.querySelector('.js-unprivileged-title').textContent = 'Número de alunos mulheres';
      ptTable.querySelector('.js-unprivileged-value').textContent = ptInfo.count_second_group;

      ptTable.querySelector('.js-privileged-title').textContent = 'Número de alunos homens';
      ptTable.querySelector('.js-privileged-value').textContent = ptInfo.count_first_group;

      // document.querySelectorAll('.js-xAxis-text').forEach((span) => {
      //   const domSpan = span;
      //   domSpan.textContent = 'Gênero';
      // });
    }

    if (xAxis === 'nse') {
      ptTable.querySelector('.js-unprivileged-title').textContent = 'Número de alunos nível socioeconômico baixo';
      ptTable.querySelector('.js-unprivileged-value').textContent = ptInfo.count_second_group;

      ptTable.querySelector('.js-privileged-title').textContent = 'Número de alunos nível socioeconômico alto';
      ptTable.querySelector('.js-privileged-value').textContent = ptInfo.count_first_group;

      // document.querySelectorAll('.js-xAxis-text').forEach((span) => {
      //   const domSpan = span;
      //   domSpan.textContent = 'NSE';
      // });
    }

    ptTable.querySelector('.js-total-students').textContent = ptInfo.count_total;

    ptTable.querySelector('.js-xAxis').textContent = Number(ptInfo.x).toFixed(2);
    ptTable.querySelector('.js-quality').textContent = ptInfo.range_quality;

    ptTable.querySelector('.js-yAxis').textContent = Number(ptInfo.y).toFixed(2);
    ptTable.querySelector('.js-inequality').textContent = ptInfo.range_inequality;

    if (xAxis === 'racial') {
      matTable.querySelector('.js-unprivileged-title').textContent = 'Número de alunos pretos';
      matTable.querySelector('.js-unprivileged-value').textContent = matInfo.count_second_group;

      matTable.querySelector('.js-privileged-title').textContent = 'Número de alunos brancos';
      matTable.querySelector('.js-privileged-value').textContent = matInfo.count_first_group;

      // matTable.querySelector('.js-xAxis-text').textContent = 'Raça';
    }

    if (xAxis === 'sex') {
      matTable.querySelector('.js-unprivileged-title').textContent = 'Número de alunos mulheres';
      matTable.querySelector('.js-unprivileged-value').textContent = matInfo.count_second_group;

      matTable.querySelector('.js-privileged-title').textContent = 'Número de alunos homens';
      matTable.querySelector('.js-privileged-value').textContent = matInfo.count_first_group;

      // matTable.querySelector('.js-xAxis-text').textContent = 'Gênero';
    }

    if (xAxis === 'nse') {
      matTable.querySelector('.js-unprivileged-title').textContent = 'Número de alunos nível socioeconômico baixo';
      matTable.querySelector('.js-unprivileged-value').textContent = matInfo.count_second_group;

      matTable.querySelector('.js-privileged-title').textContent = 'Número de alunos nível socioeconômico alto';
      matTable.querySelector('.js-privileged-value').textContent = matInfo.count_first_group;

      // matTable.querySelector('.js-xAxis-text').textContent = 'NSE';
    }

    matTable.querySelector('.js-total-students').textContent = matInfo.count_total;

    matTable.querySelector('.js-xAxis').textContent = Number(matInfo.x).toFixed(2);
    matTable.querySelector('.js-quality').textContent = matInfo.range_quality;

    matTable.querySelector('.js-yAxis').textContent = Number(matInfo.y).toFixed(2);
    matTable.querySelector('.js-inequality').textContent = matInfo.range_inequality;
  }

  function getCityInfo(cityId) {
    if (!cityId) {
      ptTable.setAttribute('hidden', '');
      matTable.setAttribute('hidden', '');
    }
    return data.filter(item => item.city.id === cityId);
  }

  const newInfo = getCityInfo(id);
  setCityInfo(newInfo);
}

function clearTableInfo() {
  ptTable.getElementsByTagName('h2')[0].textContent = '';
  ptTable.querySelector('.js-unprivileged-value').textContent = '';
  ptTable.querySelector('.js-privileged-value').textContent = '';
  ptTable.querySelector('.js-total-students').textContent = '';
  ptTable.querySelector('.js-xAxis').textContent = '';
  ptTable.querySelector('.js-quality').textContent = '';
  ptTable.querySelector('.js-yAxis').textContent = '';
  ptTable.querySelector('.js-inequality').textContent = '';

  matTable.getElementsByTagName('h2')[0].textContent = '';
  matTable.querySelector('.js-unprivileged-value').textContent = '';
  matTable.querySelector('.js-privileged-value').textContent = '';
  matTable.querySelector('.js-total-students').textContent = '';
  matTable.querySelector('.js-xAxis').textContent = '';
  matTable.querySelector('.js-quality').textContent = '';
  matTable.querySelector('.js-yAxis').textContent = '';
  matTable.querySelector('.js-quality').textContent = '';
}

export { updateTableInfo, clearTableInfo };
