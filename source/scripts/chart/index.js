import sizeToggle from './sizeToggle';
// import populateChartData from './plotCharts';
import { populateChartData } from './plotCharts';
import downloadCharts from './downloadCharts';
import handleChartFilters from './filter';
// import updateTableInfo from './updateTableInfo';
// import rest from './rest';

export default function startChartFunctionalities() {
  populateChartData();
  downloadCharts();
  sizeToggle();
  handleChartFilters();
  // rest();
}
