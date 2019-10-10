import * as noUiSlider from 'nouislider/distribute/nouislider';

export default function startRange() {
  // console.log(nouislider)
  const range = document.getElementById('js-range');
  // window.noUiSlider = noUiSlider;

  if (!range) {
    return;
  }

  noUiSlider.create(range, {
    start: [20, 80],
    connect: true,
    // tooltips: true,
    range: {
      min: 0,
      max: 100,
    },
  });

  const minValue = document.getElementById('js-range-min-value');
  const maxValue = document.getElementById('js-rang-max-value');

  range.noUiSlider.on('update', (values, handle) => {
    if (handle) {
      maxValue.value = values[handle];
    } else {
      minValue.value = values[handle];
    }
  });
}
