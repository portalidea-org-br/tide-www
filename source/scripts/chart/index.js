import sizeToggle from './sizeToggle';
import { populateChartData } from './plotCharts';
import downloadCharts from './downloadCharts';
import handleChartFilters from './filter';

populateChartData();
downloadCharts();
sizeToggle();
handleChartFilters();
