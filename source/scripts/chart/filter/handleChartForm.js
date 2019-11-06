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
  payload.state = formData.get('state');
  payload.region = window.$vue.selectedFilters.selectedRegion;
  payload.inhabitants = window.$vue.selectedFilters.selectedInhabitants;
  payload.inequality = window.$vue.selectedFilters.selectedInequality;
  payload.quality = window.$vue.selectedFilters.selectedQuality;

  toggleLoading();
  populateChartData(payload);
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
