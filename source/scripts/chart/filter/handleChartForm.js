import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import { hideNoMatchesAlert } from './handleNoMatchesAlert';
import { clearTableInfo } from '../updateTableInfo';
import { populateChartData, toggleLoading } from '../plotCharts';

Exporting(Highcharts);

async function submitChartFormInfo() {
  const jsChartForm = document.querySelector('#js-chart-form');
  const chartsContainer = document.querySelector('.charts');
  const formData = new FormData(jsChartForm);
  const payload = {};

  payload.grade = formData.get('grade');
  payload.xAxis = formData.get('xAxis');
  payload.region = formData.get('region');
  payload.inhabitants = formData.get('inhabitants');
  payload.state = formData.get('state');
  payload.inequality = formData.get('inequality');
  payload.quality = formData.get('quality');

  toggleLoading();
  populateChartData(payload, true);
  clearTableInfo();
  hideNoMatchesAlert();
  chartsContainer.scrollIntoView();
}

function handleChartForm() {
  const jsChartForm = document.querySelector('#js-chart-form');

  if (jsChartForm) {
    jsChartForm.addEventListener('submit', (event) => {
      event.preventDefault();
      submitChartFormInfo();
    });
  }
}

export { handleChartForm, submitChartFormInfo };
