import sizeToggle from './sizeToggle';
import plotCharts from './plotCharts';
import downloadCharts from './downloadCharts';
// import updateTableInfo from './updateTableInfo';
// import rest from './rest';

export default function startChartFunctionalities() {
  plotCharts();
  downloadCharts();
  sizeToggle();
  // rest();
}
