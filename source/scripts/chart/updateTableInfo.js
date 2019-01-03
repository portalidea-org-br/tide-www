import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';

Exporting(Highcharts);

export default function updateTableInfo(id, xAxis, data) {
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

  function getCityInfo(cityId) {
    return data.filter(item => item.city.id === cityId);
  }

  // newInfo = getCityInfo(id);
  setCityInfo(getCityInfo(id));
}
