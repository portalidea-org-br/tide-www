export default function addTableDestak(cityId) {
  const ptCrossedTable = document.querySelector('.js-pt-crossed-table')
  const matCrossedTable = document.querySelector('.js-mat-crossed-table')
  const { data } = window.chartData;

  // get table rows
  const ptRows = ptCrossedTable.querySelectorAll('tr');
  const matRows = matCrossedTable.querySelectorAll('tr');

  function clearDestaks() {
    ptRows.forEach((row) => {
      row.classList.remove('destak');
    });

    matRows.forEach((row) => {
      row.classList.remove('destak');
    });
  }

  if (!cityId) {
    clearDestaks();
    return;
  }

  function getCityInfo() {
    return data.filter(item => item.city.id === cityId);
  }

  const cityInfo = getCityInfo(cityId);

  const ptInfo = cityInfo.find(item => item.subject === 'Português');
  const matInfo = cityInfo.find(item => item.subject === 'Matemática');


  ptRows.forEach((row) => {
    if (row.classList.contains(`js-${ptInfo.range_quality.toLowerCase()}`)) {
      row.classList.add('destak');
    } else {
      row.classList.remove('destak');
    }
  });

  matRows.forEach((row) => {
    if (row.classList.contains(`js-${matInfo.range_quality.toLowerCase()}`)) {
      row.classList.add('destak');
    } else {
      row.classList.remove('destak');
    }
  });
}
