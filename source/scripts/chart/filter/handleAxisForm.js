import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import { hideNoMatchesAlert } from './handleNoMatchesAlert';
import { submitChartFormInfo } from './handleChartForm';
import { populateChartData, toggleLoading } from '../plotCharts';

Exporting(Highcharts);

const chartsContainer = document.querySelector('.charts');

function handleSelectedFilters() {
  // console.log(window.$vue.$data.selectedFilters);
  const values = Object.values(window.$vue.$data.selectedFilters);
  const hasFilters = values.some(el => el);

  if (hasFilters) {
    submitChartFormInfo();
  }
}


async function submitAxisInfo() {
  const jsAxisForm = document.querySelector('#js-axis-form');

  toggleLoading();
  window.$vue.toggleFilterFormLoading();
  chartsContainer.scrollIntoView();

  const formData = new FormData(jsAxisForm);
  const payload = {};

  payload.grade = formData.get('grade');
  payload.xAxis = formData.get('xAxis');

  await populateChartData(payload);
  window.$vue.toggleFilterFormLoading();
  // clearTableInfo();
  hideNoMatchesAlert();
  handleSelectedFilters();
}

function handleAxisForm() {
  const jsAxisForm = document.querySelector('#js-axis-form');

  if (jsAxisForm) {
    jsAxisForm.addEventListener('submit', (event) => {
      event.preventDefault();
      submitAxisInfo(event);
    });
  }
}

export { handleAxisForm, submitAxisInfo };
