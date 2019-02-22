import axios from 'axios';
import config from '../config';

export default function getChartData(receivedPayload) {
  let chartData = {};

  if (receivedPayload === undefined) {
    chartData = {
      grade: 5,
      xAxis: 'racial',
    };
  } else {
    chartData = receivedPayload;
  }

  const url = `${config.api.domain}data?school_grade=${chartData.grade}&x=${chartData.xAxis}`;

  chartData.xAxis = chartData.xAxis;
  // xAxis = newXAxis;

  async function populateGlobalChartData() {
    try {
      const response = await axios.get(url);
      chartData.data = response.data.data;
      window.chartData = chartData;
    } catch (error) {
      window.console.error(error);
    }
  }

  return populateGlobalChartData();
}
