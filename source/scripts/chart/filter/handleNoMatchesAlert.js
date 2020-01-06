function hideNoMatchesAlert() {
  document.querySelector('.chart__main--pt').classList.remove('chart__main--margin-top');
  document.querySelector('.chart__main--mat').classList.remove('chart__main--margin-top');
  document.querySelector('.js-no-matches').setAttribute('hidden', true);
  document.querySelector('.js-pt-no-matches').setAttribute('hidden', true);
  document.querySelector('.js-mat-no-matches').setAttribute('hidden', true);
}

function showNoMatchesAlert(where) {
  if (where === 'pt') {
    document.querySelector('.chart__main--mat').classList.add('chart__main--margin-top');
    return document.querySelector('.js-pt-no-matches').removeAttribute('hidden');
  }
  if (where === 'mat') {
    document.querySelector('.chart__main--pt').classList.add('chart__main--margin-top');
    return document.querySelector('.js-mat-no-matches').removeAttribute('hidden');
  }
  return document.querySelector('.js-no-matches').removeAttribute('hidden');
}

export { hideNoMatchesAlert, showNoMatchesAlert };
